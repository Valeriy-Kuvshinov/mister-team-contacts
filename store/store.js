import { teamReducer } from "./reducers/teams.reducer.js"

const { createStore ,compose, combineReducers} = Redux

export const SET_TEAMS = 'SET_TEAMS'
export const REMOVE_TEAM = 'REMOVE_TEAM'
export const ADD_TEAM = 'ADD_TEAM'
export const UPDATE_TEAM = 'UPDATE_TEAM'

const appReducer=combineReducers({teamModule:teamReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(appReducer, composeEnhancers())

window.gStore = store
