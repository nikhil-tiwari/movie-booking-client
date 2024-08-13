import { useCallback, useState } from "react";
import { useUserSignup } from "../hooks/mutations/user";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { mutateAsync: signupUserAsync, isError, error } = useUserSignup();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try { 
        await signupUserAsync({ firstName, lastName, email, password, city });
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.error("Sign up failed:", err);
      }
    },
    [firstName, lastName, email, password, city, signupUserAsync, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>
            {/* <div className="text-center text-gray-400">or</div> */}
            {/* <button
              type="button"
              onClick={() => navigate("/signin")}
              className="w-full bg-transparent border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button> */}
            <p className="text-gray-400 text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Click here
              </Link>
            </p>
          </div>
        </form>
        {isError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error.response?.data?.message || 'An error occurred. Please try again.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
