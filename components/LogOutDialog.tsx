"use client";

import React from "react";
import { redirect } from "next/navigation";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

const LogOutDialog = () => {
  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
    });
    redirect("/sign-in");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Log Out</DialogTitle>
        <DialogDescription>Do you wish to log out?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          className="bg-red-600 hover:bg-red-700 text-white hover:text-white"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LogOutDialog;
