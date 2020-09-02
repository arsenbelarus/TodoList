import React, {useEffect} from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {setTodoListsTC} from '../state/todolists-reducer'
import {useDispatch} from 'react-redux';
import {TodoListsList} from "../components/TodolistsList/TodoListsList";

function App() {

    useEffect(() => {
        dispatch(setTodoListsTC())
    }, [])

    const dispatch = useDispatch();

    return (
        <div className="App">
            <AppBar position="static">
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
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    );
}

export default App;
