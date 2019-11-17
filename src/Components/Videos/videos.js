import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import './videos.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Upload from './upload'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import APIURL from '../../helpers/env'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: 'whitesmoke',  
      width: 350,
      hight: 350,
    },
    container: {
        // alignItems: 'center'
    }
  }))

  
const Videos = (props) => {
    const classes = useStyles()
    const [videos, setVideos] = useState([])

    const fetchVideos=()=>{
        fetch(`https://mt-fit-server.herokuapp.com/file/all`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res=> res.json())
        .then(data=>{
            setVideos(data)
            // console.log(data)
            // console.log(data[0].createdAt.split('T')[0])
        })
    }

    useEffect(()=>{
        fetchVideos()        
    }, [])

    const deleteVideo = (id) => {
        fetch(`https://mt-fit-server.herokuapp.com/file/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token 
            })
        })
        .then(()=>fetchVideos())
    }

    // const editTitle = (id) =>{
    //     fetch(`http://localhost:3002/file/update/${id}`, {
    //         method: 'PUT',
    //         headers: new Headers({
    //             'Content-Type':'application/json',
    //             'Authorization':props.token 
    //         })
    //     })
    //     .then(()=>fetchVideos())
    // }

    return (
        <div>
            <hr/>
            {props.token ? <Upload token={props.token} fetchVideos={fetchVideos}/> : null}
            <br/>
            <br/>
            <Grid container justify='center' className={classes.container} spacing={2}>
            {videos.map((video, index) => (
                <Grid key={index} item>
                    <Card className={classes.card}>
                    <CardHeader
                    title={video.title.split('.')[0]}
                    // action={props.token? <EditTitle videoTitle={video.title.split('.')[0]} videoId={video.id} fetchVideos={fetchVideos}/> : null}
                    subheader={video.createdAt.split('T')[0]}
                    />
                        <video   controls>
                            <source type='video/mp4' src={video.location}/>
                            Your browser does not support the video tag.
                        </video>
                    <CardActions disableSpacing>    
                        {props.token ?     <><Tooltip title="Delete Video">
                                                <IconButton onClick={()=>deleteVideo(video.id)} aria-label="delete">
                                                <DeleteIcon />
                                                </IconButton>
                                            </Tooltip></>
                        : null}
                    </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default Videos
