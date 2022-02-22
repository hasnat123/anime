import React, {useState, useEffect} from 'react'
import axios from "axios";

const WatchStatus = ({id}) => {
    let url=`https://api.jikan.moe/v3/anime/${id}/stats`;

    const [watching, setWatching] = useState();
    const [watched, setWatched] = useState();
    const [dropped, setDropped] = useState();


    useEffect(() =>
    {
        (async function()
        {
            try{
                const res = await axios.get(url);
                setWatching(res.data.watching);
                setWatched(res.data.completed);
                setDropped(res.data.dropped);
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }

        })();
    }, [url])


    return (
        <div className="watch-status">
            <div className="watch-status-icon"><i class="far fa-flag-checkered"></i></div>
            <div className="watched"><strong>Finished</strong><span>{watched}</span></div>
            <div className="watch-status-icon"><i className="fad fa-popcorn"></i></div>
            <div className="watching"><strong>Watching</strong><span>{watching}</span></div>
            <div className="watch-status-icon"><i class="far fa-window-close"></i></div>
            <div className="dropped"><strong>Dropped</strong><span>{dropped}</span></div>
        </div>

    )
}

export default WatchStatus;;