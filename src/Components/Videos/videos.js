import React, {useState, useEffect} from 'react'
import './videos.css'
import Upload from './upload'
import APIURL from '../../helpers/env'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: 'whitesmoke',
    //   backgroundColor: '#000000',
    //   backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
      width: 350,
      hight: 350,
    //   color: 'white'
    },
    container: {
        // alignItems: 'center'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%',
        backgroundColor: 'white',
    },
    comments:{
        width: '70vw',
        borderTop: 'lightgrey'
    },
    button: {
        backgroundColor: 'grey',
        color: 'white',
      },
  }))

  
const Videos = (props) => {
    const classes = useStyles()
    const [videos, setVideos] = useState([])
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const fetchVideos=()=>{
        fetch(`${APIURL}/file/all/${props.perId}`, {
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
        fetchComments()       
    }, [])

    const deleteVideo = (id) => {
        fetch(`${APIURL}/file/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token 
            })
        })
        .then(()=>fetchVideos())
    }

    const postComment = () => {
        fetch(`${APIURL}/comments/comments/${props.perId}`, {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                comment: comment
            })
        }).then(res => res.json())
        .then(data => {
            fetchComments()
        })
    }

    const fetchComments = () => {
        fetch(`${APIURL}/comments/all/${props.perId}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res=> res.json())
        .then(data=>{
            setComments(data)
        })
    }

    return (
        <div>
            {/* <h1>{props.perName}</h1> */}
            <br/>
            <br/>

            {props.token ? <Upload token={props.token} fetchVideos={fetchVideos}/> : null}
            <ExpansionPanel className={classes.heading}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>Coaches Comments</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <Typography className={classes.comments}>
                <TextField
                id="outlined-multiline-static"
                className={classes.comments}
                label="Enter Comment"
                multiline
                onChange={(e)=>setComment(e.target.value)}
                variant="outlined"
                />
                <br/>
                <Button className={classes.button} onClick={()=>postComment()}>Post</Button>
                <br/> 
                <br/>           
                    {comments.map(com=> (<div className='comment'><hr/> {com.comment} <br/><br/></div>))}
                </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <br/>
            <br/>
            <Grid container justify='center' className={classes.container} spacing={2}>
            {videos.map((video, index) => (
                <Grid key={index} item>
                    <Card className={classes.card}>
                    <CardHeader
                    title={video.title.split('.')[0]}
                    subheader={video.createdAt.split('T')[0]}
                    />
                    <div className='iframe-container'>
                    <iframe width="360" height="362" src={video.location} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>                        
                    </div>
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


