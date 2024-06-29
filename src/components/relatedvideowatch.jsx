import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const VideoWatch = ({ idsetvideourl, setIdmodal }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [idsetvideourl]);

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <div className='w-full h-[100vh] flex justify-center items-center bg-[#00000049] fixed top-0 z-50' onClick={() => setIdmodal(false)}>

                <div className='xl:w-[50%] xl:h-[60%] lg:w-[50%] lg:h-[60%] md:w-[80%] md:h-[60%] sm:w-[80%] sm:h-[60%] w-[95%] h-[50%] bg-white rounded-md p-4 relative'>

                    {loading && <div className='absolute inset-0 flex justify-center items-center bg-white z-10'>
                        <div className='loader'><AiOutlineLoading3Quarters className='animate-spin text-2xl' /> </div> {/* Add your loading spinner here */}
                    </div>}
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${idsetvideourl}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title='youtube_videos'
                        onLoad={handleLoad}
                    ></iframe>
                </div>
            </div>
        </>
    );
}

export default VideoWatch;
