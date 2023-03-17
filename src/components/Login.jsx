import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () =>  {
  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {
        console.log('Signed in with Google successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error signing in with Google', error);
      });
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-4">Login</h2>

      <button className="flex justify-center" onClick={handleGoogleLogin}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="36px"
          height="36px"
        >
          <path
            fill="#4285F4"
            d="M458.7 208.2c0-16.2-1.5-32.1-4.5-47.5H262.1v89.5h123.9c-5.1 26.6-20.6 49.1-42.6 63.7v52h68.8c40.3-37.2 63.3-91.9 63.3-158.7z"
          />
          <path
            fill="#34A853"
            d="M262.1 4B8r3B4p7yhRXuBWLqsQ546WR43cqQwrbXMDFnBi6vSJBeif8tPW85a7r7DM961Jvk4hdryZoByEp8GC8HzsqJpRN4FxGM99-87.1H74.8v54.4c35.4 69.4 107.8 116.3 192.3 116.3z"
          />
          <path
            fill="#FBBC05"
            d="M144.2 246.9c-8.1-24.6-8.1-47.5 0-72.1V120H74.8c-20.5 39.7-20.5 86.2 0 125.9l69.4-54.4z"
          />
          <path
            fill="#EA4335"
            d="M262.1 95.8c28.2 0 52.7 7.6 71.6 20.5l68.8-52c-35-32.4-83-51.2-140.4-51.2-84.5 0-156.9 46.9-192.3 116.3l69.4 54.4c16.5-49.9 63-87.1 117.9-87.1z"
          />
          <path fill="none" d="M0 0h512v512H0z" />
        </svg>
      </button>
    </div>
  );
};

export default Login;
