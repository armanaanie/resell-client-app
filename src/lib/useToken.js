import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const getTokenForServer = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("token:", token);

  return token;
};


