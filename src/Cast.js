import React, {useEffect, useState} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';

const Cast = ({id}) => {

    let url = `https://api.jikan.moe/v3/anime/${id}/characters_staff`;

    const [cast, setCast] = useState([]);


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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 8000});
                setCast(res.data.characters);
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
        <section className="container cast-container">
            <div className="container key-info-container"><h2>Main Cast</h2></div>
            <div className='cast key-info-container'>
                {cast.map((character, i)=>
                <div key={i} className='character-row'>
                    <div className="character-box">
                        <div className='character-name'><strong>{character.name}</strong></div>
                        <div className='character-pic'><img src={character.image_url} alt="character-pic"></img></div>
                    </div>

                    {character.voice_actors.length > 0 ?
                        (character.voice_actors.map((actor, i)=>actor.language.includes("Japanese") ?

                                <div className="actor-box">
                                    <div key={i} className='actor-name'>{actor.name ? actor.name : "Unknown"}</div>
                                    <div className='actor-pic'><img src={actor.image_url} alt="actor-pic"></img></div>
                                </div> : (null)))
                    :
                    
                        (<div className="actor-box">
                            <div className='actor-name'>Unknown</div>
                            <div className='actor-pic'><i class="fas fa-question"></i></div>
                        </div>)}

                        
                </div>)}
                
            </div>
        </section>

    )
}

export default Cast;
