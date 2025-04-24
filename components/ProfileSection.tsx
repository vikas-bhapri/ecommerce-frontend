import React from "react";
import { Button } from "./ui/button";
import UpdateProfile from "./UpdateProfile";

import { Dialog, DialogTrigger } from "./ui/dialog";
import LogOutDialog from "./LogOutDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";

const ProfileSection = ({ user_id }: { user_id: string }) => {
  return (
    <section className="w-full flex flex-col gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-blue-600 hover:bg-blue-300 text-black"
          >
            Update Profile
          </Button>
        </DialogTrigger>
        <UpdateProfile user_id={user_id} />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-blue-600 hover:bg-blue-300 text-black"
          >
            Change Password
          </Button>
        </DialogTrigger>
        <ChangePasswordDialog user_id={user_id} />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-red-600 hover:bg-red-300 text-black"
          >
            Log Out
          </Button>
        </DialogTrigger>
        <LogOutDialog />
      </Dialog>

      <Button className="bg-red-600 hover:bg-red-800">
        Delete Account (WIP)
      </Button>
    </section>
  );
};

export default ProfileSection;
