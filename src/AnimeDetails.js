import React, { useState } from 'react'
import { useParams } from 'react-router';
import Cast from './Cast';
import Episodes from './Episodes';
import KeyInfo from './KeyInfo';
import Pictures from './Pictures';
import Recommendations from './Recommendations';
import Videos from './Videos';
import Footer from './components/footer'
import Review from './Review';
import Navbar from './components/Navbar';

const AnimeDetails = () => {

    const { id } = useParams();
    const [episodeNum, setEpisodeNum] = useState(0);


    return (
        <div>
            <Navbar></Navbar>
            <KeyInfo id={id} setEpisodeNum={setEpisodeNum} />
            <Videos id={id}/>
            <Pictures id={id}/>
            <Cast id={id}/>
            <Review id={id} episodeNum={episodeNum} />
            <Recommendations id={id}/>
            <Footer/>
        </div>
    )
}

export default AnimeDetails;
