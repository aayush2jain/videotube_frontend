import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setmessage] = useState("");
    const submit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "https://backend-five-zeta-26.vercel.app/user/",
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include cookies
            }
        );

        if (response.status === 299) {
            setmessage(response.data.message);
        } else if (response.status === 200) {
            setmessage('');
            console.log('Cookies:', document.cookie); // Log cookies
            navigate('/home'); // Redirect on successful login
        }
    } catch (error) {
        console.error('Login Error: ', error);
        setmessage('Login failed. Please check your credentials.');
    }
};


  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-black'>
            <div className='w-[30vw] h-[50vh] rounded-3xl flex flex-col absolute top-[30vh] left-[40vw] bg-white'>
                <h1 className='mt-[8vh] font-semibold my-4 text-xl mx-[3.5vw]'>Log In</h1>
                <form onSubmit={submit}>
                    {/* <input type='text' placeholder='UserName' onChange={(e) => setUsername(e.target.value)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' /> */}
                    <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                   
                    <button type='submit' className='width-[10vw] mx-[2.5vw] py-3 bg-black text-white text-xl rounded-xl'>Log In</button>
                </form>
                {/* <div className='flex flex-row rounded-xl border-black border-2 w-[25vw] ml-[2.5vw] mt-2'>
                    <div className="mt-6 ml-[5vw]">
                        <img src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' alt='Google Logo' />
                    </div>
                    <button type='button' className='width-[10vw] mr-[2.5vw] py-3 text-xl mt-[2vh]'>Continue using Google</button>
                </div> */}
                <a href="/signup" className='text-center mt-1 underline text-black decoration-black'>not Registered? Sign in</a>
                <h1 className='text-center text-red-600 font-semibold'>{message}</h1>
            </div>
        </div>
    </>
  )
}

export default Login
