import { todoService } from "../../services/todo.service.js"

import { ADD_TEAM, REMOVE_TEAM, UPDATE_TEAM } from "../reducers/todo.reducer.js"

import { store } from "../store.js"

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            // showSuccessMsg('Todo removed')
            store.dispatch({ type: REMOVE_TEAM, todoId })
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
            store.dispatch({ type: ADD_TEAM, todo: savedTodo })
            // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

        })
        .catch(err => {
            console.log('Cannot add todo', err)
            // showErrorMsg('Cannot add todo')
        })


}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TEAM : ADD_TEAM
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
