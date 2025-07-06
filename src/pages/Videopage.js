import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Videopage = () => {
   const navigate = useNavigate();
    const location = useLocation();
    const [flag, setflag] = useState(true)
    const [id, setid] = useState("");
    const [url, seturl] = useState("")
    const [title, settitle] = useState("")
    const [avatar, setavatar] = useState("")
    const [username, setusername] = useState("")
    const [description, setdescription] = useState("")
    const [views, setviews] = useState('')
    const [content, setcontent] = useState('')
    const [videoId, setvideoid] = useState('');
    const [comments, setcomment] = useState([]);
    const [sub, setsub] = useState("subscribe")
    const [videos, setVideos] = useState([]);
    const submitcomment = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content',content);       
        try {
            await axios.post(`http://localhost:4000/comment/c/${videoId}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include cookies
            });
            setcontent("   ");
            // navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };
        const subscribe = async (e) => {
        e.preventDefault();
        if(flag)
        {
        try {
            await axios.post(`http://localhost:4000/sub/c/${videoId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include cookies
            });
            setsub("subscribed");
           setflag(false);
           
        } catch (error) {
            console.log(error);
        }
       
      }
    };



    useEffect(()=>{
    setid(location.state.id)    
    },[])

    useEffect(()=>{
        const getvideo= async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/video/c/${id}`,{
            withCredentials: true // Include cookies
          });
          console.log('bhai videodetails', response);
          console.log('video',response.data[0].videoFile)
          seturl(response.data[0].videoFile);
          settitle(response.data[0].title);
          setavatar(response.data[0].avatar[0])
          setusername(response.data[0].username[0])
          setdescription(response.data[0].description)
          setviews(response.data[0].views)
          setvideoid(response.data[0]._id)
        } catch (error) {
          console.error(error);
        }
    }
    getvideo()
    },[id])
   
  const handleVideoClick = (id) => {
   setid(id);
  };
      useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/video/all',{
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
  
        useEffect(()=>{
        const getcomment= async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/comment/video/c/${id}`,{
            withCredentials: true // Include cookies
          });
          console.log('bhai commentdetailsdetails', response);
          console.log('video',response.data)
          setcomment(response.data);
          // seturl(response.data[0].videoFile);
          // settitle(response.data[0].title);
          // setavatar(response.data[0].avatar[0])
          // setusername(response.data[0].username[0])
          // setdescription(response.data[0].description)
          // setviews(response.data[0].views)
          // setvideoid(response.data[0]._id)
        } catch (error) {
          console.error(error);
        }
    }
    getcomment()
    },[id,comments])
    console.log("location",id);

  return (
    <div className="min-h-screen w-full bg-black text-white">
  {/* Video Player */}
  <div className='w-full h-[90vh] flex justify-center items-center bg-neutral-900'>
  <video
    src={url}
    className="w-full h-full object-contain bg-black"
    controls
    autoPlay
  ></video>
  </div>

  <div className="flex flex-col md:flex-row w-full">
    {/* Left Section: Video Info + Comments */}
    <div className="w-full md:w-[60%] px-6 py-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 break-words"> {title}</h1>

      {/* Uploader Section */}
<div className="flex items-center justify-between mb-4">
  <div className="flex items-center gap-4">
    <img src={avatar} alt="Uploader avatar" className="h-12 w-12 rounded-full object-cover" />
    <div>
      <h2 className="text-lg font-semibold">@{username}</h2>
    </div>
    <button
    onClick={subscribe}
    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full transition"
  >
    {sub}
  </button>
  </div>
  {/* Rating System */}
<div className="flex items-center gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <svg
      key={star}
     // You should define `setRating`
      xmlns="http://www.w3.org/2000/svg"
      // highlight based on selection
      viewBox="0 0 24 24"
      stroke="#facc15"
      strokeWidth={2}
      className="w-6 h-6 cursor-pointer transition hover:scale-110"
    >
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.285 3.956c.3.921-.755 1.688-1.538 1.118l-3.371-2.449a1 1 0 00-1.175 0l-3.371 2.45c-.783.569-1.838-.198-1.539-1.12l1.286-3.955a1 1 0 00-.364-1.118L2.98 9.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.286-3.956z" />
    </svg>
  ))}
  <span className="text-gray-400 ml-2">4.6 stars</span>
</div>
</div>




      {/* Description */}
      <div className="bg-neutral-900 rounded-xl p-4 mb-6">
        <h3 className="font-semibold mb-1">Description</h3>
        <p className="text-gray-300 whitespace-pre-line">{description}</p>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-xl font-bold mb-2"><span>{comments.length}</span> Comments</h3>
        <form onSubmit={submitcomment} className="flex flex-col gap-4 mb-6">
          <div className="flex gap-3">
            <img src={avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <input
              type="text"
              placeholder="Add a comment..."
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Comment
            </button>
          </div>
        </form>

        {/* Display Comments */}
        <div className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-3 justify-start items-center mr-24 bg-neutral-900 p-1 rounded-lg">
              <img
                src={comment.owneravatar[0]}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className='pl-2'>
                <p className="font-semibold">@{comment.ownerusername[0]}</p>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Section: Suggested Videos */}
    <div className="w-full md:w-[40%]  px-4 py-6">
      <h3 className="text-lg font-bold mb-4"> Suggested Videos</h3>
      <div className="flex flex-col gap-6">
        {videos.slice(-10).map((video, index) => (
          <div
            key={index}
            className="flex gap-4 cursor-pointer hover:to-neutral-950 bg-gradient-to-br from-neutral-800 to-neutral-900 p-2 rounded-lg transition"
            onClick={() => handleVideoClick(video._id)}
          >
            <img
              src={video.thumbnail}
              alt=""
              className="h-24 w-40 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold line-clamp-2">#{video.title}</h4>
              <p className="text-sm text-gray-400">@{video.uploadername}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

export default Videopage