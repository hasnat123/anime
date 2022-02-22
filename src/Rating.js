import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';

const Rating = () => {
    const { id } = useParams();

    let url=`https://api.jikan.moe/v3/anime/${id}/stats`;

    const [ratings, setRatings] = useState([]);


    useEffect(() =>
    {
        (async function()
        {

            try{
                const res = await axios.get(url);

                console.log(res.data);

                //storing ratings into array
                setRatings(Object.values(res.data.scores)); //Converting object into array so that 'map' function can be applied

                
            }
            catch(err)
            {
                console.log(err);
            }

        })();
    }, [url])

    // useEffect(() =>
    // {
    //     (async function()
    //     {
    //         let mult;
    //         var sum;
    //         try{
    //             if(ratings.length > 0)
    //             {
    //                 mult = 0;
    //                 sum = 0;
    //                 ratings.forEach((rating, i)=>{mult += (rating.votes*(i+1)); sum += rating.votes;});
    //                 setScore(mult/sum);
    //             }

    //         }
    //         catch(err)
    //         {
    //             console.log(err);
    //         }

    //     })();
    // }, [ratings])



    return (
        <div className="watch-status">
            <div className="ratings-list">
                {ratings.map((rating, i)=>{return <div key={i} className="rating">
                    <div className="rating-number">{i+1}</div>
                    <div className="rating-percentage">{rating.percentage} %</div>
                    <div className="rating-votes">{rating.votes}</div>

                </div>})}
            </div>
        </div>

    )
}

export default Rating;
