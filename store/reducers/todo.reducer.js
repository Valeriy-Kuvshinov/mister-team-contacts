import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY= 'SET_FILTER_BY'

const initialState = {
    todos: [],
    pastTodos: [],
    filterBy: todoService.getDefaultFilter()
}

export function todoReducer(state = initialState, action) {
    let todos
    let pastTodos
    switch (action.type) {
        case SET_TODOS:
            pastTodos = [...action.todos]
            return { ...state, todos: action.todos }
        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case REMOVE_TODO:
            pastTodos = [...state.todos]
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map((todo) => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        // User
        // case SET_USER:
        //     return { ...state, loggedinUser: action.user }

        default:
            return state
    }
}
