import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiUpload2Fill, RiVideoUploadFill } from "react-icons/ri";
import { MdVideoCameraFront } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
const Homepage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState('name');
  const [following, setFollowing] = useState("");
  const [follower, setFollower] = useState("");
  const [picture, setPicture] = useState("");
  const [videos, setVideos] = useState([]);
  const [id, setid] = useState("");
  // const [owner,setowner] = useState();

  // useEffect(() => {

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://backend-five-zeta-26.vercel.app/user/getuser',{
  //         withCredentials: true // Include cookies
  //       })
  //       console.log('response', response);
  //       setUserData(response.data.email);
  //       setUserName(response.data.username);
  //       setid(response.data._id);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (id) {
  //       try {
  //         const response = await axios.get(`https://backend-five-zeta-26.vercel.app/user/c/${id}`,{
  //           withCredentials: true // Include cookies
  //         });
  //         console.log('hello', response);

  //         setUserName(response.data.data.username);
  //         setFollowing(response.data.data.channelsSubscribedToCount);
  //         setFollower(response.data.data.subscribersCount);
  //         setPicture(response.data.data.avatar);
  //         // if(response.data.data.isSubscribed){
  //         //   setsub
  //         // }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [id]);

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get('https://newrepo-eight-theta.vercel.app/video/all',{
            withCredentials: true
             // Include cookies
          });
        console.log('data', response.data.videos);
        setVideos(response.data.videos);
        console.log(videos)
      } catch (error) {
        console.error(error);
      }
    };

    getAllVideos();
  }, []);
  
  const handleVideoClick = (id) => {
    navigate('/video', { state: { id } });
  };

  const logout =async()=>{
    try{
           await axios.get("/user/logout")
           navigate('/');
    }
    catch(error){
          console.log(error)
    }
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
  {/* Header */}
  <div className="w-full flex flex-wrap items-center justify-between gap-4 bg-neutral-950 px-6 py-4 border-b border-gray-700 sticky top-0 z-50">
    {/* Left: App Name */}
    <div className="text-2xl font-bold text-blue-400">VideoTube</div>

    {/* Center: Search Bar */}
    <input
      type="text"
      placeholder="Search videos..."
      className="flex-1 max-w-md bg-neutral-800 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Right: Navigation + Profile */}
    <div className="flex items-center gap-6">
      <button
        onClick={() => navigate('/upload')}
        className="hover:text-blue-400 transition"
      >
        <RiUpload2Fill className="inline text-2xl mr-1" />
        Upload
      </button>
      <button
        onClick={() => navigate('/yourvideo')}
        className="hover:text-blue-400 transition"
      >
        <MdVideoCameraFront className="inline text-2xl mr-1" />
        Your Videos
      </button>
      <button
        onClick={logout}
        className="hover:text-red-400 transition"
      >
        <IoIosLogOut className="inline text-2xl mr-1" />
        Log Out
      </button>
      <img
        src="/your-avatar.jpg" // Replace with dynamic user avatar
        alt="Profile"
        className="w-10 h-10 rounded-full border object-cover"
      />
    </div>
  </div>

  {/* Video Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-10 px-10">
    {videos.map((video, index) => (
      <div
        key={index}
        onClick={() => handleVideoClick(video._id)}
        className="group bg-gradient-to-r from-neutral-900 to-neutral-950 hover:border-b hover:border-cyan-600  transition-transform duration-300 rounded-2xl  cursor-pointer"
      >
        <div className='relative h-[35vh] overflow-hidden'>
        <img loading='lazy'
          src={video.thumbnail}
          alt="Video thumbnail"
          className="h-full group-hover:scale-105 w-full object-cover rounded-t-2xl"
        />
        </div>
      <div className="flex items-start p-4 gap-4">
  <img
    src={video.uploaderavatar}
    alt="Uploader avatar"
    className="h-12 w-12 min-w-[3rem] rounded-full border-2 border-cyan-600 object-cover"
  />
  <div className="text-left w-full">
    <h3 className="font-semibold whitespace-break-spaces text-lg text-white line-clamp-2 break-words">
      {video.title}
    </h3>

    {/* Uploader name & views */}
    <div className="flex justify-between pr-5 text-sm text-gray-300">
      <p>@{video.uploadername}</p>
      <p>{video.views} views</p>
    </div>

    {/* Rating row
    <div className="text-sm text-yellow-400 mt-1">
      ★ {video.rating ?? "4.5"} 
    </div> */}
  </div>
</div>


      </div>
    ))}
  </div>
</div>

  );
};

export default Homepage;
