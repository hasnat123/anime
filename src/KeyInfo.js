import axios from 'axios';
import delayAdapterEnhancer from 'axios-delay';
import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import WatchStatus from './WatchStatus';
import ReactPlayer from 'react-player/youtube';

const KeyInfo = ({id}) => {
    let url = `https://api.jikan.moe/v3/anime/${id}`;

    const [score, setScore] = useState();
    const [scoredBy, setScoredBy] = useState();
    const [title, setTitle] = useState("");
    const [pic, setPic] = useState();
    const [trailer, setTrailer] = useState();
    const [genres, setGenres] = useState([]);
    const [synopsisPreview, setSynopsisPreview] = useState("");
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

    let sliceIndex;

    const sliceSynopsis = function(synopsis)
    {
        let sliced = synopsis.slice(290);
        sliceIndex = sliced.indexOf(" ");
        return synopsis.slice(0, (290 + sliceIndex)) + "...";
    }

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
                console.log(res.data);
                setScore(res.data.score);
                setScoredBy(res.data.scored_by);
                setTitle(res.data.title);
                setPic(res.data.image_url);
                setTrailer(res.data.trailer_url)
                setGenres(res.data.genres);
                setSynopsisPreview(sliceSynopsis(res.data.synopsis.replace(" [Written by MAL Rewrite]", "")));
                setSynopsis(res.data.synopsis.replace(" [Written by MAL Rewrite]", ""));
                setType(res.data.type);
                setEpisodes(res.data.episodes);
                setStatus(res.data.status);
                setAired(res.data.aired.from.slice(0, 4));
                setBroadcast(res.data.broadcast);
                setDuration(res.data.duration);
                setSource(res.data.source);
                setRating(res.data.rating);
                setProducers(res.data.producers);
                setLicensors(res.data.licensors);
                setStudios(res.data.studios);


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
                        <Link to={`/${id}/ratings`}><div className="score"><strong>Score</strong><span><span id='score-big'><i className='fas fa-star'></i>{score}</span> / 10</span><span>Scored by: {scoredBy}</span></div></Link>
                        <WatchStatus id={id}/>
                    </div>
                </div>

                <div className="pic-trailer">
                    <img src={pic} alt="main-pic"></img>
                    {(trailer) ?
                    (
                        // <iframe title="trailer" width="420" height="315"
                        //     src={trailer}>
                        // </iframe>
                        <div className="video-container-main">
                            <div className="video">
                                <ReactPlayer className='player' title="trailer" width="100%" height="100%" controls="true" muted="true" playing="false" playIcon={<div className='play-icon'><i className='fas fa-play'></i></div>} light={pic} url={trailer}/>

                            </div>
                        </div>

                    ):(null)}
                </div>
                <div className="genres">
                    <div className="genre-container">
                        {genres.map((genre, i)=>{return <div key={i} className='genre'>{genre.name}</div>})}
                    </div>
                </div>
                <div className={toggleSynopsis ? "synopsis" : "synopsis-invisible"}>{synopsisPreview}<span className="read-more" onClick={handleToggleSynopsis}>Read More</span></div>
                <div className={toggleSynopsis ? "synopsis-invisible" : "synopsis"}>{synopsis}<span className="read-more" onClick={handleToggleSynopsis}>Read Less</span></div>
                <div className="synopsis-seperator"></div>
                <div className="info-container">
                    <ul className="info">
                        <li><Link to={`/${id}/episodes`}><span className='info-header'>Episodes</span></Link>{episodes}</li>
                        <li><span className='info-header'>Duration</span>{duration}</li>
                        <li><span className='info-header'>Status</span>{status}</li>
                        <li><span className='info-header'>Broadcast</span>{broadcast}</li>
                        <li><span className='info-header'>Source</span>{source}</li>
                        <li><span className='info-header'>Studio(s)</span>{studios.map((studio, i)=>{return <span key={i}>{studio.name}</span>}).reduce((prev, curr) => prev === null ? [curr] : [prev, ",", curr], null)}</li>
                        <li><span className='info-header'>Producers</span>{producers.map((producer, i)=>{return <span key={i}>{producer.name}</span>}).reduce((prev, curr) => prev === null ? [curr] : [prev, ", ", curr], null)}</li>
                        <li><span className='info-header'>Licensors</span>{licensors.map((licensor, i)=>{return <span key={i}>{licensor.name}</span>}).reduce((prev, curr) => prev === null ? [curr] : [prev, ", ", curr], null)}</li>
                    </ul>
                </div>

            </div>



        </section>
    )
}

export default KeyInfo;
