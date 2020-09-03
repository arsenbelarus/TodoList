import React, {useEffect} from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {setTodoListsTC} from '../state/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux';
import {TodoListsList} from "../components/TodolistsList/TodoListsList";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";

function App() {

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [])

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch();

    return (
        <div className="App">
            <AppBar position="static" style={{backgroundColor: "grey"}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === "loading" && <LinearProgress color="primary"/>}
            <Container fixed>
                <TodoListsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
