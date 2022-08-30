import React, {useState, useEffect} from 'react';
import { useParams, useLocation  } from 'react-router-dom';
import AnimeSearchList from './AnimeSearchList';
import Navbar from './components/Navbar';
import Footer from './components/footer'
import SkeletonLoading from './SkeletonLoading';

const AnimeSearchPage = () => {

const { search } = useParams();
let location = useLocation();
const [loading, setLoading] = useState(true);
const [loadingNum, setLoadingNum] = useState([1, 2, 3, 4, 5, 6]);


const [pagination, setPagination] = useState();
const [animeSearchList, setAnimeSearchList] = useState([<AnimeSearchList key={1} pageNum={1} search={search} buttonValue={""} sortValue={""} sortOrder={""} setPagination={setPagination} setLoading={setLoading}/>])
const [refresh, setRefresh] = useState(0);

const HandleLoadMore = (e) =>
{
  e.preventDefault();
  setAnimeSearchList([...animeSearchList, <AnimeSearchList key={animeSearchList.length + 1} pageNum={animeSearchList.length + 1} search={search} buttonValue={""} sortValue={""} sortOrder={""} setPagination={setPagination}/>])

}
useEffect(()=>{
    (async function()
    {
        try
        {
            if(refresh > 0) window.location.reload();
            setRefresh(1);

        }
        catch(err)
        {
            console.log(err);
        }
    })();
}, [location]);

  return (
    <div className="anime-search-page">
        <Navbar/>

        {loading ?


                <div id="grid-container">
                    <div className='container'>
                        <div className='grid'>
                            {loadingNum.map((skeleton, i)=>{return <SkeletonLoading key={i}/>})}

                            
                        </div>
                    </div>
                </div>

        :   
            null}

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

export default AnimeSearchPage