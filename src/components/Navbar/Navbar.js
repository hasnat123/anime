import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  let navigate = useNavigate();

  const [search, setSearch] = useState();
  const [toggle, setToggle] = useState(false);


  const HandleChange = (e) =>
  {
    setSearch(e.target.value);
  }

  const HandleSearch = (e) =>
  {
    e.preventDefault();
    navigate(`/search/${search}`);
  }

  const HandleKeySearch = (e) =>
  {
    if(e.key === 'Enter') navigate(`/search/${search}`);
  }

  const HandleToggle = (e) =>
  {
    e.preventDefault();
    setToggle(!toggle);
  }

  
  return (
    <div className='navbar'>
        <Link to={'/'}><Logo/></Link>
        <div className="navbar-search-container">
          <input type="text" className="navbar-search" placeholder="Search for an anime..." onChange={HandleChange} onKeyDown={HandleKeySearch}/>
          <button className="navbar-search-btn" type="submit" onClick={HandleSearch} >
            <i className="fas fa-search"></i>

          </button>
        </div>

        <div className={toggle ? "navbar-search-container-mobile open" : "navbar-search-container-mobile"}>
          <input type="text" className="navbar-search mobile" placeholder="Search for an anime..." onChange={HandleChange} onKeyDown={HandleKeySearch}/>
          <i className="fal fa-times mobile-search"  onClick={HandleToggle}></i>
        </div>


        <button className="navbar-search-btn mobile" type="submit" onClick={HandleToggle}>
            <i className="fas fa-search"></i>
        </button>

    </div>
  )
}

export default Navbar