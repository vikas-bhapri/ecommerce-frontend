import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="w-1/2 min-w-[20rem] flex flex-col ">
      <h1 className="text-xl my-5 text-center">Create an Account!</h1>
      <AuthForm method="signIn" />
      <p className="text-sm text-gray-500 my-4">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
