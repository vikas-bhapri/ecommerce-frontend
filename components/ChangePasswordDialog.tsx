"use client";

import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "./ui/form";
import { toast } from "sonner";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const PassFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm_password: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Attach the error to the confirm_password field
  });

const ChangePasswordDialog = ({ user_id }: { user_id: string }) => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof PassFormSchema>>({
    resolver: zodResolver(PassFormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const { reset } = form;
  const onSubmit = async (data: z.infer<typeof PassFormSchema>) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/secure-fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "PUT",
          path: `/auth/user/?email=${user_id}`,
          body: data,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error?.detail?.detail || "Failed to change password");
        throw new Error(error?.detail?.detail || "Failed to change password");
      }

      toast("Password changed successfully");
    } catch (error) {
      console.log(error);
      toast("Failed to change password");
    } finally {
      setSubmitting(false);
      reset();
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Enter a new password of minimum 8 characters...
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-600"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ChangePasswordDialog;
