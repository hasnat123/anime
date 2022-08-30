import React, {useState, useEffect} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';
import Anime from './Anime';

const AnimeSearchList = ({pageNum, search, buttonValue, sortValue, sortOrder, setPagination, setLoading}) => {
    const [animes, setAnimes] = useState([]);

    const url = `https://api.jikan.moe/v4/anime?q=${search}&genres=${buttonValue}&order_by=${sortValue}&sort=${sortOrder}&page=${pageNum}&sfw&type=tv%movie%ova%special%ona&min_score=1`;

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
                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 0});
                setAnimes(res.data.data);
                setPagination(res.data.pagination.has_next_page);

                animes ? setLoading(false) : setLoading(true);
                console.log("meow");

            }
            catch(err)
            {
                console.log(err);
            }
        })();
  
    }, [url])

  return (
    <>
      {animes.map((anime, i)=>{if(anime.aired.from) return <Anime key={i} id={anime.mal_id} title={anime.title} image_url={anime.images.jpg.image_url}/>})}

    </>
  )
}

export default AnimeSearchList