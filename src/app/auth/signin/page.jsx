"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default  function SigninPage() {
   
  const onSubmit =async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    

     const { data, error } = await authClient.signIn.email({
        


    email: formData.get("email"),
    password: formData.get("password"),
  
    callbackURL: "/"
});

    if (error) {
      toast.error(error.message);
      return;
    }

   if(data) {toast.success("Sign in successful!");
    redirect("/")
   }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#760031] px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl text-white">

        {/* Title */}
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Log In
        </h1>

        {/* FORM */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>

        
         

          {/* EMAIL */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-white">Email</Label>
            <Input
              placeholder="john@example.com"
              className="bg-white/10 border border-white/20 text-white"
            />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must contain 1 uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Must contain 1 number";
              }
              return null;
            }}
          >
            <Label className="text-white">Password</Label>
            <Input
              placeholder="Enter your password"
              className="bg-white/10 border border-white/20 text-white"
            />
            <Description className="text-white/60">
              Must be 8+ chars, 1 uppercase, 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* BUTTONS */}
          <div className="flex items-center justify-center gap-2 pt-2">

            <Button
              type="submit"
              className="bg-[#D51C39] hover:bg-[#FF6060] text-white"
            >
              
              Sign In
            </Button>
<Button
  onPress={() => authClient.signIn.social({
    provider: "google",
    callbackURL: "/auth/google-success",
  })}
  className="w-full bg-white text-black"
>
  Continue with Google
</Button>
           
          </div>

        </Form>

        {/* SIGN IN LINK */}
        <div className="mt-6 text-center text-white/70 text-sm">
        Don't have an account?
        </div>

        <Link
          href="/auth/signup"
          className="block mt-3 text-center px-4 py-2 border border-white/30 rounded-md hover:bg-white/10 transition text-white"
        >
          Sign Up
        </Link>

      </div>
    </div>
  );
}