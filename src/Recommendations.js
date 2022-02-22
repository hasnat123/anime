import React, {useEffect, useState} from 'react';
import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import { Link } from 'react-router-dom';

const Recommendations = ({id}) => {
    let url = `https://api.jikan.moe/v3/anime/${id}/recommendations`;

    const [recommendations, setRecommendations] = useState([]);


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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 10000});
                setRecommendations(res.data.recommendations.splice(0, 10));
                console.log(res.data.recommendations);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
        <div className='recommendations'>
            {recommendations.map((recommendation,i)=>
            <Link to={`/${recommendation.mal_id}`}>
                <div key={i} className="recommendation">
                    <img src={recommendation.image_url} alt="recommendation-pic"></img>
                    <div className="recommendation-title">{recommendation.title}</div>
                </div>
            </Link>

            )}
        </div>
    )
}

export default Recommendations;
