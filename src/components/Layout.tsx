import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FileText, Upload } from 'lucide-react';

export function Layout() {
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
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
