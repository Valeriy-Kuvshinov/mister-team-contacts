// import { teamsService } from "../../services/team.service.js"
import { teamsService } from "../../services/teams.service.js"

import { ADD_TEAM, REMOVE_TEAM, UPDATE_TEAM } from "../reducers/teams.reducer.js"

import { store } from "../store.js"

export function removeTeam(teamId,memberId) {
    return teamsService.removeMember(teamId,memberId)
        .then(() => {
            // showSuccessMsg('Team removed')
            store.dispatch({ type: REMOVE_TEAM, teamId })
        })
        .catch(err => {
            console.log('Cannot remove team', err)
            // showErrorMsg('Cannot remove team')
        })
}

export function addTeam() {
    const teamToSave = teamsService.getEmptyTeam()

    return teamsService.save(teamToSave)
        .then((savedTeam) => {
            store.dispatch({ type: ADD_TEAM, team: savedTeam })
            // showSuccessMsg(`Team added (id: ${savedTeam._id})`)

        })
        .catch(err => {
            console.log('Cannot add team', err)
            // showErrorMsg('Cannot add team')
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
