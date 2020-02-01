import React, {useState, useEffect} from 'react'
import {
    Route,
    Link,
    Switch
  } from 'react-router-dom'

import Home from '../home/home'
import Videos from '../Videos/videos'

import './folders.css'
import APIURL from '../../helpers/env'


const Person = (props) => {
    const [person, setPerson] = useState([])

    const fetchPerson=()=>{
        fetch(`https://mt-fit-server.herokuapp.com/person/all`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res=> res.json())
        .then(data=>{
            setPerson(data)
        })
    }

    useEffect(()=>{
        fetchPerson()
    }, [])

    return (
        <div className="folders">    
            <div className="sidebar-list-styling">
                <ul className="sidebar-list list-unstyled">
                <Link to="/"><li>Home</li></Link>
                {person.map((per, index)=>(
                    <Link className='link'to={`/${per.Name}`}><li key={index}>{per.Name}</li></Link>  
                ))}
                </ul>
            </div>
            <div className="sidebar-route">
                <Switch>
                    <Route exact path="/home"><Home token={props.token}/></Route>
                    <Route exact path="/"><Home token={props.token} /></Route>
                    {person.map((per, index)=>(
                        <Route key={index} exact path={`/${per.Name}`}><Videos perId={per.id} perName={per.Name} token={props.token}/></Route>
                    ))}
                    {/* <Route exact path="/resources"><Resources /></Route> */}
                </Switch>
            </div>    
        </div>
    )
}

export default Person


