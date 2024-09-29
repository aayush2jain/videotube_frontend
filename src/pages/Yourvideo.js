import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Yourvideo = () => {
    const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const handleVideoClick = (id) => {
    navigate('/video', { state: { id } });
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://backend-five-zeta-26.vercel.app/video/show',{
          withCredentials: true // Include cookies
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
    <div className='flex md:flex-wrap flex-col bg-black text-white justify-around pb-[10vh]'>
    
        {videos.map((video, index) => (
          <div key={index} className='h-[30vh] w-[20vw] bg-black rounded-2xl my-10 ' onClick={()=>handleVideoClick(video._id)}>
            <img src={video.thumbnail} alt="" className='h-[30vh] w-[20vw] rounded-2xl'></img>
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
  );
};

export default Yourvideo;
