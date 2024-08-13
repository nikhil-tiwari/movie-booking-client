import { useCallback, useEffect, useState } from "react";
import { useUserSignin } from "../hooks/mutations/user";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const { mutateAsync: signinUserAsync, isError, error } = useUserSignin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate])

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try { 
        await signinUserAsync({ email, password });
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.error("Sign in failed:", err);
      }
    },
    [email, password, signinUserAsync, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white rounded-xl"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
            >
              Login
            </button>
            {/* <div className="text-center text-gray-400">or</div> */}
            {/* <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full bg-transparent border border-blue-600 text-blue-600 py-2 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
            >
              Create an Account
            </button> */}
            <p className="text-gray-400 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
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

export default Signin;
