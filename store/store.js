import { todoReducer } from "./reducers/todo.reducer.js"

const { createStore ,compose, combineReducers} = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// export const SET_USER = 'SET_USER'
// export const SET_USER_SCORE = 'SET_USER_SCORE'

const appReducer=combineReducers({todoModule:todoReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(appReducer, composeEnhancers())

// console.log('store.getState():', store.getState())
window.gStore = store
