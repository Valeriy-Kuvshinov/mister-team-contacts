import { teamsService } from "../../services/teams.service.js"
// import { memberService } from "../../services/member.service.js"
import { ADD_TEAM, REMOVE_TEAM, UPDATE_TEAM, ADD_MEMBER, REMOVE_MEMBER } from "../reducers/teams.reducer.js"
import { store } from "../store.js"

export const addMember = (teamId, member) => ({ type: ADD_MEMBER, teamId, member })
export const removeMember = (teamId, member) => ({ type: REMOVE_MEMBER, teamId, member })

export function removeTeam(teamId, memberId) {
    return teamsService.removeMember(teamId, memberId)
        .then(() => {
            store.dispatch({ type: REMOVE_TEAM, teamId })
        })
        .catch(err => {
            console.log('Cannot remove team', err)
        })
}

export function addTeam() {
    const teamToSave = teamsService.getEmptyTeam()

    return teamsService.save(teamToSave)
        .then((savedTeam) => {
            store.dispatch({ type: ADD_TEAM, team: savedTeam })
        })
        .catch(err => {
            console.log('Cannot add team', err)
        })
}

export function saveTeam(team) {
    const type = team._id ? UPDATE_TEAM : ADD_TEAM
    return teamsService.save(team)
        .then(teamToSave => {
            store.dispatch({ type, team: teamToSave })
            return teamToSave
        })
        .catch(err => {
            console.log('team action -> Cannot save team', err)
            throw err
        })
}