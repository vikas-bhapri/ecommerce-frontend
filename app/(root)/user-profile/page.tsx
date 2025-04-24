import React from "react";
import getTokens from "@/utils/auth/getTokens";
import verifyJWT from "@/utils/auth/verifyJWT";
import ProfileSection from "@/components/ProfileSection";

const getUserProfile = async () => {
  const tokens = await getTokens();
  const payload = verifyJWT(tokens.accessToken);
  if (!payload) {
    return null;
  }
  const userId = payload.email;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/?email=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const page = async () => {
  const userProfile = await getUserProfile();
  return (
    <div className="w-4/5 mx-auto mt-5">
      <h2 className="text-2xl mb-5">My Profile</h2>
      <div className="flex flex-wrap justify-between">
        <section>
          <h1 className="text-xl">@{userProfile.username}</h1>
          <p className="font-semibold">First Name</p>
          <p className="text-lg">{userProfile.first_name}</p>
          <p className="font-semibold">Last Name</p>
          <p className="text-lg">{userProfile.last_name}</p>
          <p className="font-semibold">Email</p>
          <p className="text-lg">{userProfile.email}</p>
          <p className="font-semibold">Address</p>
          <p className="text-lg">{`${userProfile.address_line_1}, ${userProfile.address_line_2}, ${userProfile.city}-${userProfile.zip_code}, ${userProfile.state}, ${userProfile.country}`}</p>
          <p className="font-semibold">Phone</p>
          <p className="text-lg">{`${userProfile.country_code}-${userProfile.phone}`}</p>
        </section>
        <div className="w-full md:w-1/2 lg:w-2/10 mt-5 md:mt-0">
          <ProfileSection user_id={userProfile.email} />
        </div>
      </div>
    </div>
  );
};

export default page;
