import AuthForm from "@/components/AuthForm";
import React from "react";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="w-1/2 min-w-[20rem] flex flex-col ">
      <h1 className="text-xl my-5 text-center">Create an Account!</h1>
      <AuthForm method="signUp" />
      <p className="text-sm text-gray-500 my-4">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
