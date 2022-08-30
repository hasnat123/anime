import React, {useEffect, useState} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';

import Carousel from 'react-elastic-carousel';


const Pictures = ({id}) => {

    let url = `https://api.jikan.moe/v4/anime/${id}/pictures`;

    const [pics, setPics] = useState([]);
    const [popupPic, setPopupPic] = useState("");
    const [popup, setPopup] = useState(false);



    const HandlePopUp = () =>
    {
        setPopup(!popup);
    }

    const breakPoints = 
    [
        { width: 1, itemsToShow: 2},
        { width: 360, itemsToShow: 3},
        { width: 550, itemsToShow: 5}
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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 2000});
                setPics(res.data.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
        (pics) ?
        (
            <>
                <section className='container key-info-container videos-container'>
                    <h2 className='section-title'>Pictures</h2>

                    <Carousel breakPoints={breakPoints} pagination={false} >
                        {pics.map((pic, i)=>
                            <div key={i} className='video picture'>
                                <img src={pic.jpg.large_image_url} alt="pic" onClick={() => {HandlePopUp(); setPopupPic(pic.jpg.large_image_url)}}></img>
                            </div>)}
                    </Carousel>         

                </section>

                <div className={popup ? 'video-popup-container' : 'video-popup-container-invisible'}>
                    <div className="menu-toggle">
                            <i className="fas fa-times" onClick={() => {HandlePopUp(); setPopupPic("")}}></i>
                    </div>
                    <div className="pic-popup">
                        <img src={popupPic} alt="pic"></img>
                    </div>
                </div>
            </>

        ) : (null)
    )
}

export default Pictures;
