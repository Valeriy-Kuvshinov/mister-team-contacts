import { todoService } from "../../services/todo.service.js"

export const SET_TEAMS = 'SET_TEAMS'
export const REMOVE_TEAM = 'REMOVE_TEAM'
export const ADD_TEAM = 'ADD_TEAM'
export const UPDATE_TEAM = 'UPDATE_TEAM'
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
        case SET_TEAMS:
            pastTodos = [...action.todos]
            return { ...state, todos: action.todos }
        case ADD_TEAM:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case REMOVE_TEAM:
            pastTodos = [...state.todos]
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case UPDATE_TEAM:
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
