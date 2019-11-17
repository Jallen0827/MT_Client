import React, {useState} from 'react'
import './signIn.css'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box';
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
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
        position: 'relative',
        top: '100%',
        
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

const SignIn = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')    
    

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handlesubmit =(e) =>{
        e.preventDefault()
        let url = `https://mt-fit-server.herokuapp.com/user/signin`
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userName:userName,
                password:password,
            })
        }).then(res => res.json())
        .then(data=>{
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <div>
            <Button variant="contained" component="span" onClick={handleOpen}>
            <Typography>Sign In</Typography>
        </Button>
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
            
            <form  onSubmit={(e)=>handlesubmit(e)}>
            <Box
                boxShadow={3}
                bgcolor="background.paper"
                m={1}
                p={1}
                style={{ width: '20rem', margin: '20vh auto' }}
                className='card-like'
            >
            <h1>SIGN IN</h1>
            <TextField
                required
                label="User Name:"
                margin="normal"
                style={{'color': 'red'}}
                onChange={(e)=>setUserName(e.target.value)}
            />
            <TextField
                required
                label="Password"
                type="password"
                margin="normal"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <Button type= 'submit' variant="contained" className={classes.button}>Submit</Button>
            </Box>
        </form>
            
            </Fade>
        </Modal>  
        </div>
    )
}

export default SignIn
