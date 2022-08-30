import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import RatingSummary from './RatingSummary';
import ReviewList from './ReviewList'
import Footer from './components/footer';
import Navbar from './components/Navbar';

const ReviewPage = () => {

  const {id} = useParams();

  const [pageNum, setPageNum] = useState(1);
  const [reviewList, setReviewList] = useState([<ReviewList key={1} id={id} pageNum={1}/>])

  const HandleLoadMore = (e) =>
  {
    e.preventDefault();
    setReviewList([...reviewList, <ReviewList key={reviewList.length + 1} id={id} pageNum={reviewList.length + 1}/>])

  }


  return (
    <div className='review-page'>
        <Navbar/>
        <RatingSummary id={id}/>
        <div className="container key-info-container reviews-container">
            <h2 className='section-title'>User Reviews</h2>
            <div className='reviews-box'>
              {reviewList}
              <div className="reviews-load-more" onClick={HandleLoadMore}><h2>Load More</h2></div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ReviewPage