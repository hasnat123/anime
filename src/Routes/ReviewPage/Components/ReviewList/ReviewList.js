import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';
import ReviewContent from '../../../../components/ReviewContent/ReviewContent';
import { Link } from 'react-router-dom';

const ReviewList = ({id, pageNum}) => {


    let url = `https://api.jikan.moe/v4/anime/${id}/reviews?q=&page=${pageNum}`;
    let url2 = `https://api.jikan.moe/v4/anime/${id}`;


    const [reviews, setReviews] = useState([]);
    const [episodeNum, setEpisodeNum] = useState(0);

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
                const res2 = await api.get(url2, {cancelToken: cancelToken.token, delay: 0});
                setReviews(res.data.data);
                setEpisodeNum(res2.data.data.episodes);
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
            <>
                {reviews.map((review, i)=>
                <div key={i} className='review'>
                    <div className="review-row">
                        <div className="user-profile">
                            <img src={review.user.images.jpg.image_url} alt="Reviewer pic" />
                            <h3 className='username'>{review.user.username}</h3>
                            <p>{[new Date(review.date).toString().slice(4, 10), ", ", review.date.toString().slice(0, 4)].join("")}</p>
                        </div>
                        <div className="score-and-seen">
                            <div className="review-score"><span><span id='score-big'><i className='fas fa-star'></i>{review.scores.overall}</span> / 10</span></div>
                            <div className="review-seen"><span><span id='score-big'><i className='fas fa-eye'></i>{review.episodes_watched}</span> / {episodeNum}</span></div>
                        </div>
                    </div>

                    <ReviewContent review={review}/>

                    <div className="review-helpful"><span><i className='fas fa-thumbs-up'></i> Helpful <div className='circle'></div>{review.votes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>

                </div>)}
            </>        
    )
}

export default ReviewList