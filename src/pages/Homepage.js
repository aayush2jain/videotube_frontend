import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-five-zeta-26.vercel.app/user/getuser',{
          withCredentials: true // Include cookies
        })
        console.log('response', response);
        setUserData(response.data.email);
        setUserName(response.data.username);
        setid(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://backend-five-zeta-26.vercel.app/user/c/${id}`,{
            withCredentials: true // Include cookies
          });
          console.log('hello', response);

          setUserName(response.data.data.username);
          setFollowing(response.data.data.channelsSubscribedToCount);
          setFollower(response.data.data.subscribersCount);
          setPicture(response.data.data.avatar);
          // if(response.data.data.isSubscribed){
          //   setsub
          // }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get('https://backend-five-zeta-26.vercel.app/video/all',{
            withCredentials: true // Include cookies
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
      <div className='h-[30vh] w-full bg-slate-200 text-white flex flex-row'>
        <div className='h-[30vh] w-[30vw] bg-slate-900 '>
          <div className='h-[30vh] w-[30vh] rounded-full overflow-hidden ml-[10vw]'>
            <img src={picture} className='object-contain rounded-full' alt='' />
          </div>
        </div>
        <div className='h-[30vh] bg-slate-900 pt-10'>
          <h1>{userData}</h1>
          <h1>@{userName}</h1>
          <h1>Subscribed to: {following}</h1>
          <h1>Subscribers: {follower}</h1>
      
        </div>
        <div className='h-[30vh] w-[60vw] bg-slate-900 pt-10 flex flex-col text-center'>
          <Link to='/upload' className='text-white hover:text-blue-500'>Upload</Link>
          <button className='hover:text-blue-500' onClick={()=>navigate('/yourvideo')}>your videos</button>
          <button className='hover:text-blue-500' onClick={logout}>Log Out</button>
        </div>
      </div>
      <div className='flex md:flex-wrap flex-col justify-evenly text-center bg-black text-white h-full pb-[10vh]'>
        {videos.map((video, index) => (
          <div key={index} onClick={()=>handleVideoClick(video._id)} className='h-[30vh] w-[20vw] hover:cursor-pointer my-10'>
            <img src={video.thumbnail} alt="" className='h-[30vh] w-[20vw] rounded-2xl'></img>
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
    </>
  );
};

export default Homepage;
