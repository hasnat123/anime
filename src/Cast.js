import React, {useEffect, useState} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';

const Cast = ({id}) => {

    let url = `https://api.jikan.moe/v4/anime/${id}/characters`;

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

                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 3000});
                setCast(res.data.data.filter(function(a){ return a.role === "Main" }).sort(function(a, b){return a.character.mal_id-b.character.mal_id}).concat(res.data.data.filter(function(a){ return a.role === "Supporting" }).sort(function(a, b){return a.character.mal_id-b.character.mal_id})).slice(0, 10));
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);

    return (
        <section className="container key-info-container cast-container">
            <h2 className='section-title'>Main Cast</h2>
            <div className='cast key-info-container'>
                {cast.map((character, i)=>
                <div key={i} className='character-row'>
                    <div className="character-box">
                        <div className='character-name'><strong>{character.character.name}</strong></div>
                        <div className='character-pic'>{character.character.images.jpg.image_url === "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c" ? <i className="fas fa-question"></i> : <img src={character.character.images.jpg.image_url} alt="character-pic"></img> }</div>
                    </div>

                    {character.voice_actors.length > 0 ?
                        ([...character.voice_actors].reverse().map((actor, i)=>actor.language.includes("Japanese") ?

                            <div key={i} className="actor-box">
                                <div key={i} className='actor-name'>{actor.person.name ? actor.person.name : "Unknown"}</div>
                                <div className='actor-pic'><img src={actor.person.images.jpg.image_url} alt="actor-pic"></img></div>
                            </div> : (null)))
                    :
                    
                        (<div className="actor-box">
                            <div className='actor-name'>Unknown</div>
                            <div className='actor-pic'><i className="fas fa-question"></i></div>
                        </div>)}

                        
                </div>)}
                
            </div>
        </section>

    )
}

export default Cast;
