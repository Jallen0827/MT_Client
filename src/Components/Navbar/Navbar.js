import React from 'react'
// import SignIn from '../SignIn/signIn'
// import Logo from '../../Assests/Logo.png'
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: 'lightgrey',
      color: 'white',
    },
    input: {
      display: 'none',
    },
    logo: {
      height:50,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    navbar:{
      backgroundColor: 'lightblue',
      textOverflow: 'ellipsis',
      whiteSpace:'nowrap',
    }
  }));

const Navbar = (props)=>{
    const classes = useStyles()
    return(
      <>
        <AppBar className={classes.navbar}position="static">
        <Toolbar>
        <Grid item xs={1}>
          {/* <img className={classes.logo} src={Logo} alt='Logo' onClick={props.logoutCount}/>     */}
        </Grid>
        <Grid item xs={10}>
          <h1>Jordan YMCA MultiFit</h1>
        </Grid>
          <Grid item xs={"auto"}>
          {/* {props.token ? <Button className={classes.button} onClick={props.clearToken}>Logout</Button>
                      : <SignIn className={classes.button} updateToken= {props.updateToken}/>}           */}
          </Grid>
        </Toolbar>
      </AppBar>
      </>
    )
}

export default Navbar