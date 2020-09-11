import React, {useEffect} from 'react'
import './App.css';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {TodoListsList} from "../components/TodolistsList/TodoListsList";
import {AppRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Login} from "../login/Login";
import {Route} from 'react-router-dom';
import {Loader} from "../loader/Loader";
import {logoutTC} from "../login/auth-reducer";
import {makeStyles} from "@material-ui/core/styles";

function App() {

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();

  // This is to make progress bar same color as todolist background
  const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#f5d776',
    },
    barColorPrimary: {
      backgroundColor: '#efc700',
    },
  })(LinearProgress);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
    }
  }));
  const classes = useStyles();
  // End of progress bar styling

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <Loader/>
    </div>
  }

  return (


    <div className="App">
      <AppBar position="static" style={{backgroundColor: "#282c34", color: "#efc700"}}>
        <Toolbar style={{width: "200px", margin: "0 auto"}}>
{/*          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>*/}
          <Typography variant="h6" style={{marginRight: "20px"}}>
            TODO
          </Typography>
          {isLoggedIn && <Button color="inherit" variant={"outlined"} onClick={() => dispatch(logoutTC())}>Log out</Button>}
        </Toolbar>
      </AppBar>
      {status === "loading" && <ColorLinearProgress className={classes.margin}/>}
      <Container fixed>
        <Route exact path={'/TodoList'} render={() => <TodoListsList/>}/>
        <Route exact path={'/'} render={() => <TodoListsList/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
      </Container>
      <ErrorSnackbar/>
    </div>

  );
}

export default App;
