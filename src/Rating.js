import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import delayAdapterEnhancer from 'axios-delay';

const Rating = () => {
    const { id } = useParams();

    let url=`https://api.jikan.moe/v4/anime/${id}/statistics`;

    const [ratings, setRatings] = useState([]);

    const api = axios.create({
        adapter: delayAdapterEnhancer(axios.defaults.adapter)
      });

      let cancelToken;

    useEffect(() =>
    {
        (async function()
        {

            try
            {
                if (typeof cancelToken != typeof undefined) cancelToken.cancel("Canceling previous req");
                cancelToken = axios.CancelToken.source();
                const res = await axios.get(url, {cancelToken: cancelToken.token, delay: 0});


                //storing ratings into array
                setRatings(Object.values(res.data.data.scores)); //Converting object into array so that 'map' function can be applied
                console.log(res.data);

                
            }
            catch(err)
            {
                console.log(err);
            }

        })();
    }, [url])



    return (
            <div className="ratings-chart">
                {ratings.map((rating, i)=>{return <div key={i} className="rating">
                    <div className="ratings-chart-data">
                        <div className="bar-chart">
                            <div className="rating-number">{i + 1}</div>
                            <div className="bar-chart-box" style={{width: `${rating.percentage}%`}}></div>
                            <div className="rating-percentage">{rating.percentage} %</div>
                        </div>

                        <div className="rating-vote">{rating.votes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>

                </div>})}
                <div className="ratings-chart-data headings">
                    <div className="bar-chart rating-header">
                        <div><h4>Rating</h4></div>
                    </div>
                    <div><h4>Votes</h4></div>

                </div>
                <div className="ratings-table">

                    {ratings.map((rating, i)=>{return <div key={i} className="ratings-table-column">
                        <div>{i + 1}</div>
                        <div>{rating.percentage} %</div>
                        <div>{rating.votes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>})}
                    <div className="rating-table-headings">
                        <div><h4>Rating</h4></div>
                        <div><h4>Percentage</h4></div>
                        <div><h4>Votes</h4></div>
                    </div>

                </div>
                
            </div>


    )
}

export default Rating;
