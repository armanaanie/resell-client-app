import { authClient } from "./auth-client";

export const getTokenForClient = async () => {
  const {data:token}= await authClient.token()
 console.log(token);
console.log(typeof token);
  console.log("keys:", Object.keys(token));
  return token.token;
};