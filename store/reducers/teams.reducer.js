import { teamsService } from "../../services/teams.service.js"

export const SET_TEAMS = 'SET_TEAMS'
export const REMOVE_TEAM = 'REMOVE_TEAM'
export const ADD_TEAM = 'ADD_TEAM'
export const UPDATE_TEAM = 'UPDATE_TEAM'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const ADD_MEMBER = 'ADD_MEMBER'
export const REMOVE_MEMBER = 'REMOVE_MEMBER'

const initialState = {
    teams: [],
    pastTeams: [],
    filterBy: teamsService.getDefaultFilter()
}

export function teamReducer(state = initialState, action) {
    let teams
    let pastTeams
    switch (action.type) {
        case SET_TEAMS:
            pastTeams = [...action.teams]
            return { ...state, teams: action.teams }
        case ADD_TEAM:
            teams = [...state.teams, action.team]
            return { ...state, teams }
        case REMOVE_TEAM:
            pastTeams = [...state.teams]
            teams = state.teams.filter(team => team._id !== action.teamId)
            return { ...state, teams }
        case UPDATE_TEAM:
            teams = state.teams.map((team) => team._id === action.team._id ? action.team : team)
            return { ...state, teams }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }
        case ADD_MEMBER:
            teams = state.teams.map(team => {
                if (team._id === action.teamId) {
                    return { ...team, teamMembers: [...team.teamMembers, action.member] }
                }
                return team
            })
            return { ...state, teams }
        case REMOVE_MEMBER:
            teams = state.teams.map(team => {
                if (team._id === action.teamId) {
                    return { ...team, teamMembers: team.teamMembers.filter(member => member._id !== action.memberId) }
                }
                return team
            })
            return { ...state, teams }
        default:
            return state
    }
}