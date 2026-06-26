import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from 'better-auth/plugins';



const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
 
 
  database: mongodbAdapter(db, {
    
    client
  }),
   hooks: {
    before: async (ctx) => {
      if (
        ctx.path === "/sign-in/email"
      ) {
        const { email } = ctx.body;

        const user =
          await db.collection("user").findOne({
            email,
          });

        if (
          user?.status === "blocked"
        ) {
          throw new Error(
            "Your account has been blocked."
          );
        }
      }
    },
  },

 socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
  user: {
  additionalFields: {
    role: {
      type: "string",
      defaultValue: "buyer",
      required: false,
    },
  },
},
 plugins: [
        jwt(), 
    ],
  session: {
  cookieCache: {
    enabled: true,
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
},
  
});