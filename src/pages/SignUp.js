import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate= useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [avatar, setavatar] = useState(null);

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };
  

    const submit = async (e) => {
         navigate('/')
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('coverImage', coverImage);
        formData.append('avatar', avatar);

        try {
            const request=await axios.post("/user/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(request.status===200){
              
            }
           
            // Handle successful registration (e.g., display a success message or redirect)
        } catch (error) {
            console.log(error);
            // Handle registration error (e.g., display an error message)
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-black'>
            <div className='w-[30vw] h-[80vh] rounded-3xl flex flex-col absolute top-[10vh] left-[40vw] bg-white'>
                <h1 className='mt-[8vh] font-semibold my-4 text-xl mx-[3.5vw]'>SIGN UP</h1>
                <form onSubmit={submit} encType='multipart/form-data'>
                    <input type='text' placeholder='UserName' onChange={(e) => setUsername(e.target.value)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                    <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                    <input type='file' id='coverImage' onChange={(e) => handleFileChange(e, setCoverImage)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                    <input type='file' id='profileImage' onChange={(e) => handleFileChange(e, setavatar)} className='py-[2vh] mb-[2vh] mx-[2.5vw] pl-4 rounded-xl bg-gray-200' />
                    <button type='submit' className='width-[10vw] mx-[2.5vw] py-3 bg-black text-white text-xl rounded-xl'>Sign up</button>
                </form>
                {/* <div className='flex flex-row rounded-xl border-black border-2 w-[25vw] ml-[2.5vw] mt-2'>
                    <div className="mt-6 ml-[5vw]">
                        <img src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' alt='Google Logo' />
                    </div>
                    <button type='button' className='width-[10vw] mr-[2.5vw] py-3 text-xl mt-[2vh]'>Continue using Google</button>
                </div> */}
                <a href="/" className='text-center mt-1 underline text-black decoration-black'>Already Registered? Sign in</a>
            </div>
        </div>
    );
};

export default Signup;
