import React, { useState } from 'react'


const Hero = ({ playlistdetails, setPlaylisturl }) => {
    const [inputurl, setInputurl] = useState('')
    const [errorplaylisturl, setErrorplaylisturl] = useState('')
    //   console.log('playlistdata title',playlistdata.description)
    //setPlaylisturl
    const validateYouTubeUrl = (url) => {
        const regex = /^https:\/\/www\.youtube\.com\/playlist\?list=/;
        return regex.test(url);
    };

    const updateplaylist = () => {
        setPlaylisturl(inputurl)
        if (!validateYouTubeUrl(inputurl)) {
            setErrorplaylisturl("Invalid URL");
            return;
        } else {
            setErrorplaylisturl('')
        }
    }

    return (
        <>
            <div className='w-full xl:h-[400px]  h-auto pt-8 pb-8 bg-[#E0FBE2] flex flex-col gap-11 justify-center items-center' >
                <div className='xl:w-[60%] w-[90%] h-auto font-sans'>
                    <h1 className='xl:text-3xl text-2xl text-center'> The Ultimate Hub for Youtube Playlist Downloads</h1>
                </div>

                <div className='xl:w-[50%] w-[90%] h-auto bg-white p-1 rounded-sm flex justify-between gap-2'>
                    <input onChange={(e) => setInputurl(e.target.value)} className='xl:w-[80%] w-[70%] h-[45px] p-2 outline-0' type='search' placeholder={playlistdetails?.title ? playlistdetails?.title : 'Paste YouTube Playlist Link and Enjoy Your Playlist '} />
                    <button onClick={() => updateplaylist()} className={`xl:w-[18%] w-[25%] h-[45px]  cursor-pointer  rounded-sm text-white ${errorplaylisturl ? 'bg-[#e89b9b]' : 'bg-[#5A639C]'}`}>{errorplaylisturl ? errorplaylisturl : 'Download'}</button>
                </div>
                <div className='xl:w-[90%] w-[95%] h-auto  flex flex-col gap-3'>
                    <h1 className='text-2xl text-center'>{playlistdetails?.title}  {playlistdetails?.author?.name} ({playlistdetails?.items?.length})</h1>
                    <p className='text-center'>
                        {playlistdetails?.description?.slice(0, 200)}...
                    </p>
                </div>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/pKNxzw5Kd5A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title='s'></iframe> */}

            </div>
        </>
    )
}

export default Hero
