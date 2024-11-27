import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUserRound, Calendar, Clock, Layout } from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'; // Add this import

function HomePage() {
const navigate = useNavigate();
const { user, logOut } = useFirebaseAuth(); // Add this hook

const handleSignIn = () => {
  navigate('/auth');
};

const handleSignUp = () => {
  navigate('/auth', { state: { signup: true } });
};

const handleDashboard = () => {
  navigate('/dashboard');
};

return (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <CircleUserRound className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-semibold">PinMaster</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              // Show these buttons for authenticated users
              <>
                <button
                  onClick={handleDashboard}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={logOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              // Show these buttons for non-authenticated users
              <>
                <button
                  onClick={handleSignIn}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Sign in
                </button>
                <button
                  onClick={handleSignUp}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Automate Your</span>
            <span className="block text-red-600">Pinterest Strategy</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Schedule pins, manage multiple accounts, and optimize your Pinterest presence with our powerful automation tools.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {user ? (
              // Show dashboard button for authenticated users
              <div className="rounded-md shadow">
                <button
                  onClick={handleDashboard}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              // Show sign up/sign in buttons for non-authenticated users
              <>
                <div className="rounded-md shadow">
                  <button
                    onClick={handleSignUp}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                  >
                    Create Free Account
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Sign in
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rest of your component remains the same */}
        {/* ... Features grid ... */}
        {/* ... Footer ... */}
      </div>
    </main>

    {/* Your existing footer */}
  </div>
);
}

export default HomePage;
