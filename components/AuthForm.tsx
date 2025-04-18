"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type formType = "signIn" | "signUp";

const authFormSchema = (method: formType) =>
  z
    .object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" }),
      firstName:
        method === "signUp"
          ? z.string().min(2, {
              message: "First Name must be at least 2 characters long",
            })
          : z.string().optional(),
      lastName:
        method === "signUp"
          ? z.string().min(2, {
              message: "Last Name must be at least 2 characters long",
            })
          : z.string().optional(),
      email:
        method === "signUp"
          ? z.string().email({ message: "Invalid email address" })
          : z.string().optional(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
      confirmPassword:
        method === "signUp"
          ? z.string().min(8, {
              message: "Password must be at least 8 characters long",
            })
          : z.string().optional(),
      addressLine1:
        method === "signUp"
          ? z.string().min(5, {
              message: "Address Line 1 must be at least 5 characters long",
            })
          : z.string().optional(),
      addressLine2:
        method === "signUp"
          ? z.string().min(5, {
              message: "Address Line 2 must be at least 5 characters long",
            })
          : z.string().optional(),
      city:
        method === "signUp"
          ? z
              .string()
              .min(2, { message: "City must be at least 2 characters long" })
          : z.string().optional(),
      state:
        method === "signUp"
          ? z
              .string()
              .min(2, { message: "State must be at least 2 characters long" })
          : z.string().optional(),
      zip:
        method === "signUp"
          ? z
              .string()
              .min(5, {
                message: "ZIP code must be at least 5 characters long",
              })
              .max(6)
          : z.string().optional(),
      country:
        method === "signUp"
          ? z
              .string()
              .min(2, { message: "Country must be at least 2 characters long" })
          : z.string().optional(),
      countryCode:
        method === "signUp"
          ? z.string().min(2, {
              message: "Country Code must be at least 2 characters long",
            })
          : z.string().optional(),
      phone:
        method === "signUp"
          ? z
              .string()
              .min(10, {
                message: "Phone number must be at least 10 characters long",
              })
              .max(10)
          : z.string().optional(),
    })
    .refine((data) => {
      if (data.password === data.confirmPassword) {
        return true;
      }
      return true;
    });

const AuthForm = ({ method }: { method: formType }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const formSchema = authFormSchema(method);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      countryCode: "",
      phone: "",
    },
  });

  const signIn = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const payload = new URLSearchParams();
      payload.append("username", data.username);
      payload.append("password", data.password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message);
        return;
      }

      // Success: redirect to homepage
      router.push("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const signUp = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const url = `${backendURL}/auth/user`;
      const payload = {
        username: data.username,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        confirm_password: data.confirmPassword,
        address_line_1: data.addressLine1,
        address_line_2: data.addressLine2,
        city: data.city,
        state: data.state,
        zip_code: data.zip,
        role: "user",
        country: data.country,
        country_code: data.countryCode,
        phone: data.phone,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail && errorData.detail.detail) {
          const fieldErrors = errorData.detail.detail;
          setErrorMessages(fieldErrors || "An unknown error occurred");
          return;
        }
        throw new Error("An unknown error occurred.");
      }

      router.push("/sign-in");
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessages({ general: "An error occurred. Please try again." });
    } finally {
      setSubmitting(false); // Ensure this is always called
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) =>
    method === "signIn" ? signIn(data) : signUp(data);

  return (
    <>
      {errorMessage && (
        <p className="text-red-500 text-center text-md font-semibold mb-4">
          {errorMessage}
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage>
                  {errorMessages.username && (
                    <span>{errorMessages.username}</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          {method === "signUp" && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage>
                    {errorMessages.email && <span>{errorMessages.email}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
          )}
          <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-4">
            {method === "signUp" && (
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.first_name && (
                          <span>{errorMessages.first_name}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.first_name && (
                          <span>{errorMessages.last_name}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage>
                    {errorMessages.password && (
                      <span>{errorMessages.password}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            {method === "signUp" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {errorMessages.confirm_password && (
                        <span>{errorMessages.confirm_password}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
          </div>
          {method === "signUp" && (
            <>
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Address Line 1" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errorMessages.address_line_1 && (
                        <span>{errorMessages.address_line_1}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Address Line 2" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errorMessages.address_line_2 && (
                        <span>{errorMessages.address_line_2}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.city && (
                          <span>{errorMessages.city}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.state && (
                          <span>{errorMessages.state}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>ZIP</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ZIP" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.zip_code && (
                          <span>{errorMessages.zip_code}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.country && (
                          <span>{errorMessages.country}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap lg:flex-nowrap mb-4 gap-4">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Country Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Country Code" {...field} />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.country_code && (
                          <span>{errorMessages.country_code}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {errorMessages.phone && (
                          <span>{errorMessages.phone}</span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-600"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : method === "signIn"
              ? "Sign In"
              : "Sign Up"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
