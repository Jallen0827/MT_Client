import React from 'react'
import './home.css'
import Meme from '../../Assests/SwimMeme.jpg'

const Home = (props) => {
    return (
        <div className='home'>
            <img src={Meme} alt="Swim meme"/>
            <h4>Announcements</h4>
            <hr/>
            <ul>
                <li>We will film videos again on February 24th, 25th, and 26th</li>
            </ul>
        </div>
    )
}

export default Home
