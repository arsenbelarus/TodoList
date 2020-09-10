import React, {useEffect} from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {setTodoListsTC} from '../state/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux';
import {TodoListsList} from "../components/TodolistsList/TodoListsList";
import {AppRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Login} from "../login/Login";
import {Route} from 'react-router-dom';
import {Loader} from "../loader/Loader";
import {logoutTC} from "../login/auth-reducer";

function App() {

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <Loader/>
    </div>
  }

  return (

    <div className="App">
      <AppBar position="static" style={{backgroundColor: "#282c34", color: "#efc700"}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            TODO IT
          </Typography>
          {isLoggedIn && <Button color="inherit" onClick={() => dispatch(logoutTC())}>Log out</Button>}
        </Toolbar>
      </AppBar>
      {status === "loading" && <LinearProgress color="primary"/>}
      <Container fixed>
        <Route exact path={'/TodoList'} render={() => <TodoListsList/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
      </Container>
      <ErrorSnackbar/>
    </div>

  );
}

export default App;
