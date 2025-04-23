"use client";

import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const ProfileSection = () => {
  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
    });
    redirect("/sign-in");
  };

  return (
    <section className="w-full flex flex-col gap-2">
      <Button
        variant="outline"
        className="border-blue-600 hover:bg-blue-300 text-black"
      >
        Update Profile
      </Button>
      <Button
        variant="outline"
        className="border-blue-600 hover:bg-blue-300 text-black"
      >
        Change Password
      </Button>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="border-red-600 hover:bg-red-300 text-black"
      >
        Log Out
      </Button>
      <Button className="bg-red-600 hover:bg-red-800">Delete Account</Button>
    </section>
  );
};

export default ProfileSection;
