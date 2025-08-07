// src/VideoUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUploadForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);

    try {
      await axios.post("https://newrepo-eight-theta.vercel.app/video/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true // Include cookies
      });
      navigate('/home');
    } catch (error) {
       setError('Failed to upload the video. Please try again with a lesser file size.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen py-[15vh] px-4 flex items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Upload Video</h2>

        {error && <div className="text-red-500 font-medium text-center">{error}</div>}

        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-lg font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            id="duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="videoFile" className="block text-lg font-medium text-gray-700 mb-1">
            Video File
          </label>
          <input
            id="videoFile"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-lg font-medium text-gray-700 mb-1">
            Thumbnail Image
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-3xl transition duration-200"
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>

        {loading && (
          <div className="text-center mt-4 text-blue-500 font-medium text-lg">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
            <p className="mt-2 animate-pulse">Uploading, please wait...</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default VideoUploadForm;
