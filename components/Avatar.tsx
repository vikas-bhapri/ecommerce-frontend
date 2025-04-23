import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const CustomAvatar = ({ letter }: { letter: string }) => {
  return (
    <div>
      <Avatar className="cursor-pointer">
        <AvatarFallback className="bg-gray-500">
          {letter.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default CustomAvatar;
