import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { auth } from '../config/firebase';

import Login from './Login';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  // }, []);

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
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="text-white font-bold text-xl">
                My Illustrator
              </span>
            </Link>
          </div>

          <div className="ml-10 flex items-baseline space-x-4">
            {user ? (
              <button>
                <img
                  className="rounded-full ml-4 cursor-pointer w-10 h-10"
                  src={user?.photoURL}
                  alt={user?.displayName}
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div
                    ref={menuRef}
                    className="absolute right-8 top-12 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white w-full text-left"
                    >
                      Profile
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
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>{' '}
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <button onClick={handleLoginModalClose}>Close</button>
              <Login />
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
