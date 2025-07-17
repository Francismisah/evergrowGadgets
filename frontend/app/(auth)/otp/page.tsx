"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react"; // Explicitly import React for React.FormEvent

// You'll need a GraphQL mutation for OTP verification as well
const VERIFY_OTP_MUTATION = `
  mutation VerifyEmail($email: String!, $otp: String!) {
    verifyEmail(email: $email, otp: $otp) {
      message
      token
    }
  }
`;

const OTPVerificationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Retrieve the email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmailForOtp");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email is found, redirect back to signup or login
      setMessage({
        text: "No email found for OTP verification. Please sign up or log in again.",
        type: "error",
      });
      setTimeout(() => router.push("/signup"), 3000); // Redirect to signup if email missing
    }
  }, [router]);

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!email || !otp) {
      setMessage({ text: "Please enter both email and OTP.", type: "error" });
      setLoading(false);
      return;
    }

    if (!API_BASE_URL) {
      setMessage({
        text: "API base URL is not configured. Please check .env.local",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: VERIFY_OTP_MUTATION,
          variables: {
            email: email,
            otp: otp,
          },
        }),
      });

      const result = await response.json();

      // Fix for 'Unexpected any' on line 86 (now potentially different line due to formatting)
      // Define a type for GraphQL errors for better type safety
      interface GraphQLError {
        message: string;
        locations?: { line: number; column: number }[];
        path?: string[];
        extensions?: Record<string, any>; // Use a more specific type if you know the structure
      }

      if (result.errors) {
        console.error("GraphQL OTP Verification Error:", result.errors);
        // Explicitly cast result.errors to an array of GraphQLError
        const errorMessageText =
          (result.errors as GraphQLError[])
            .map((err: GraphQLError) => err.message) // Use GraphQLError for 'err'
            .join(", ") || "OTP verification failed.";
        setMessage({
          text: `Verification failed: ${errorMessageText}`,
          type: "error",
        });
      } else if (
        result.data &&
        result.data.verifyEmail && // Changed from result.data.verifyOtp to result.data.verifyEmail based on your mutation name
        result.data.verifyEmail.token
      ) {
        setMessage({
          text:
            result.data.verifyEmail.message || "Account verified successfully!", // Changed verifyOtp to verifyEmail
          type: "success",
        });

        // Fix for 'Unexpected any' on line 129 (now potentially different line due to formatting)
        // You would apply a specific type here if 'result.data.verifyOtp' (now verifyEmail) had a complex structure.
        // For 'token' and 'message', string types are implicit, so 'any' is not needed here if 'result.data' is implicitly typed.
        // The previous 'any' on line 129 was likely referring to the 'result.errors' map function 'err: any'
        // which has been addressed above with GraphQLError.

        // ⭐ Store the received authentication token ⭐
        localStorage.setItem("authToken", result.data.verifyEmail.token);
        // If your verifyEmail also returns the user's role, store it here as well
        // localStorage.setItem("userRole", result.data.verifyEmail.user.role);

        // Clear the userEmailForOtp from localStorage as it's no longer needed
        localStorage.removeItem("userEmailForOtp");

        setTimeout(() => {
          router.push("/dashboard"); // Or '/user-dashboard', '/installer-dashboard'
        }, 2000);
      } else {
        console.error("Unexpected API response for OTP verification:", result);
        setMessage({
          text: "An unexpected response was received. Please try again.",
          type: "error",
        });
      }
    } catch (error: unknown) {
      // Use 'unknown' for catch block errors
      console.error("Network or parsing error during OTP verification:", error);
      let errorMessage = "Please check your internet connection and try again.";
      if (error instanceof Error) {
        // Refine type if it's an Error instance
        errorMessage = error.message;
      }
      setMessage({
        text: `An error occurred: ${errorMessage}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <Link href="/">
          <Image
            src="/logos.png"
            alt="logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Verify Your Account
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          We&apos;ve sent a 6-digit code to {/* Fix for unescaped apostrophe */}
          <span className="font-semibold text-orange-500">{email}</span>. Please
          enter it below.
        </p>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter 6-digit code"
              className="mt-1 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-lg tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6} // Assuming a 6-digit OTP
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Didn&apos;t receive the code? {/* Fix for unescaped apostrophe */}
          <Link href="#" className="text-orange-500 font-bold hover:underline">
            Resend Code
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
