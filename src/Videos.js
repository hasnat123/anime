import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player/youtube";

import {useSwipeable} from "react-swipeable";

const Videos = ({id}) => {

    let url = `https://api.jikan.moe/v3/anime/${id}/videos`;

    const [videos, setVideos] = useState([]);
    const [style, setStyle] = useState(0);
    const [clicks, setClicks] = useState(0);


    const slideRight = function()
    {
        
        if (clicks < videos.length - 3)
        {
            setStyle(style + 31.63);
            setClicks(clicks + 1);
            console.log(clicks);
        }
    }

    const slideLeft = function()
    {
        
        if (clicks > 0)
        {
            setStyle(style - 31.63);
            setClicks(clicks - 1);
            console.log(clicks);
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => slideRight(),
        onSwipedRight: () => slideLeft()
    });

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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 4000});
                setVideos(res.data.promo);
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })()
    }, [url]);

    return (
        (videos) ?
        (
            <section className='container key-info-container videos-container'>
                <h2>Videos</h2>


                <div className="arrow-container">
                    <i class="fas fa-arrow-alt-square-left" onClick={slideLeft}></i>
                        <div {...handlers} className="video-slider-container">
                            <div className="video-slider" style={{transform: 'translateX(-' + style + '%)'}}>
                                
                                {videos.map((video, i)=>
                                    <div key={i} className='video'>
                                        <ReactPlayer className='player' title={`video ${i}`} width="100%" height="100%" controls="true" muted="true" url={`${video.video_url}`}/>
                                    </div>)}
                            </div>
                        </div>
                    <i class="fas fa-arrow-alt-square-right" onClick={slideRight}></i>
                </div>
                

            </section>
        ) : (null)

    )
}

export default Videos;
