import React, {useEffect, useState} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';
import ReviewContent from './ReviewContent';
import { Link } from 'react-router-dom';

const Review = ({id, episodeNum}) => {

    let url = `https://api.jikan.moe/v4/anime/${id}/reviews?q=&order_by=start_date&sort=desc&page=1`;

    const [reviews, setReviews] = useState([]);

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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 4000});
                setReviews(res.data.data.slice(0, 3));
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
        <section className="container key-info-container reviews-container">
            <Link to={`/${id}/reviews`}><h2 className='section-title'>User Reviews</h2></Link>
            <div className='reviews-box'>
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
                            <div className="review-seen"><span><span id='score-big'><i className='fas fa-eye'></i>7,777</span> / 7,777</span></div>
                        </div>
                    </div>

                    <ReviewContent review={review}/>

                    <div className="review-helpful"><span><i className='fas fa-thumbs-up'></i> Helpful <div className='circle'></div>{review.votes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>

                </div>)}
                
            </div>
        </section>

    )
}

export default Review;