import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'
const TODO_KEY = 'todoDB'
var gFilterBy = 'all'
_createTodos()

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
    getDefaultFilter,
    setFilterBy,
    resetFilter,
}

function query(filterBy = {}) {
    if (!filterBy.title) filterBy.title = ''
    if (!filterBy.subject) filterBy.subject = ''
    const regExp1 = new RegExp(filterBy.title)
    const regExp2 = new RegExp(filterBy.subject)
    // console.log(regExp)
    return storageService.query(TODO_KEY)
        .then(todos => {
            // if (gFilterBy === 'active') {
            //     todos = todos.filter(todo => !todo.isCompleted)
            // } else if (gFilterBy === 'done') {
            //     todos = todos.filter(todo => todo.isCompleted)
            // }
            // return todos
            return todos.filter(todo =>
                regExp1.test(todo.title) 
                &&
                regExp2.test(todo.subject) 
            )
        })
}


function get(todoId) {
    return storageService.get(TODO_KEY, todoId)
        .then((todo) => {
            // todo = _setNextPrevTodoId(todo)
            return todo
        })
}

function remove(todoId) {
    return storageService.remove(TODO_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        return storageService.post(TODO_KEY, todo)
    }
}


function sortBy(items, key, dir) {
    const isStrings = ['subject']
    if (isStrings.includes(key)) {
        items.sort((a, b) => (a[key].localeCompare(b[key])) * dir)
    } else {
        items.sort((a, b) => (b[key] - a[key]) * dir)
    }
    return items
}

function getDefaultFilter() {
    return { title: '', subject: '' }
}

function setFilterBy(filterType = '') {

}

function resetFilter() {
}

function getEmptyTodo(title='title', subject='subject') {
    return { _id: '', title, subject, isCompleted: false, createdAt: Date.now() }
}

function _createTodos() {
    // console.log('todo created')
    let todos = utilService.loadFromStorage(TODO_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo( 'wash the bread', 'wash the bread until its clean' ))
        todos.push(_createTodo( 'be bready' , 'become one with bread' ))
        todos.push(_createTodo( 'date the bread' , 'build your breadlationship with bread' ))
        utilService.saveToStorage(TODO_KEY, todos)
    }
}

function _createTodo(title, subject) {
    const todo = getEmptyTodo(title, subject)
    todo._id = utilService.makeId()
    return todo
}

