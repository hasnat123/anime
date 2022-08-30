import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player/youtube";
import Carousel from 'react-elastic-carousel';

const Videos = ({id}) => {

    let url = `https://api.jikan.moe/v4/anime/${id}/videos`;

    const [videos, setVideos] = useState([]);
    const [popupVideo, setPopupVideo] = useState("");
    const [popup, setPopup] = useState(false);



    const HandlePopUp = () =>
    {
        setPopup(!popup);
    }

    const breakPoints =
    [
        { width: 1, itemsToShow: 1},
        { width: 630, itemsToShow: 2},
        { width: 970, itemsToShow: 3 }
    ]


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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 1000});
                setVideos(res.data.data.promo);

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
            <>
                <section className='container key-info-container videos-container'>
                    <h2 className='section-title'>Videos</h2>

                    <Carousel breakPoints={breakPoints} pagination={false} >
                    {videos.map((video, i)=>
                        <div key={i} className='video' onClick={() => {HandlePopUp(); setPopupVideo(video.trailer.url)}}>
                            <img src={video.trailer.images.medium_image_url} alt="video" />
                        </div>)}
                    </Carousel>

                </section>

                <div className={popup ? 'video-popup-container' : 'video-popup-container-invisible'}>
                    <div className="menu-toggle">
                            <i className="fas fa-times" onClick={() => {HandlePopUp(); setPopupVideo("")}}></i>
                    </div>
                    <div className="video-popup">

                        <ReactPlayer className='player' width="100%" height="100%" controls={true} muted={true} url={popupVideo}/>
                    </div>
                </div>
            </>

        ) : (null)

    )
}

export default Videos;
