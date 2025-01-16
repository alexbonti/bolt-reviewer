import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';

    export function Login() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState<string | null>(null);
      const navigate = useNavigate();
      const { login, signup } = useAuth();

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
          await login(email, password);
          navigate('/reviews');
        } catch (err: any) {
          setError(err.message);
        }
      };

      const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
          await signup(email, password);
          navigate('/reviews');
        } catch (err: any) {
          setError(err.message);
        }
      };

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Login or Sign Up
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleLogin}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
