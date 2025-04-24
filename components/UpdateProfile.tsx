"use client";

import React, { useEffect, useState } from "react";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "sonner";

const UpdateProfileSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  address_line_1: z.string().min(1, { message: "Address Line 1 is required" }),
  address_line_2: z.string().min(1, { message: "Address Line 2 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip_code: z
    .string()
    .min(5, { message: "Zip should be 5-6 characters" })
    .max(6),
  country: z.string().min(1, { message: "Country is required" }),
  country_code: z.string().min(1, { message: "Country Code is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number should be 10 characters long" })
    .max(10),
});

const UpdateProfile = ({ user_id }: { user_id: string }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      country_code: "",
      phone: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/auth/secure-fetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GET",
            path: `/auth/user/?email=${user_id}`,
          }),
        });

        if (!response.ok) {
          setErrorMessage("Failed to fetch user profile");
          return;
        }

        const result = await response.json();
        result["phone"] = result["phone"].toString();
        result["zip_code"] = result["zip_code"].toString();
        reset(result); // Dynamically update form values
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("An error occurred while fetching user data.");
      }
    };

    fetchUserProfile();
  }, [user_id, reset]);

  const onSubmit = async (data: z.infer<typeof UpdateProfileSchema>) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/secure-fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "PATCH",
          path: `/auth/user/?email=${user_id}`,
          body: data,
        }),
      });

      if (!response.ok) {
        setErrorMessage("Failed to update profile");
        return;
      }

      toast("Profile updated successfully!");
      reset(); // Reset form values after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while updating your profile.");
    } finally {
      setSubmitting(false);
      router.refresh(); // Refresh the page to reflect changes
    }
  };

  return (
    <DialogContent className="max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogDescription>Update your profile information.</DialogDescription>
      </DialogHeader>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-2 px-3"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address_line_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="Address Line 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address_line_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="Address Line 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="Zip Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Input placeholder="Country Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
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

export default UpdateProfile;
