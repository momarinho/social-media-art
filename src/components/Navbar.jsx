import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { auth } from '../config/firebase';

import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [menuRef]);

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <span className="font-bold text-xl text-blue-300">
                My Illustrator
              </span>
            </Link>
          </div>

          <div className="flex justify-center">
            <Link
              to="/search"
              className="flex items-center ml-4 cursor-pointer text-white text-xl bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
                width="26"
                height="26"
              >
                <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M338.29 338.29L448 448"
                ></path>
              </svg>
            </Link>

            <Link to="/chat" onClick={() => window.scrollTo(0, 0)}>
              <button className="flex items-center ml-4 cursor-pointer text-white text-xl bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full">
                Chat
              </button>
            </Link>
          </div>

          <div className="ml-10 flex items-baseline space-x-4">
            {user ? (
              <div className="flex justify-around">
                <Link to="/add" onClick={() => window.scrollTo(0, 0)}>
                  <div className="flex items-center cursor-pointer text-white text-xl bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-full">
                    +
                  </div>
                </Link>

                <button>
                  <img
                    className="rounded-full ml-4 cursor-pointer w-10 h-10"
                    src={
                      user.providerData[0].providerId === 'google.com'
                        ? user.photoURL
                        : user.userPhoto
                    }
                    alt={user.displayName}
                    onClick={() => setShowMenu(!showMenu)}
                  />
                  {showMenu && (
                    <div
                      ref={menuRef}
                      className="absolute right-16 top-12 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
                    >
                      <Link
                        key={user.uid}
                        to={`/profile/${user.uid}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/add"
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                      >
                        Add New Post
                      </Link>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                        onClick={() => setShowLogoutModal(true)}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginButtonClick}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-90">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
              <div className="flex justify-end pt-4 pr-4">
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
                  onClick={() => setShowLoginModal(false)}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <Login />
              </div>
            </div>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-90">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Logout Confirmation
              </h2>
              <p className="mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
