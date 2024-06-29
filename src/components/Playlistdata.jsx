import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoIosCloudDownload } from 'react-icons/io';
import Playlistvideoswatch from "../components/Playlistvideoswatch";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import loader icon
import { BASE_URL } from '../baseurl';
const Playlistdata = ({ playlistdata, lodder, playlistdetails }) => {
    const [playlistvideoshow, setPlaylistvideoshow] = useState(false);
    const [sendvideourl, setSendvideourl] = useState('');
    const [dlodders, setDlodders] = useState(Array(playlistdata.length).fill(false));
    const [downloadSuccess, setDownloadSuccess] = useState(Array(playlistdata.length).fill(false));

    const showplaylistvideo = (url) => {
        setSendvideourl(url);
        setPlaylistvideoshow(true);
    }

    const downloadplaylistvideos = async (videoUrl, index) => {
        const newDlodders = [...dlodders];
        newDlodders[index] = true;
        setDlodders(newDlodders);

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
            link.setAttribute('download', `StreamTube_playlist_${playlistdetails?.title}_#${index}.mp4`);
            document.body.appendChild(link);
            link.click();
            // Clean up resources
            link.parentNode.removeChild(link);

            const newDownloadSuccess = [...downloadSuccess];
            newDownloadSuccess[index] = true;
            setDownloadSuccess(newDownloadSuccess);

        } catch (error) {
            console.error('Error downloading the video:', error);
        } finally {
            newDlodders[index] = false;
            setDlodders(newDlodders);
        }
    };

    return (
        <>
            <div className='w-full h-[100vh] p-4 videosalign'>
                {lodder ? <AiOutlineLoading3Quarters className='animate-spin text-5xl' /> : (
                    <>
                        {playlistdata?.map((data, index) => (
                            <div key={index} className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px] bg-gray-50 rounded-md overflow-hidden relative'>
                                <img className='w-full h-full object-cover' src={data && data?.thumbnails[0]?.url} alt='' />
                                <div className='xl:w-[340px] xl:h-[200px] lg:w-[340px] lg:h-[200px] md:w-[300px] md:h-[200px] sm:w-[300px] sm:h-[200px] w-full h-[253px] absolute top-0 pt-2 flex flex-col justify-between'>
                                    <div className='w-[50px] h-[40px] bg-[#000000a3] flex justify-center items-center'>
                                        <p className='text-2xl text-white'>{data?.index}</p>
                                    </div>
                                    <div className='w-full h-[50px] bg-[#00000049] flex justify-end items-center pr-4 gap-4'>
                                        <div onClick={() => showplaylistvideo(data?.id)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Watch Video'>
                                            <FaEye />
                                        </div>
                                        <div onClick={() => downloadplaylistvideos(data?.url, data?.index)} className='w-[35px] h-[35px] rounded-full bg-white cursor-pointer flex justify-center items-center' title='Download'>
                                            {dlodders[data?.index] ? (
                                                <AiOutlineLoading3Quarters className='animate-spin' />
                                            ) : (
                                                downloadSuccess[data?.index] ? <IoIosCloudDownload /> : <IoIosCloudDownload />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {playlistvideoshow && <Playlistvideoswatch idsetvideourl={sendvideourl} setIdmodal={setPlaylistvideoshow} />}
        </>
    );
}

export default Playlistdata;
