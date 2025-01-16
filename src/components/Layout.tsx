import React from 'react';
    import { Link, Outlet } from 'react-router-dom';
    import { FileText, Upload, LogIn, LogOut } from 'lucide-react';
    import { useAuth } from '../contexts/AuthContext';

    export function Layout() {
      const { user, logout } = useAuth();

      return (
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                    <FileText className="h-6 w-6 mr-2" />
                    <span className="font-semibold">Paper Review</span>
                  </Link>
                  <div className="ml-6 flex space-x-4">
                    <Link
                      to="/reviews"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      Reviews
                    </Link>
                    <Link
                      to="/upload"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  {user ? (
                    <button
                      onClick={logout}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </main>
        </div>
      );
    }
