import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('coverImage', coverImage);
        formData.append('avatar', avatar);

        try {
            const response = await axios.post("https://newrepo-eight-theta.vercel.app/user/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
             if(response){
                navigate('/');
             }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError('User already registered with this email or username.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className="w-full min-h-screen bg-black flex items-center justify-center px-4">
  <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 md:p-8">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>

    {error && (
      <p className="text-red-600 text-center font-medium mb-4">{error}</p>
    )}

    <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold text-sm mb-2">Profile Image</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setAvatar)}
          required
          className="w-full file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-gray-100 rounded-xl cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold text-sm mb-2">Cover Image</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setCoverImage)}
          required
          className="w-full file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-gray-100 rounded-xl cursor-pointer"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white text-lg font-semibold rounded-xl flex justify-center items-center hover:bg-gray-900 transition"
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
              ></path>
            </svg>
          ) : (
            'Sign Up'
          )}
        </button>
      </div>
    </form>

    <div className="text-center mt-5">
      <a href="/" className="text-blue-600 hover:underline font-medium text-sm">
        Already Registered? Log in
      </a>
    </div>
  </div>
</div>
    );
};

export default Signup;
