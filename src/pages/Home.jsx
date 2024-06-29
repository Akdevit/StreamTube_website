import React, { useEffect, useState } from 'react'
import Hero from "../components/Hero"
import Alldata from "../components/Alldata";
import Nav from '../components/Nav';
import { BASE_URL } from '../baseurl';
const Home = () => {
    const [extractyoutubedata, setExtractyoutubedata] = useState([]);
    const [videoDetails, setVideoDetails] = useState([]);
    const [loadder, setLoader] = useState(false);
    const [youtubeurl, setYoutubeurl] = useState(
        "https://www.youtube.com/watch?v=iSNoJk5nt3c"
    );
    const [errorMessage, setErrorMessage] = useState('')
    const isValidYoutubeVideoUrl = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]{11}(?:&.*)?$/;
        return pattern.test(url);
    };

    useEffect(() => {
        if (!isValidYoutubeVideoUrl(youtubeurl)) {
            setErrorMessage("Invalid URL");
            return;
        } else {
            setErrorMessage('')
        }

        setLoader(true);
        fetch(`${BASE_URL}info?url=${youtubeurl}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setExtractyoutubedata(data);
                setVideoDetails(data?.videoDetails);
                setLoader(false);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoader(false);
            });

    }, [youtubeurl]);

    return (
        <>
            <Nav />
            <Hero setYoutubeurl={setYoutubeurl} videoDetails={videoDetails} youtubeurl={youtubeurl} errorMessage={errorMessage} />
            <Alldata extractyoutubedata={extractyoutubedata} loadder={loadder} setYoutubeurl={setYoutubeurl} />
        </>
    )
}

export default Home
