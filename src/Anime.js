import React from 'react';
import {Link} from "react-router-dom"; 

const Anime = ({id, title, image_url}) => {
    return (
        <Link to={`/${id}`}>
                <div className="grid-item">
                    <div className="poster-container">
                        <img src={image_url} alt="Main Poster" />
                    </div>
                    <h1 className='home-anime-title'>{title}</h1>
                </div>

        </Link>
    )
}

export default Anime;
