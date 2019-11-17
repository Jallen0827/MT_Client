import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import APIURL from '../../helpers/env'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
        position: 'relative',
        top: '100%',
        right: '-90%',
        backgroundColor: 'grey',
        color: 'white'
    },
    button1: {
        backgroundColor: 'grey',
        color: 'white'
    },
    card: {
        maxWidth: 200,
        margin: 30,
        textAlign: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9

    }
    }));

const Upload = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const uploadFile = (e) =>{
        e.preventDefault()
        // console.log(file[0])
        // setOpen(false)


        const formData = new FormData()
        
        // for (let i; i<file.length; i++){
        //     formData.append('file', file[i])
        //     console.log(i)
        // }
        setLoading(true)
        
        //**I AM DOING THIS BECAUSE MY FOR LOOP WAS NOT EXECUTING**//
        formData.append('file', file[0])
        formData.append('file', file[1])
        formData.append('file', file[2])
        formData.append('file', file[3])
        formData.append('file', file[4])
        formData.append('file', file[5])
        formData.append('file', file[6])
        formData.append('file', file[7])
        formData.append('file', file[8])
        formData.append('file', file[9])

        fetch(`https://mt-fit-server.herokuapp.com/file/upload`, {
            method:'POST',
            headers:new Headers({
                'Authorization': props.token                                
            }),
            body:formData
        }).then(()=>{
            setLoading(false)
            setOpen(false)
            props.fetchVideos()
        })
    }

    return (
        <div>
          <Button variant="contained" color="primary" onClick={handleOpen}>Upload Videos</Button>  
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper1}>
                <form onSubmit={(e)=>{uploadFile(e)}}>
                    <h2 id="transition-modal-title">UPLOAD VIDEOS</h2>

                    <input multiple id="contained-button-file" type="file" onChange={(e)=>setFile(e.target.files)}/>

                    <br/>
                    <br/>
                    <Button type='submit' className={classes.button1}>UPLOAD</Button>
                    <br/>
                    <br/>
                    {loading? <CircularProgress /> : null}
                </form>
            </div>
            </Fade>
        </Modal>
        </div>
    )
}

export default Upload
