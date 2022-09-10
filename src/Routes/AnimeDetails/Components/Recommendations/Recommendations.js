import React, {useEffect, useState} from 'react';
import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import { Link } from 'react-router-dom';
import Anime from '../../../../components/AnimeGridItem/AnimeGridItem';

const Recommendations = ({id}) => {
    let url = `https://api.jikan.moe/v4/anime/${id}/recommendations`;

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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 5000});
                setRecommendations(res.data.data.splice(0, 10));
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
        <div className='container key-info-container recommendations-container'>

            <h2 className='section-title'>Recommended</h2>
            <div className="grid recommendations-grid">
                {recommendations.map((recommendation,i)=> <Anime key={i} id={recommendation.entry.mal_id} title={recommendation.entry.title} image_url={recommendation.entry.images.jpg.image_url}/>)} 
            </div>


        </div>
    )
}

export default Recommendations;
