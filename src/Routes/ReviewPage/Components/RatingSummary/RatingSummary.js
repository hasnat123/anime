import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import React, {useEffect, useState} from 'react'
import Rating from '../../../Rating/Rating'
import WatchStatus from '../../../../components/WatchStatus/WatchStatus';

const RatingSummary = ({id}) => {

    let url = `https://api.jikan.moe/v4/anime/${id}`;

    const [title, setTitle] = useState("");
    const [pic, setPic] = useState();
    const [score, setScore] = useState();
    const [scoredBy, setScoredBy] = useState();
    const [type, setType] = useState("");
    const [aired, setAired] = useState("");
    const [rating, setRating] = useState("");



    const api = axios.create({
        adapter: delayAdapterEnhancer(axios.defaults.adapter)
      });

      let cancelToken;

    useEffect(()=>{
        (async function()
        {
            try
            {
                if (typeof cancelToken != typeof undefined) cancelToken.cancel("Canceling previous req");
                cancelToken = axios.CancelToken.source();
                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 0});

                setTitle(res.data.data.title);
                setPic(res.data.data.images.jpg.image_url);
                setScore(res.data.data.score);
                setScoredBy(res.data.data.scored_by);
                setType(res.data.data.type);
                setAired(res.data.data.aired.from.slice(0, 4));
                setRating(res.data.data.rating);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

  return (
    <section>
        <div className="container key-info-container rating-summary">
                <div className="title-bar">
                    <div className="title"><h1>{title}<span className='title-info'>{`${type} | ${aired} | ${rating}`}</span></h1></div>
                    <div className="ratings-status">
                        <div className="score"><strong>Score</strong><span><span id='score-big'><i className='fas fa-star'></i>{score}</span> / 10</span><span>Scored by: {scoredBy ? scoredBy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</span></div>
                        <WatchStatus id={id}/>
                    </div>
                </div>

            <div className="poster-bar">
                <img src={pic} alt="main-pic"></img>
                <Rating/>
            </div>

        </div>
    </section>
  )
}

export default RatingSummary