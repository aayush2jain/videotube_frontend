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
            await axios.post(`https://backend-five-zeta-26.vercel.app/comment/c/${videoId}`, formData, {
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
            await axios.post(`https://backend-five-zeta-26.vercel.app/sub/c/${videoId}`, {
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
          const response = await axios.get(`https://backend-five-zeta-26.vercel.app/video/c/${id}`,{
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
  
        useEffect(()=>{
        const getcomment= async()=>{
        try {
          const response = await axios.get(`https://backend-five-zeta-26.vercel.app/comment/video/c/${id}`,{
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
    },[id])
    console.log("location",id);

  return (
    <>
    <div className=' h-[90vh] w-full bg-black text-white '>
      <video src={url} className='h-[90vh] w-full' controls autoPlay></video>
      <div className='flex flex-row pl-[1vw] bg-black'>
      <div className='w-[60vw] flex flex-col pt-[2vh] '>
        <div className='text-2xl font-semibold'><h1>title:{title}</h1></div>
        <div id="sub" className='flex flex-row h-[10vh] gap-5 py-2'>
        <div>
          <img alt="" src={avatar} className='h-[10vh] w-[10vh] rounded-full'></img>
        </div>
        <div className='justify-center content-center font-semibold'>
        <h1>@{username}</h1>
        </div>
        <button onClick={subscribe} className='rounded-3xl h-[8vh] px-1 bg-red-500 content-center justify-center font-semibold  '>
          {sub}</button>
        </div>
      {/* <h1>views:{views}</h1> */}
      <div className='bg-slate-900 rounded-xl p-2'>
      <h1>description:</h1>
      <p>{description}</p>
      </div>
      <div>
        <h1 className='text-xl font-bold'>comments</h1>
        <form onSubmit={submitcomment}>
          <div className='flex flex-row'>
         <img alt="" className='w-[4vw] h-[4vw] rounded-full' src={avatar}></img>
        <input type='text' placeholder='Add a comment' value={content} className='w-[35vw] bg-black text-white border-black pl-2 focus:border-none focus:outline-none focus-visible:border-black' onChange={(e)=>{setcontent(e.target.value)}}> 
        </input>
        <button type='submit'>comment</button>
        </div>
        </form>
        {comments.map((comment,index)=>(
            <div key={index} className='flex flex-row bg-black'>
             <div className='w-[5vw] h-[5vw] '>
              {/* {comment.owneravatar[0]} */}
              <img alt="" className='w-[4vw] h-[4vw] rounded-full' src={comment.owneravatar[0]}></img>
             </div>
             <div className='flex flex-col'>
             <h1>@{comment.ownerusername[0]}</h1>
             <h1>{comment.content}</h1>
             </div>
            </div>
        ))}
      </div>
      </div>
      <div className='w-[40vw] bg-slate-500'>
      <div className='flex flex-col  text-center bg-black text-white h-full'>
        {videos.slice(-10).map((video, index) => (
          <div key={index}  className='h-[30vh] w-[40vw] flex flex-row hover:cursor-pointer' onClick={()=>handleVideoClick(video._id)}>
            <img src={video.thumbnail} alt="" className='h-[20vh] w-[15vw] rounded-2xl'></img>

              <div className='flex flex-col pt-[1vh]'>
                <h3>#{video.title}</h3>
                <h3>@{video.uploadername}</h3>
                </div>
            
            </div>
        ))}
      </div>
      </div>
      </div>

    </div>
    </>
  )
}

export default Videopage