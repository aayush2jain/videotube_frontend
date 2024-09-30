import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Yourvideo = () => {
    const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //new thing
  const [userid, setuserid] = useState('');
  const [username, setusername] = useState('');
  const [avatar, setavatar] = useState('');
  const [coverImage, setcoverImage] = useState('');
    const handleVideoClick = (id) => {
    navigate('/video', { state: { id } });
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
         const response = await axios.get('https://backend-five-zeta-26.vercel.app/user/getuser',{
          withCredentials: true // Include cookies
        });
        console.log('response', response);
        setavatar(response.data.avatar);
        setcoverImage(response.data.coverImage);
        setusername(response.data.username);
        setuserid(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://backend-five-zeta-26.vercel.app/video/show',{
          withCredentials:true
        });
        console.log("data",response)
        setVideos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className='bg-black'>
    <div className='w-full h-[20vw] bg-black relative object-cover '>
     <img src={coverImage} alt='' className='md:h-[20vw] h-[40vw] w-full'></img>
        <div className='md:w-[13vw] flex md:h-[13vw] w-[20vw] h-[20vw] bg-black/100 absolute md:top-[13vw] top-[30vw] left-[1vw]'>
        
        <img src={avatar} alt='' className='md:w-[13vw] md:h-[13vw] w-[20vw] h-[20vw] rounded-full '></img>
        
        <h1 className='ml-[3vw] text-white font-normal z-50 md:mt-[7vw] mt-[13vw]  text-2xl'>@{username}</h1>
        </div>
      </div>
    
    <div className='flex md:flex-wrap mt-[20vh] flex-col md:flex-row bg-black text-white justify-around items-center pb-[10vh] '>
    
        {videos.map((video, index) => (
          <div key={index} className='h-[30vh] md:w-[20vw] w-[90vw]  bg-black rounded-2xl my-10 ' onClick={()=>handleVideoClick(video._id)}>
            <img src={video.thumbnail} alt="" className='h-[30vh] md:w-[20vw] w-[90vw] rounded-2xl'></img>
            <div className='flex flex-row pt-2'>
              <div>
                <img src={video.uploaderavatar} alt="" className='h-[7vh] w-[7vh] rounded-full'></img>
              </div>
              <div className='flex flex-col pl-10'>
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

export default Yourvideo;
