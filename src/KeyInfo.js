import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import WatchStatus from './WatchStatus';
import ReactPlayer from 'react-player/youtube';
import { Slice } from './helpers/helpers';

const KeyInfo = ({id, setEpisodeNum}) => {
    let url = `https://api.jikan.moe/v4/anime/${id}`;

    const [score, setScore] = useState();
    const [scoredBy, setScoredBy] = useState();
    const [title, setTitle] = useState("");
    const [pic, setPic] = useState();
    const [trailer, setTrailer] = useState();
    const [trailerPic, setTrailerPic] = useState();
    const [genres, setGenres] = useState([]);
    const [synopsis, setSynopsis] = useState("");
    const [toggleSynopsis, setToggleSynopsis] = useState(true);
    const [type, setType] = useState("");
    const [episodes, setEpisodes] = useState();
    const [status, setStatus] = useState("");
    const [aired, setAired] = useState("");
    const [broadcast, setBroadcast] = useState("");
    const [duration, setDuration] = useState("");
    const [source, setSource] = useState("");
    const [rating, setRating] = useState("");
    const [producers, setProducers] = useState([]);
    const [licensors, setLicensors] = useState([]);
    const [studios, setStudios] = useState([]);

    const handleToggleSynopsis = function()
    {
        setToggleSynopsis(!toggleSynopsis);
    }
    

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
                setScore(res.data.data.score);
                setScoredBy(res.data.data.scored_by);
                setTitle(res.data.data.title);
                setPic(res.data.data.images.jpg.image_url);
                setTrailer(res.data.data.trailer.url)
                setTrailerPic(res.data.data.trailer.images.large_image_url)
                setGenres(res.data.data.genres);
                setSynopsis(res.data.data.synopsis.replace(" [Written by MAL Rewrite]", ""));
                setType(res.data.data.type);
                setEpisodes(res.data.data.episodes);
                setEpisodeNum(res.data.data.episodes);
                setStatus(res.data.data.status);
                setAired(res.data.data.aired.from.slice(0, 4));
                setBroadcast(res.data.data.broadcast.string);
                setDuration(res.data.data.duration);
                setSource(res.data.data.source);
                setRating(res.data.data.rating);
                setProducers(res.data.data.producers);
                setLicensors(res.data.data.licensors);
                setStudios(res.data.data.studios);
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    }, [url]);


    return (
        <section className='key-info-background'>
            <div className="container key-info-container">
                <div className="title-bar">
                    <div className="title"><h1>{title}<span className='title-info'>{`${type} | ${aired} | ${rating}`}</span></h1></div>
                    <div className="ratings-status">
                        <div className="score"><strong>Score</strong><span><span id='score-big'><i className='fas fa-star'></i>{score}</span> / 10</span><span>Scored by: {scoredBy ? scoredBy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</span></div>
                        <WatchStatus id={id}/>
                    </div>
                </div>

                <div className="poster-bar">
                    <img src={pic} alt="main-pic"></img>
                    {(trailer) ?
                    (
                        // <iframe title="trailer" width="420" height="315"
                        //     src={trailer}>
                        // </iframe>
                        <div className="video-container-main">
                            <div className="video">
                                <ReactPlayer className='player' title="trailer" width="100%" height="100%" controls={true} muted={true} playing={false} playIcon={<div className='play-icon'><i className='fas fa-play'></i></div>} light={trailerPic} url={trailer}/>

                            </div>
                        </div>

                    ):(null)}
                </div>
                <div className="genres">
                    <div className="genre-container">
                        {genres.map((genre, i)=>{return <div key={i} className='genre'>{genre.name}</div>})}
                    </div>
                </div>

                <div className='synopsis'>{toggleSynopsis ? <>{Slice(synopsis.replace(" [Written by MAL Rewrite]", ""), 290)} <span className="read-more" onClick={()=>{handleToggleSynopsis()}}>Read More</span></> : <>{synopsis.replace(" [Written by MAL Rewrite]", "")} <span className="read-more" onClick={()=>{handleToggleSynopsis()}}>Read Less</span></>}</div>
                
                <div className="synopsis-seperator"></div>
                <div className="info-container">
                    <ul className="info">
                        <li><Link to={`/${id}/episodes`}><span className='info-header'>Episodes</span></Link>{episodes}</li>
                        <li><span className='info-header'>Duration</span>{duration ? duration : "Unknown"}</li>
                        <li><span className='info-header'>Status</span>{status ? status : "Unknown"}</li>
                        <li><span className='info-header'>Broadcast</span>{broadcast ? broadcast : "Unknown"}</li>
                        <li><span className='info-header'>Source</span>{source ? source : "Unknown"}</li>
                        <li><span className='info-header'>Studio(s)</span>{studios.length > 0 ? studios.map((studio, i)=>{return <span key={i}>{studio.name}</span>}).reduce((prev, curr) => prev === null ? [curr] : [prev, ",", curr], null) : "Unknown"}</li>
                        <li><span className='info-header'>Producers</span>{producers.length > 0 ? producers.map((producer, i)=>{return <span key={i}>{producer.name}</span>}).reduce((prev, curr) => prev === null ? [curr] : [prev, ", ", curr], null) : "Unknown"}</li>
                        <li><span className='info-header'>Licensors</span>{licensors.length > 0 ? licensors.map((licensor, i)=>{return <span key={i}>{licensor.name}</span>}).reduce((prev, curr) => prev === null ? [curr] : [prev, ", ", curr], null) : "Unknown"}</li>
                    </ul>
                </div>

            </div>



        </section>
    )
}

export default KeyInfo;
