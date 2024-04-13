"use client";

import { FC } from "react";

interface Props {}

const AuthForm: FC<Props> = ({}) => {
  return (
    <div>
      <div className="relative w-full space-y-8">
        <div className="relative">
          <label className="font-medium text-gray-900">Name</label>
          <input
            type="text"
            className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
            data-primary="blue-600"
            data-rounded="rounded-lg"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="relative">
          <label className="font-medium text-gray-900">Email</label>
          <input
            type="text"
            className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
            data-primary="blue-600"
            data-rounded="rounded-lg"
            placeholder="Enter Your Email Address"
          />
        </div>
        <div className="relative">
          <label className="font-medium text-gray-900">Password</label>
          <input
            type="password"
            className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
            data-primary="blue-600"
            data-rounded="rounded-lg"
            placeholder="Password"
          />
        </div>
        <div className="relative">
          <a
            href="#_"
            className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
            data-primary="blue-600"
            data-rounded="rounded-lg"
          >
            Create Account
          </a>
          <a
            href="#_"
            className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease"
            data-rounded="rounded-lg"
          >
            Sign up with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
