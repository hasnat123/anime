import React from 'react'

const footer = () => {
    const HandleScroll = () =>
    {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  return (
    <footer>
        <div className="container">
            <div onClick={HandleScroll} className="back-to-top">
                <i className="fas fa-chevron-up"></i>
            </div>
            <div className="footer-content">
                <div className="footer-content-divider animate-bottom">
                    <div className="meow">
                        <h4>Follow along</h4>
                        <ul className="social-icons">
                            <li>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="fab fa-facebook-square"></i></a>
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
  )
}

export default footer