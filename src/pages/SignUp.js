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
            const response = await axios.post("https://backend-five-zeta-26.vercel.app/user/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
             if(response){
                navigate('/');
             }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError('User already registered with this email.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[100vw] h-full bg-black flex items-center justify-center">
            <div className="md:w-[30vw] h-full w-[80vw] md:h-full rounded-3xl flex flex-col bg-white p-4">
                <h1 className="md:mt-[8vh] mt-[4vh] my-4 text-xl text-center font-bold">SIGN UP</h1>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={submit} encType="multipart/form-data" className="mx-auto">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-[2vh] md:w-[20vw] w-[60vw] md:h-[4vw] h-[8vh] mb-[4vh] mx-auto block rounded-xl bg-gray-200 pl-4 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="py-[2vh] md:w-[20vw] w-[60vw] md:h-[4vw] h-[8vh] mb-[4vh] mx-auto block rounded-xl bg-gray-200 pl-4 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="py-[2vh] md:w-[20vw] w-[60vw] md:h-[4vw] h-[8vh] mb-[4vh] mx-auto block rounded-xl bg-gray-200 pl-4 outline-none"
                    />
                    <label className="block font-semibold text-lg text-center mb-2">Profile Image:</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, setAvatar)}
                        className="py-[2vh] md:w-[20vw] w-[60vw] md:h-[4vw] h-[9vh] mb-[4vh] mx-auto block rounded-xl bg-gray-200 pl-4 outline-none"
                        required
                    />
                    <label className="block font-semibold text-lg text-center mb-2">Cover Image:</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, setCoverImage)}
                        className="py-[2vh] md:w-[20vw] w-[60vw] md:h-[4vw] h-[9vh] mb-[4vh] mx-auto block rounded-xl bg-gray-200 pl-4 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-[60vw] md:w-[20vw] py-3 mx-auto block text-xl bg-black text-white rounded-xl flex justify-center items-center"
                        disabled={loading}
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
                            'Sign up'
                        )}
                    </button>
                </form>
                <a href="/" className="text-center mt-4 underline text-black decoration-black">
                    Already Registered? Log in
                </a>
            </div>
        </div>
    );
};

export default Signup;
