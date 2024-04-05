"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import emailSchema from "@/utils/emailSchema";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      emailSchema.parse(email);
      console.log("Email is valid", email);

      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowAlert(true);
        setEmail("");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err: any) {
      if (err.issues && err.issues.length > 0) {
        setError(err.issues[0].message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <h1 className="text-6xl font-bold text-white">
            Join Our{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-cyan-300 text-transparent bg-clip-text">
              Newsletter
            </span>
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-white w-10/12 ">
            Sign up for our newsletter to get the latest news and updates
          </p>
        </div>
        <div>
          <form className="w-full flex flex-col justify-center" onSubmit={handleSubmit}>
            <Input
              className="bg-[#2c2c2c8a] border-none text-white text-lg text-center p-6 shadow-lg shadow-gray-600 w-8/12 sm:w-3/4 md:w-full lg:w-full xl:w-full mx-auto"
              placeholder="email@gmail.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="mt-4 flex justify-center bg-transparent border border-gray-100 hover:bg-[#2c2c2c8a] text-white py-2 px-4 rounded-lg  md:hidden"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <p className="text-white text-sm">Join 100+ 👨‍💻 Reading our Newsletter</p>
      </div>
      <div className="fixed bottom-4 right-4 w-50 ">
        {showAlert && (
          <Alert className="text-green-300 bg-[#00800049] border-green-700">
            <AlertDescription>
              Your email has been successfully submitted <span>✅</span>{" "}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
