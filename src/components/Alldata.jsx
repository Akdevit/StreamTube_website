import React, { useState } from 'react';
import { IoIosCloudDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loader icon
import { BASE_URL } from '../baseurl';
import Videowatch from './videowatch';
import Relatedvideowatch from "./relatedvideowatch";
// import axios from 'axios';

const Alldata = ({ extractyoutubedata, loadder, setYoutubeurl }) => {
  const [showvideomodal, setShowvideomodal] = useState(false);
  const [showidmodal, setIdmodal] = useState(false);
  const [videourl, setVideourl] = useState();
  const [idsetvideourl, setIdsetvideourl] = useState();
  const [currentView, setCurrentView] = useState('download_videos');
  const [downloadStatus, setDownloadStatus] = useState({}); // State for download status
  // const [lodderimg, setLodderimg] = useState(false)
  const [loadingThumbnail, setLoadingThumbnail] = useState({}); // State to manage loading for each thumbnail


  console.log("extractyoutubedata", extractyoutubedata.formats);
  console.log("data", extractyoutubedata);

  const thumb = extractyoutubedata?.videoDetails?.thumbnails[4];
  const thumbsecond = extractyoutubedata?.videoDetails?.thumbnails[3];

  const thumbnails = extractyoutubedata?.videoDetails?.thumbnails;

  /* popup open and video play */
  const watchvideos = (url) => {
    setShowvideomodal(true);
    setVideourl(url);
  };

  const watchvideosidurl = (url) => {
    setIdmodal(true);
    setIdsetvideourl(url);
  };

  /* download thumbanels/images */



  /* download video related video section */
  const downloadplaylistvideos = async (videoUrl, id, title) => {
    setDownloadStatus((prev) => ({ ...prev, [id]: 'loading' }));

    const apiUrl = `${BASE_URL}download?url=${encodeURIComponent(videoUrl)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `StreamTube_${title}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setDownloadStatus((prev) => ({ ...prev, [id]: 'done' }));
    } catch (error) {
      console.error('Error downloading the video:', error);
      setDownloadStatus((prev) => ({ ...prev, [id]: 'error' }));
    }
  };
  /* thumbnailsDownloader */
  const thumbnailsDownloader = async (imageUrl) => {
    setLoadingThumbnail((prev) => ({ ...prev, [imageUrl]: true }));

    const proxyUrl = `${BASE_URL}download-thumbnail?url=${encodeURIComponent(imageUrl)}`;

    try {
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'thumbnail.jpg');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoadingThumbnail((prev) => ({ ...prev, [imageUrl]: false }));
    } catch (error) {
      console.error('An error occurred while downloading the image:', error);
      setLoadingThumbnail((prev) => ({ ...prev, [imageUrl]: false }));
    }
  };



  const renderContent = () => {
    switch (currentView) {
      case 'download_videos':
        return extractyoutubedata?.formats?.map((res) => (
          <div key={res.url} className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px] bg-gray-50 rounded-md overflow-hidden relative'>
            <img className='w-full h-full object-cover' src={thumb?.url ? thumb?.url : thumbsecond?.url} alt='' />
            <div className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px]  absolute top-0 pt-2 flex flex-col justify-between'>
              <div className='w-[100px] h-[40px] bg-[#93bfcf9e] flex justify-start items-center pl-2'>
                {res.qualityLabel ? <p className=' text-2xl'>{res?.qualityLabel}</p> : <p className='texty-[10px]'>{res?.audioQuality === "AUDIO_QUALITY_MEDIUM" ? 'Med Audio' : res?.audioQuality === "AUDIO_QUALITY_LOW" ? "Low Audio" : ""}</p>}
              </div>
              <div className='w-full h-[50px] bg-[#00000049] flex justify-end items-center pr-4 gap-4'>
                <div className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center'>
                  {res?.hasAudio ? <HiMiniSpeakerWave title='Sound Available' /> : <HiMiniSpeakerXMark className='text-red-600' title='Sound Not Available' />}
                </div>
                <div onClick={() => watchvideos(res?.url)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Watch Video'>
                  <FaEye />
                </div>
                {/* <div className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Download'>
                  < IoIosCloudDownload />
                </div> */}
              </div>
            </div>
          </div>
        ));
      case 'thumbnails':
        return thumbnails?.map((res) => (
          <div key={res.url} className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px] bg-gray-50 rounded-md overflow-hidden relative'>
            <img className='w-full h-full object-cover' src={res?.url} alt='' />
            <div className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px]  absolute top-0  flex flex-col justify-between'>
              <div className='w-[100px] h-[40px] bg-[#00000049] flex justify-start items-center pl-2'>
                <p className=' text-[15px] text-white'>{res.height} x {res.width}</p>
              </div>
              <div className='w-full h-[50px] bg-[#00000049] flex justify-end items-center pr-4 gap-4'>
                <div onClick={() => thumbnailsDownloader(res.url)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Download'>
                  {loadingThumbnail[res.url] ? (
                    <AiOutlineLoading3Quarters className='animate-spin' />
                  ) : (
                    <IoIosCloudDownload />
                  )}
                </div>

              </div>
            </div>
          </div>
        ));
      case 'related_videos':
        return extractyoutubedata?.related_videos?.map((res) => (
          <div key={res.url} className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px] bg-gray-50 rounded-md overflow-hidden relative'>
            <img className='w-full h-full object-cover' src={res?.thumbnails[1]?.url} alt='' />
            <div className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px]  absolute top-0  flex flex-col justify-between'>
              <div className='w-full h-auto bg-[#00000049] flex justify-start items-center p-2'>
                <p className=' text-[10px] text-white'>{res?.title}</p>
              </div>
              <div className='w-full h-[50px] bg-[#00000049] flex justify-end items-center pr-4 gap-4'>
                <div className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Views'>
                  <p className='text-[10px]'>{res?.short_view_count_text}</p>
                </div>
                <div onClick={() => watchvideosidurl(res?.id)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Watch Video'>
                  <FaEye />
                </div>
                <div onClick={() => setYoutubeurl(`https://www.youtube.com/embed/${res?.id}`)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Search this video related'>
                  <TbArrowBigUpLineFilled />
                </div>
                <div onClick={() => downloadplaylistvideos(`https://www.youtube.com/embed/${res?.id}`, res?.id, res?.title)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Download'>
                  {downloadStatus[res.id] === 'loading' ? <AiOutlineLoading3Quarters className='animate-spin' /> :
                    downloadStatus[res.id] === 'done' ? <IoIosCloudDownload /> :
                      <IoIosCloudDownload />}
                </div>
              </div>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <>
      <div className='w-full h-auto  p-4 flex justify-center gap-4 items-center'>
        <button onClick={() => setCurrentView('download_videos')} className={`w-[150px] h-[35px] text-sm ${currentView === 'download_videos' ? 'bg-[#afeade]' : 'bg-[#95D2B3]'} rounded-md`}>Download_videos</button>
        <button onClick={() => setCurrentView('thumbnails')} className={`w-[150px] h-[35px] text-sm ${currentView === 'thumbnails' ? 'bg-[#afeade]' : 'bg-[#95D2B3]'} rounded-md`}>Thumbnails</button>
        <button onClick={() => setCurrentView('related_videos')} className={`w-[150px] h-[35px] text-sm ${currentView === 'related_videos' ? 'bg-[#afeade]' : 'bg-[#95D2B3]'} rounded-md`}>Related Videos</button>
      </div>

      <div className='w-full h-[100vh]  p-4 videosalign'>
        {loadder ? <AiOutlineLoading3Quarters className='animate-spin text-5xl' /> : renderContent()}
      </div>

      {showvideomodal && <Videowatch setShowvideomodal={setShowvideomodal} videourl={videourl} />}
      {showidmodal && <Relatedvideowatch setIdmodal={setIdmodal} idsetvideourl={idsetvideourl} />}
    </>
  );
};

export default Alldata;
