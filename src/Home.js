import React, {useState, useEffect} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';
import Anime from './Anime';


const Home = () => {



    const [sortValue, setSortValue] = useState("score");
    const [buttonValue, setButtonValue] = useState("0");
    const [animes, setAnimes] = useState([]);
    const [search, setSearch] = useState("");
    const [toggle, setToggle] = useState(false);
    const [listToggle, setListToggle] = useState(false);
    const [sortName, setSortName] = useState("Sort");
    const [sortId, setSortId] = useState("0");



    const url = `https://api.jikan.moe/v3/search/anime?q=&genre=${buttonValue}&order_by=${sortValue}&sort=desc&page=1`;

    const HandleSearch = (event) =>
    {
        setSearch(event.target.value)
    }

    const HandleSort = (event) =>
    {
        if (event.target.getAttribute("data-value")) setSortValue(event.target.getAttribute("data-value"));
        if (event.target.getAttribute("data-name")) setSortName(event.target.getAttribute("data-name"));
        if (event.target.getAttribute("data-name")) setSortId(event.target.getAttribute("data-id"));
        setListToggle(!listToggle);
    }

    const HandleSubmit = (event) =>
    {
        setButtonValue(event.target.value);
        console.log(event.target.value);
        setToggle(!toggle);
    }

    const HandleToggle = (event) =>
    {
        setToggle(!toggle);
    }

    const filterdAnime = animes.filter(anime=>{
        return anime.title.toLowerCase().includes(search.toLowerCase());
    })

    const api = axios.create({
        adapter: delayAdapterEnhancer(axios.defaults.adapter)
      });

    let cancelToken;

    useEffect(() =>
    {
        (async function()
        {
            try
            {
                if (typeof cancelToken != typeof undefined) cancelToken.cancel("Canceling previous req");
                cancelToken = axios.CancelToken.source();
                const res = await api.get(url, {cancelToken: cancelToken.token, delay: 0});
                setAnimes(res.data.results);
                console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();

    }, [url])

    return (
        <div>
            <div className='hero'>
                <header>
                    <div className={toggle ? "container open" : "container"}>

                        <nav>

                            <div className="menu-toggle">

                                <i onClick={HandleToggle} className="fas fa-bars"></i>
                                <i onClick={HandleToggle} className="fas fa-times"></i>
                            </div>

                            <ul className='nav-list'>
                                <a href="#grid-container"><li className='nav-item' value="0" onClick={HandleSubmit}>All</li></a>
                                <a href="#grid-container"><li className='nav-item' value="1" onClick={HandleSubmit}>Action</li></a>
                                <a href="#grid-container"><li className='nav-item' value="2" onClick={HandleSubmit}>Adventure</li></a>
                                <a href="#grid-container"><li className='nav-item' value="8" onClick={HandleSubmit}>Drama</li></a>
                                <a href="#grid-container"><li className='nav-item' value="24" onClick={HandleSubmit}>Sci-fi</li></a>
                                <a href="#grid-container"><li className='nav-item' value="4" onClick={HandleSubmit}>Comedy</li></a>
                                <a href="#grid-container"><li className='nav-item' value="22" onClick={HandleSubmit}>Romance</li></a>
                                <a href="#grid-container"><li className='nav-item' value="10" onClick={HandleSubmit}>Fantasy</li></a>
                                <a href="#grid-container"><li className='nav-item' value="7" onClick={HandleSubmit}>Mystery</li></a>
                                <a href="#grid-container"><li className='nav-item' value="27" onClick={HandleSubmit}>Shounen</li></a>
                                <a href="#grid-container"><li className='nav-item' value="42" onClick={HandleSubmit}>Seinen</li></a>
                                <a href="#grid-container"><li className='nav-item' value="18" onClick={HandleSubmit}>Mecha</li></a>
                            </ul>
                        </nav>

                    </div>
                </header>

                <div className="container logo-container">
                    <h1 className="headline">Animex</h1>
                </div>

                <div className="container">
                        <div className="search-box-container">
                            <div className="search-box">
                                <input className="search-text" type="text" tabIndex="1" placeholder='Search for an anime...' value={search} onChange={HandleSearch}/>
                                <a href="#grid-container" className="search-btn">
                                    <i className="fas fa-search"></i>
                                </a>
                            </div>
                            <div className={listToggle ? "sort-box active" : "sort-box"}>
                                <div className= "main" onClick={HandleSort}>{sortName}</div>
                                <ul id={listToggle ? "sort-visible" : "sort"}>
                                    <a href="#grid-container"><li className={sortId !== "0" ? 'option-visible' : 'option'} data-id="0" data-value="score" data-name="Ranking" onClick={HandleSort}>Ranking</li></a>
                                    <a href="#grid-container"><li className={sortId !== "1" ? 'option-visible' : 'option'} data-id="1" data-value="members" data-name="Popularity" onClick={HandleSort}>Popularity</li></a>
                                    <a href="#grid-container"><li className={sortId !== "2" ? 'option-visible' : 'option'} data-id="2" data-value="start_date" data-name="Newest" onClick={HandleSort}>Newest</li></a>
                                    <a href="#grid-container"><li className={sortId !== "3" ? 'option-visible' : 'option'} data-id="3" data-value="end_date" data-name="Oldest" onClick={HandleSort}>Oldest</li></a>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>

            <div id="grid-container">
                <div className='container'>
                    <div className='grid'>
                        {filterdAnime.map((anime, i)=>{return <Anime key={i} id={anime.mal_id} title={anime.title} image_url={anime.image_url}/>})}
                    </div>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="back-to-top">
                        <a href="#"><i className="fas fa-chevron-up"></i></a>
                    </div>
                    <div className="footer-content">
                        <div className="footer-content-divider animate-bottom">
                            <div className="meow">
                                <h4>Follow along</h4>
                                <ul className="social-icons">
                                    <li>
                                        <a href="http://google.com"><i className="fab fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-facebook-square"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-pinterest"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-tripadvisor"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="newsletter-container">
                                <h4>Newsletter</h4>
                                <form className="newsletter-form">
                                    <input type="text" className="newsletter-input" placeholder="Your email address..."/>
                                    <button className="newsletter-btn" type="submit">
                                        <i className="fas fa-envelope"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </div>

    )
}

export default Home;
