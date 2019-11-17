import React, {useState} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

const EditTitle = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(props.videoTitle)

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const editTitle = (id) =>{
        fetch(`${APIURL}/file/update/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token 
            }),
            body:JSON.stringify({
                title: title
            })
        })
        .then(()=>props.fetchVideos())
    }
    return (
        <div>
           <>
            <Tooltip title="Edit Title">
                <IconButton onClick={handleOpen} aria-label="edit">
                   <EditIcon/>
                </IconButton>
            </Tooltip></> 
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
        <form onSubmit={(e)=>{editTitle(e)}}>
            <h2 id="transition-modal-title">Edit Title</h2>
                <TextField
                    id="standard-required"
                    value={props.videoTitle}
                    className={classes.textField}
                    margin="normal"
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <br/>
                <br/>
                <Button type='submit' className={classes.button1}>UPDATE TITLE</Button>
        </form>
        </div>
        </Fade>
        </Modal>
        </div>
    )
}

export default EditTitle
