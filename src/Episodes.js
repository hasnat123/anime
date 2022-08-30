import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';

const Episodes = () => {
    const { id } = useParams();
    let url=`https://api.jikan.moe/v3/anime/${id}/episodes`;

    const [episodes, setEpisodes] = useState([]);


    const api = axios.create({
        adapter: delayAdapterEnhancer(axios.defaults.adapter)
      });

      let cancelToken;

    useEffect(() =>
    {
        (async function()
        {

            try{
                if (typeof cancelToken != typeof undefined) cancelToken.cancel("Canceling previous req");
                cancelToken = axios.CancelToken.source();

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 2000});
                setEpisodes(res.data.episodes);
            }
            catch(err)
            {
                console.log(err);
            }

        })();
    }, [url])

    return (
        <div className="episode-list">
            {episodes.map((episode)=>{return <div key={episode.episode_id} className="episode">{episode.title}</div>})}
        </div>
    )
}

export default Episodes;
