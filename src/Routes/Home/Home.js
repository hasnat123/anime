import React, {useState, useEffect} from 'react';
import axios from "axios";
import delayAdapterEnhancer from 'axios-delay';
import Anime from '../../components/AnimeGridItem/AnimeGridItem';
import AnimeSearchList from '../AnimeSearchPage/Components/AnimeSearchList/AnimeSearchList';
import Footer from '../../components/Footer/Footer'

const Home = () => {



    const [sortValue, setSortValue] = useState("score");
    const [buttonValue, setButtonValue] = useState("0");
    const [animes, setAnimes] = useState([]);
    const [search, setSearch] = useState("");
    const [toggle, setToggle] = useState(false);
    const [listToggle, setListToggle] = useState(false);
    const [sortName, setSortName] = useState("Sort");
    const [sortId, setSortId] = useState("0");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchBar, setSearchBar] = useState(false);
    const [pagination, setPagination] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingNum, setLoadingNum] = useState([1, 2, 3, 4, 5, 6]);

    const [animeSearchList, setAnimeSearchList] = useState([<AnimeSearchList key={1} pageNum={1} search={search} buttonValue={buttonValue} sortValue={sortValue} sortOrder={sortOrder} setPagination={setPagination} setLoading={setLoading}/>])


    // const url = `https://api.jikan.moe/v4/anime?q=${search}&genres=${buttonValue}&order_by=${sortValue}&sort=${sortOrder}&page=1&sfw&type=tv%movie%ova%special%ona&min_score=1`;

    const HandleSearch = (event) =>
    {
        setSearch(event.target.value);
        
        setSortId("0");
        setSortName("Sort");
        setButtonValue("0");
        if (event.target.value === "")
        {
            setSortOrder("desc");
            setSortValue("score");
            setSearchBar(false);
        }
        else
        {
            setSortOrder("asc");
            setSortValue("rank");
            setSearchBar(true);
        }

        setAnimeSearchList([<AnimeSearchList key={1} pageNum={1} search={search} buttonValue={buttonValue} sortValue={sortValue} sortOrder={sortOrder} setPagination={setPagination} setLoading={setLoading}/>]);

    }

    const HandleSort = (event) =>
    {
        if (event.target.getAttribute("data-value")) setSortValue(event.target.getAttribute("data-value"));
        if (event.target.getAttribute("data-name")) setSortName(event.target.getAttribute("data-name"));
        if (event.target.getAttribute("data-name")) setSortId(event.target.getAttribute("data-id"));
        if (event.target.getAttribute("data-order")) setSortOrder(event.target.getAttribute("data-order"));
        setListToggle(!listToggle);

        setAnimeSearchList([<AnimeSearchList key={1} pageNum={1} search={search} buttonValue={buttonValue} sortValue={sortValue} sortOrder={sortOrder} setPagination={setPagination} setLoading={setLoading}/>]);
    }

    const HandleSubmit = (event) =>
    {
        setButtonValue(event.target.value);
        console.log(event.target.value);
        setToggle(!toggle);

        setAnimeSearchList([<AnimeSearchList key={1} pageNum={1} search={search} buttonValue={buttonValue} sortValue={sortValue} sortOrder={sortOrder} setPagination={setPagination} setLoading={setLoading}/>]);

    }

    const HandleToggle = () =>
    {
        setToggle(!toggle);
    }

    const HandleLoadMore = () =>
    {
        setAnimeSearchList([...animeSearchList, <AnimeSearchList key={animeSearchList.length + 1} pageNum={animeSearchList.length + 1} search={search} setPagination={setPagination}/>])
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
                // const res = await api.get(url, {cancelToken: cancelToken.token, delay: 0});
                // setAnimes(res.data.data);
                // setPagination(res.data.pagination.has_next_page);
                // console.log(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        })();

    }, [animeSearchList.length])

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
                                    <a href="#grid-container"><li className={sortId !== "0" ? 'option-visible' : 'option'} data-id="0" data-name="Ranking" data-value={searchBar ? "rank" : "score"} data-order={searchBar ? "asc" : "desc"} onClick={HandleSort}>Ranking</li></a>
                                    <a href="#grid-container"><li className={sortId !== "1" ? 'option-visible' : 'option'} data-id="1" data-name="Popularity" data-value="members" data-order="desc" onClick={HandleSort}>Popularity</li></a>
                                    <a href="#grid-container"><li className={sortId !== "2" ? 'option-visible' : 'option'} data-id="2" data-name="Newest" data-value="start_date" data-order="desc" onClick={HandleSort}>Newest</li></a>
                                    <a href="#grid-container"><li className={sortId !== "3" ? 'option-visible' : 'option'} data-id="3" data-name="Oldest" data-value="start_date" data-order="asc" onClick={HandleSort}>Oldest</li></a>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>

            <div id="grid-container">
                <div className='container'>
                    <div className='grid'>
                        {animeSearchList}
                    </div>
                </div>
            </div>

            {pagination ?
                <div className="container">
                    <div className="reviews-box">
                        <div className="reviews-load-more" onClick={HandleLoadMore}><h2>Load More</h2></div>
                    </div>
                </div>

            : null}
            <Footer/>


        </div>

    )
}

export default Home;
