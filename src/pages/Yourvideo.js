import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Yourvideo = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userid, setuserid] = useState('');
  const [username, setusername] = useState('');
  const [avatar, setavatar] = useState('');
  const [coverImage, setcoverImage] = useState('');

  const handleVideoClick = (id) => {
    navigate('/video', { state: { id } });
  };

  const handleDeleteVideo = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this video?");
  if (!confirmed) return;
    try {
      await axios.delete(`https://newrepo-eight-theta.vercel.app/video/delete/${id}`, {
        withCredentials: true,
      });

      // Remove the video from UI
      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Failed to delete the video.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://newrepo-eight-theta.vercel.app/user/getuser', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log('User data:', response.data);
        setavatar(response.data.avatar);
        setcoverImage(response.data.coverImage);
        setusername(response.data.username);
        setuserid(response.data._id);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error(
          "something wrong here",error);
          navigate('/signin');
        }
        
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const response = await axios.get('https://newrepo-eight-theta.vercel.app/video/show', {
  //         withCredentials: true,
  //       });
  //       setVideos(response.data);
  //       console.log('Fetched videos:', response.data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVideos();
  // }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-black min-h-screen'>
      {/* Cover and Avatar */}
      <div className='w-full h-[20vw] bg-black relative '>
        <div className='md:w-full md:h-[20vw] w-[100vw] h-[40vw] bg-black relative'>
        <img src={coverImage} alt='' className='h-full w-full object-cover' />
        </div>
        <div className='md:w-[13vw] flex md:h-[13vw] w-[20vw] h-[20vw] bg-black/0 absolute md:top-[13vw] top-[30vw] left-[1vw]'>
          <img src={avatar} alt='' className='md:w-[13vw] md:h-[13vw] w-[20vw] h-[20vw] rounded-full' />
          <h1 className='ml-[3vw] text-white font-normal z-50 md:mt-[7vw] mt-[13vw] text-2xl'>@{username}</h1>
        </div>
      </div>

     {/* Video Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[16vh] md:mt-[10vh] py-12 px-6">
  {videos.map((video, index) => (
    <div
      key={index}
      onClick={() => handleVideoClick(video._id)}
      className="group bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-[24vh] overflow-hidden rounded-t-xl">
        <img
          loading="lazy"
          src={video.thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 p-3 relative">
        <img
          src={video.uploaderavatar}
          alt="Uploader avatar"
          className="h-10 w-10 rounded-full border-2 border-cyan-600 object-cover"
        />

        <div className="w-full text-left">
          <h3 className="text-white font-medium text-sm line-clamp-2 break-words">
            {video.title}
          </h3>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>@{video.uploadername}</span>
            <span>{video.views} views</span>
          </div>
        </div>
        {/* Delete Button */}
      {video.owner === userid && (
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation
              handleDeleteVideo(video._id);
            }}
            title="Delete Video"
            className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-sm transition"
          >
            Delete
          </button>
        </div>
      )}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Yourvideo;
