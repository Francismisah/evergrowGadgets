"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

      if (result.errors) {
        console.error("GraphQL OTP Verification Error:", result.errors);
        const errorMessageText =
          result.errors.map((err: any) => err.message).join(", ") ||
          "OTP verification failed.";
        setMessage({
          text: `Verification failed: ${errorMessageText}`,
          type: "error",
        });
      } else if (
        result.data &&
        result.data.verifyOtp &&
        result.data.verifyOtp.token
      ) {
        setMessage({
          text:
            result.data.verifyOtp.message || "Account verified successfully!",
          type: "success",
        });

        // ⭐ Store the received authentication token ⭐
        localStorage.setItem("authToken", result.data.verifyOtp.token);
        // If your verifyOtp also returns the user's role, store it here as well
        // localStorage.setItem("userRole", result.data.verifyOtp.user.role);

        // Clear the userEmailForOtp from localStorage as it's no longer needed
        localStorage.removeItem("userEmailForOtp");

        // Redirect to the appropriate dashboard based on the user's role
        // You'll need to fetch the role or have it returned by verifyOtp mutation
        // For simplicity here, let's assume you'd fetch user data or it's implicitly known
        setTimeout(() => {
          // Example: Redirect to a general dashboard or based on stored role
          // If you stored the role after signup or if verifyOtp returns it:
          // const userRole = localStorage.getItem("userRole");
          // if (userRole === "installer") { router.push("/installer-dashboard"); }
          // else { router.push("/user-dashboard"); }
          router.push("/dashboard"); // Or '/user-dashboard', '/installer-dashboard'
        }, 2000);
      } else {
        console.error("Unexpected API response for OTP verification:", result);
        setMessage({
          text: "An unexpected response was received. Please try again.",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Network or parsing error during OTP verification:", error);
      setMessage({
        text: `An error occurred: ${
          error.message ||
          "Please check your internet connection and try again."
        }`,
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
          We've sent a 6-digit code to{" "}
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
          Didn't receive the code?{" "}
          <Link href="#" className="text-orange-500 font-bold hover:underline">
            Resend Code
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
