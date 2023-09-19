import { todoService } from "../../services/todo.service.js"

import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../reducers/todo.reducer.js"

import { store } from "../store.js"

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            // showSuccessMsg('Todo removed')
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Cannot remove todo', err)
            // showErrorMsg('Cannot remove todo')
        })
}

export function addTodo() {
    const todoToSave = todoService.getEmptyTodo()

    return todoService.save(todoToSave)
        .then((savedTodo) => {
            store.dispatch({ type: ADD_TODO, todo: savedTodo })
            // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

        })
        .catch(err => {
            console.log('Cannot add todo', err)
            // showErrorMsg('Cannot add todo')
        })


}


export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(todoToSave => {
            store.dispatch({ type, todo: todoToSave })
            return todoToSave
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}
