import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setmessage] = useState('');
  const [loading, setloading] = useState(false);

  const submit = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://newrepo-eight-theta.vercel.app/user/',
        { email, password },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      if (response.status === 299) {
        setmessage(response.data.message);
      } else if (response.status === 200) {
        setmessage('');
        navigate('/');
      }
    } catch (error) {
      console.error('Login Error: ', error);
      setmessage('Login failed. Please check your credentials.');
    }
    setloading(false);
  };

const handleGoogleLogin = async (credentialResponse) => {
  console.log('Google Login Response:', credentialResponse);
  try {
    const res = await axios.post(
      'https://newrepo-eight-theta.vercel.app/auth/google',
      {
        token: credentialResponse.credential, // ✅ Make sure it's sent in body
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      const response = await axios.post(
        'https://newrepo-eight-theta.vercel.app/user/google',
        {
          email: res.data.email,
          name: res.data.name,
          picture: res.data.picture,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setmessage('');
        navigate('/');
      } else {
        setmessage('Google login failed. Please try again.');
      }
    }
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="w-screen h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-cyan-700">Log In</h1>

        <form onSubmit={submit} className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-cyan-50 border border-cyan-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-cyan-50 border border-cyan-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700"
          >
            Log In
          </button>
        </form>

        <div className="my-4 text-gray-400">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setmessage('Google login failed.')}
        />

        <a href="/signup" className="mt-4 text-sm text-cyan-600 underline">
          Don’t have an account? Sign up
        </a>

        {message && (
          <p className="text-center text-red-600 font-semibold mt-2">{message}</p>
        )}

        {loading && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <svg
              className="animate-spin h-6 w-6 text-cyan-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
              ></path>
            </svg>
            <p className="text-sm text-cyan-600">Logging in, please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
