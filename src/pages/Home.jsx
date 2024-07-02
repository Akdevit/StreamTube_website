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
        ""
    );
    //https://www.youtube.com/watch?v=iSNoJk5nt3c

  

    useEffect(() => {
       

        setLoader(true);
        fetch(`${BASE_URL}info?url=${youtubeurl}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
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
            <Hero setYoutubeurl={setYoutubeurl} videoDetails={videoDetails} youtubeurl={youtubeurl}  />
            <Alldata extractyoutubedata={extractyoutubedata} loadder={loadder} setYoutubeurl={setYoutubeurl} />
        </>
    )
}

export default Home
