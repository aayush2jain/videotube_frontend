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
        const response = await axios.get('https://backend-five-zeta-26.vercel.app/video/all',{
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
    <>
      <div>
      <div className='h-[7vh] w-full bg-black' >
      <div className='h-[6vh] sm:w-[60vw] md:w-[40vw] md:ml-[30vw] sm:mx-[20vw] mx-[5vw] w-[90vw] fixed bg-black/50 text-gray-300 rounded-r-3xl rounded-l-3xl pl-[5vw] flex gap-[5vw] font-semibold mb-[1vh] '>
        <div className='flex  hover:text-blue-500  ' onClick={()=>navigate('/upload')}>
          <RiUpload2Fill className='h-[6vh] text-2xl hover:cursor-pointer hover:text-blue-500  '></RiUpload2Fill>
          <button className='hover:text-blue-500 p-0 m-0' >Upload</button>
        </div>
        <div className='flex  hover:text-blue-500  ' onClick={()=>navigate('/yourvideo')}>
          <MdVideoCameraFront className='h-[6vh] text-2xl hover:text-blue-500  hover:cursor-pointer'></MdVideoCameraFront>
          <button className='hover:text-blue-500 p-0 m-0' >Your Videos</button>
        </div>
        <div className='flex hover:text-red-600' onClick={logout}>
          <IoIosLogOut className='h-[6vh] text-2xl hover:text-red-600  hover:cursor-pointer'></IoIosLogOut>
          <button className='' >Log Out</button>
          </div>
      </div>
      </div>
      <div className='flex items-center md:flex-wrap md:flex-row flex-col justify-evenly text-center bg-black text-white h-full pb-[10vh]'>
        {videos.map((video, index) => (
          <div key={index} onClick={()=>handleVideoClick(video._id)} className='h-[30vh] md:w-[20vw] w-[90vw] hover:cursor-pointer my-10'>
            <img src={video.thumbnail} alt="" className='h-[30vh] w-[90vw] rounded-2xl'></img>
            <div className='flex flex-row'>
              <div className='pt-[2vh]'>
                <img src={video.uploaderavatar} alt="" className='h-[7vh] w-[7vh] rounded-full'></img>
              </div>
              <div className='flex flex-col pl-10 pt-[1vh]'>
                <h3>{video.title}</h3>
                <h3>{video.uploadername}</h3>
                </div>
            
            </div>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Homepage;
