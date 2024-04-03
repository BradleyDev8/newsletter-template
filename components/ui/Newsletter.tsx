"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import emailSchema from "@/utils/emailSchema";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      emailSchema.parse(email);
      console.log("Email is valid", email);
      setShowAlert(true);
      // Handle successful form submission
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
        <div>
          <p className="text-center text-white">
            Sign up for our newsletter to get the latest news and updates
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              className="bg-[#2c2c2c8a] border-none text-white text-lg text-center p-6 shadow-lg shadow-gray-600 "
              placeholder="email@gmail.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </form>
        </div>
        <p className="text-white text-sm">Join 100+ 👨‍💻 Reading our Newsletter</p>
      </div>
      <div className="fixed bottom-4 right-4 w-50 ">
        {showAlert && (
          <Alert className="text-green-300 bg-[#00800049] border-green-700">
            <AlertDescription>
              Your email has been successfully submitted. <span>✅</span>{" "}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
