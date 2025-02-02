import axios from "axios";
import { ArrowRight, Brain, Lock, User } from "lucide-react";
import { useRef } from "react";
import { Backend_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const UserRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);
    const Navigate = useNavigate();
    
    async function signin(event: React.FormEvent) {
      event.preventDefault();
    
      const username = UserRef.current?.value;
      const password = PasswordRef.current?.value;
    
      if (!username || !password) {
        alert("Please fill in all fields");
        return;
      }
    
      const errors: Record<number, string> = {
        404: "User not found",
        401: "Incorrect Password",
        500: "Internal Server Error",
      };
    
      try {
        await axios.post(`${Backend_URL}/user/signin`, 
          { username, password }, 
          { withCredentials: true }
        );
    
        Navigate("/dashboard");
    
      } catch (err: any) {
        alert(errors[err.response?.status] || "An error occurred");
      }
    }
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-semibold">Second Brain</span>
          </Link>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">create a new account</Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={signin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={UserRef}
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={PasswordRef}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <button
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
export default SignIn;