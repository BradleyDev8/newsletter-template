"use client";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Newsletter() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <h1 className="text-6xl font-bold text-white">
            Join Our <span className="text-sky-300">Newsletter</span>
          </h1>
        </div>
        <div>
          <p className="text-center text-white">
            Sign up for our newsletter to get the latest news and updates
          </p>
        </div>
        <div>
          <Input
            className="bg-[#2c2c2c8a] border-none text-white text-lg text-center p-6 shadow-lg shadow-gray-600 "
            placeholder="email@gmail.com"
            type="email"
          />
        </div>
        <p className="text-white text-sm">Join 100+ 👨‍💻 Reading our Newsletter</p>
      </div>
    </>
  );
}
