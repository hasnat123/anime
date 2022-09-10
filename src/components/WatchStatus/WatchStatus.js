import React, {useState, useEffect} from 'react'
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';

const WatchStatus = ({id}) => {
    let url=`https://api.jikan.moe/v4/anime/${id}/statistics`;

    const [watching, setWatching] = useState();
    const [watched, setWatched] = useState();
    const [dropped, setDropped] = useState();


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
                setWatching(res.data.data.watching);
                setWatched(res.data.data.completed);
                setDropped(res.data.data.dropped);
            }
            catch(err)
            {
                console.log(err);
            }

        })();
    }, [url])


    return (
        <div className="watch-status">
            <div className="watch-status-icon"><i className="far fa-flag-checkered"></i></div>
            <div className="watched"><strong>Finished</strong><span>{watched ? watched.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</span></div>
            <div className="watch-status-icon"><i className="fad fa-popcorn"></i></div>
            <div className="watching"><strong>Watching</strong><span>{watching ? watching.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</span></div>
            <div className="watch-status-icon"><i className="far fa-window-close"></i></div>
            <div className="dropped"><strong>Dropped</strong><span>{dropped ? dropped.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</span></div>
        </div>

    )
}

export default WatchStatus;;