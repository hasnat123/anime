import React from 'react'
import { useParams } from 'react-router';
import Cast from './Cast';
import Episodes from './Episodes';
import KeyInfo from './KeyInfo';
import Pictures from './Pictures';
import Recommendations from './Recommendations';
import Videos from './Videos';


const AnimeDetails = () => {

    const { id } = useParams();


    return (
        <div>
            <KeyInfo id={id}/>
            <Videos id={id}/>
            <Pictures id={id}/>
            <Cast id={id}/>
            <Recommendations id={id}/>
        </div>
    )
}

export default AnimeDetails;
