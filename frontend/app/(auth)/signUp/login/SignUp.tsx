"use client"; // This component needs to be a Client Component to handle form state and user interaction

import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection in App Router
import Image from "next/image";
import Link from "next/link";
import Button from "./Button"; // Assuming your Button component

// Define the GraphQL mutation for signup
// Corrected based on backend errors: now expects firstName and lastName,
// and no longer accepts phoneNumber or address for signup.
const SIGNUP_MUTATION = `
  mutation SignupUser(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $role: String!
  ) {
    signup(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      role: $role
    ) {
      message
    }
  }
`;

const SignUp = () => {
  const router = useRouter(); // Initialize router for navigation

  // State for form inputs - updated to firstName and lastName
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // Removed address and phoneNumber states as they are not accepted by signup mutation
  // If you need them for other purposes (e.g., user profile after signup), keep them
  // but ensure they are not sent in this specific signup mutation.
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // State for role selection
  const [termsChecked, setTermsChecked] = useState(false);

  // State for messages and loading
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    setMessage(null); // Clear previous messages
    setLoading(true); // Set loading state

    // Basic client-side validation - updated for firstName and lastName
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setMessage({
        text: "Please fill in all required fields.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      setLoading(false);
      return;
    }

    if (!termsChecked) {
      setMessage({
        text: "You must agree to the Terms and Conditions.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    // Get API base URL from environment variable
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
        // Target your GraphQL endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: SIGNUP_MUTATION,
          variables: {
            firstName: firstName, // Sending firstName
            lastName: lastName, // Sending lastName
            email: email,
            password: password,
            role: role, // Send the selected role
            // phoneNumber and address are removed from variables as per backend error
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL Signup Error:", result.errors);
        const errorMessageText =
          result.errors.map((err: any) => err.message).join(", ") ||
          "An unknown error occurred during signup.";
        setMessage({
          text: `Signup failed: ${errorMessageText}`,
          type: "error",
        });
      } else if (
        result.data &&
        result.data.signup &&
        result.data.signup.message
      ) {
        setMessage({ text: result.data.signup.message, type: "success" });
        // Store email for OTP verification if needed
        localStorage.setItem("userEmailForOtp", email);

        // Redirect to OTP page after a short delay
        setTimeout(() => {
          router.push("/otp"); // Assuming your OTP page is at /otp
        }, 2000);
      } else {
        console.error("Unexpected API response for signup:", result);
        setMessage({
          text: "An unexpected response was received from the server. Please try again.",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Network or parsing error during signup:", error);
      setMessage({
        text: `An error occurred: ${
          error.message ||
          "Please check your internet connection and try again."
        }`,
        type: "error",
      });
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen bg-pattern-3 bg-no-repeat bg-blend-multiply bg-red-800 bg-opacity-70 bg-cover bg-center flex items-center justify-center p-4">
      {/* Dark green background */}
      <div className="bg-white rounded-2xl shadow-xl flex max-w-5xl lg:w-full overflow-hidden">
        {/* Left Column - Signup Form */}
        <div className="lg:w-1/2 md:lg:w-1/2 p-12 flex flex-col justify-center">
          <Link href="/">
            <Image src="/logos.png" alt="logo" width={100} height={100} />
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Welcome</h1>
          <p className="text-gray-600 mb-6">Please enter your details.</p>

          {/* Social login buttons (keep if needed, otherwise remove) */}
          <Button
            type="button"
            title="Sign up with Apple"
            icon="/apple.png"
            variant="w-full bg-black text-white border border-gray-300 rounded-xl py-4 flex items-center justify-center gap-2 mb-4 font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          />
          <Button
            type="button"
            title="Sign up with Google"
            icon="/google.png"
            variant="w-full border border-gray-300 rounded-xl py-4 flex items-center justify-center gap-2 mb-4 font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          />

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Display message */}
          {message && (
            <p
              className={`text-center mb-4 ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-xl py-4 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Image
                src="/mail.svg"
                width={20} // Adjust width for smaller icon
                height={20} // Adjust height for smaller icon
                alt="Mail icon"
                className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Removed Address and Phone Number inputs as per backend schema */}
            {/* If these fields are needed for user profile after signup, they should be handled separately
                or your backend's signup mutation needs to be updated to accept them. */}

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-xl py-4 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Image
                src="/eye.svg" // Assuming eye.svg is in your public folder
                width={20}
                height={20}
                alt="Eye icon"
                className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password" // Use type="password" for confirm password
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-xl py-4 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Image
                src="/eye.svg"
                width={20}
                height={20}
                alt="Eye icon"
                className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Role Selection Dropdown - Adjusted to w-full */}
            <div>
              <select
                className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">-- Select your role --</option>
                <option value="user">User</option>
                <option value="installer">Installer</option>{" "}
                {/* Changed "Admin" to "Installer" to match common roles */}
              </select>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex justify-between items-center text-sm mb-6">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 accent-orange-500"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  required
                />
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-orange-500 font-bold hover:underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit" // This is the submit button for the form
              className="w-full bg-orange-500 text-white font-semibold py-4 rounded-xl hover:bg-orange-600 transition-colors"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6">
            You have an account?{" "}
            <Link
              href="/SignIn" // Assuming your SignIn page path
              className="text-orange-500 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:block lg:block md:w-1/2 lg:w-1/2">
          <Image
            src="/l2.jpg"
            width={600}
            height={500}
            alt="Solar background"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
