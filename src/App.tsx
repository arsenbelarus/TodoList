import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValueType = "all" | "active" | "completed";
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
type StateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();
    let todoListId3 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "Books", filter: "all"},
        {id: todoListId2, title: "Countries visited", filter: "all"},
        {id: todoListId3, title: "Перезвонить завтра", filter: "all"},
    ])

    let [tasks, setTasks] = useState<StateType>({
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "Italy", isDone: false},
                {id: v1(), title: "Japan", isDone: false},
                {id: v1(), title: "Spain", isDone: false},
                {id: v1(), title: "Poland", isDone: false},
                {id: v1(), title: "Greece", isDone: false},
            ],
            [todoListId3]: [
                {id: v1(), title: "Арсену", isDone: false},
                {id: v1(), title: "Оле", isDone: false},
                {id: v1(), title: "Тиграну", isDone: false},
                {id: v1(), title: "Давилу", isDone: false},
            ],
        }
    );

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(taskTitle: string, todoListId: string) {
        let task = {id: v1(), title: taskTitle, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {id: newTodoListID, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoListID]: []})
    }

    function onFinalChange(id: string, value: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.title = value
            setTasks({...tasks})
        }
    }

    function changeHeaderTitle(value: string, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.title = value
        }
        setTodoLists([...todoLists])
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {
                let allTodoListTasks = tasks[tl.id]
                let tasksForTodoList = allTodoListTasks;
                if (tl.filter === "active") {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                }
                return <Todolist
                    id={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodoList={removeTodoList}
                    onFinalChange={onFinalChange}
                    changeHeaderTitle={changeHeaderTitle}
                    filter={tl.filter}/>
            })}
        </div>
    );
}

export default App;
