import React, {useEffect, useState} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';


import {useSwipeable} from "react-swipeable";


const Pictures = ({id}) => {

    let url = `https://api.jikan.moe/v3/anime/${id}/pictures`;

    const [pics, setPics] = useState([]);
    const [style, setStyle] = useState(0);
    const [clicks, setClicks] = useState(0);


    

    const slideRight = function()
    {
        
        if (clicks < pics.length - 8)
        {
            setStyle(style + 34.9);
            setClicks(clicks + 1);
            console.log(clicks);
        }
    }

    const slideLeft = function()
    {
        
        if (clicks > 0)
        {
            setStyle(style - 34.9);
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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 6000});
                setPics(res.data.pictures);
                console.log(res.data);
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


            <section className='container key-info-container videos-container'>
                <h2>Pictures</h2>


                <div className="arrow-container">
                    <i class="fas fa-arrow-alt-square-left" onClick={slideLeft}></i>
                        <div {...handlers} className="video-slider-container">
                            <div className="video-slider" style={{transform: 'translateX(-' + style + '%)'}}>
                                {pics.map((pic, i)=>
                                    <div key={i} className='video picture'>
                                        <img src={pic.large} alt="pic"></img>
                                    </div>)}
                            </div>
                        </div>
                    <i class="fas fa-arrow-alt-square-right" onClick={slideRight}></i>
                </div>

            </section>
        ) : (null)
    )
}

export default Pictures;
