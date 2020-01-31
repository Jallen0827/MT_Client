import React from 'react'
import './home.css'
import Upload from '../Videos/upload'

const Home = (props) => {
    return (
        <div className='home'>
            <h2>Announcements</h2>
            <hr/>
            {/* <hr/> */}
            {/* {props.token ? <Upload token={props.token}/> : null} */}
        </div>
    )
}

export default Home
