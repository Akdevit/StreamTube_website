import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import PlaylistHero from "../components/PlaylistHero";
import Playlistdata from '../components/Playlistdata';
import { BASE_URL } from '../baseurl';

const Playlist = () => {
    const [playlistdata, setPlaylistdata] = useState([]);
    const [playlistdetails, setPlaylistdetails] = useState({});
    const [lodder, setLodder] = useState(false);
    const [playlisturl, setPlaylisturl] = useState('https://www.youtube.com/playlist?list=PL8p2I9GklV44sj_Ikp8jQSvwD-m9htnHT');
    const [errorplaylisturl, setErrorplaylisturl] = useState('')
    const validateYouTubeUrl = (url) => {
        const regex = /^https:\/\/www\.youtube\.com\/playlist\?list=/;
        return regex.test(url);
    };

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!validateYouTubeUrl(playlisturl)) {
                setErrorplaylisturl("Invalid URL");
                return;
            } else {
                setErrorplaylisturl('')
            }

            setLodder(true);
            try {
                const response = await fetch(`${BASE_URL}playlist?url=${playlisturl}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaylistdata(data?.items || []);
                setPlaylistdetails(data || {});
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLodder(false);
            }
        };

        fetchPlaylist();
    }, [playlisturl]);

    return (
        <>
            <Nav />
            <PlaylistHero playlistdetails={playlistdetails} setPlaylisturl={setPlaylisturl} errorplaylisturl={errorplaylisturl}/>
            <Playlistdata playlistdata={playlistdata} lodder={lodder} playlistdetails={playlistdetails} />
        </>
    );
};

export default Playlist;
