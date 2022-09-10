import React, { useState } from 'react'
import { useParams } from 'react-router';
import Cast from './Components/Cast/Cast';
import Episodes from '../Episodes/Episodes';
import KeyInfo from './Components/KeyInfo/KeyInfo';
import Pictures from './Components/Pictures/Pictures';
import Recommendations from './Components/Recommendations/Recommendations';
import Videos from './Components/Videos/Videos';
import Footer from '../../components/Footer/Footer'
import Review from './Components/Review/Review';
import Navbar from '../../components/Navbar/Navbar';

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
