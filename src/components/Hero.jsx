import React, { useState } from 'react'


const Hero = ({ setYoutubeurl, videoDetails, youtubeurl }) => {
    const [urlinput, setUrlinput] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const isValidYoutubeVideoUrl = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]{11}(?:&.*)?$/;
        return pattern.test(url);
    };
    const downloadvideos = () => {
        setYoutubeurl(urlinput)
        if (!isValidYoutubeVideoUrl(urlinput)) {
            setErrorMessage("Invalid URL");
            return;
        } else {
            setErrorMessage('')
        }
    }
    return (
        <>
            <div className='w-full xl:h-[400px]  h-auto pt-8 pb-8 bg-[#E0FBE2] flex flex-col gap-11 justify-center items-center' >
                <div className='xl:w-[60%] w-[90%] h-auto font-sans'>
                    <h1 className='xl:text-3xl text-2xl text-center'> The Ultimate Hub for Youtube Video & Shorts Downloads</h1>
                </div>

                <div className='xl:w-[50%] w-[90%] h-auto bg-white p-1 rounded-sm flex justify-between gap-2'>
                    <input onChange={(e) => setUrlinput(e.target.value)} className='xl:w-[80%] w-[70%] h-[45px] p-2 outline-0' type='search' placeholder={!youtubeurl ? 'Paste YouTube Link and Enjoy Your Video ' : videoDetails?.title} />
                    <button
                        onClick={() => downloadvideos()}
                        className={`xl:w-[18%] w-[25%] h-[45px] cursor-pointer rounded-sm text-white ${errorMessage ? 'bg-[#e89b9b]' : 'bg-[#5A639C]'
                            }`}
                    >
                        {errorMessage ? errorMessage : 'Download'}
                    </button>

                </div>
                <div className='xl:w-[90%] w-[95%] h-auto  flex flex-col gap-3'>
                    <h1 className='text-2xl text-center'>{videoDetails?.title}</h1>
                    <p className='text-center'>
                        {videoDetails?.description ? videoDetails.description.slice(0, 500) : ''}...
                    </p>
                </div>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/pKNxzw5Kd5A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title='s'></iframe> */}

            </div>
        </>
    )
}

export default Hero
