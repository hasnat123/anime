import React, {useState} from 'react';
import { useEffect } from 'react';
import { Slice } from './helpers/helpers';

const ReviewContent = ({review, id}) => {

    const [toggleReview, setToggleReview] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);

    const handleToggleReview = function()
    {
        setToggleReview(!toggleReview);
    }

    const HandleResize = () => setWidth(window.innerWidth);

    useEffect(() =>
    {
        (async function()
        {
            try
            {
                window.addEventListener('resize', HandleResize);

                return () => window.removeEventListener('resize', HandleResize);

            }
            catch(err)
            {
                console.log(err);
            }
        })();
  
    }, [width])

    return (
      <div className='review-content'>
          {review.review.length > (width / 2.75) + review.review.slice((width / 2.75)).indexOf(" ") ? (toggleReview ? <>{Slice(review.review, (width / 2.75))} <span className="read-more" onClick={handleToggleReview}>Read More</span></> : <>{review.review} <span className="read-more" onClick={handleToggleReview}>Read Less</span></>) : <>{review.review}</>}     
      </div>
    )
}

export default ReviewContent