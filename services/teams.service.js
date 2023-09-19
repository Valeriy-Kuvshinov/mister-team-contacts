import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'

const TEAM_KEY = 'teamsDB'
var gFilterBy = 'all'

_initTeams()
// console.log(team1)

export const teamsService = {
    query,
    get,
    remove,
    save,
    getEmptyTeam,
    getDefaultFilter,
    setFilterBy,
    resetFilter,
}

function query(filterBy = {}) {
    if (!filterBy.teamName) filterBy.teamName = ''
    const regExp = new RegExp(filterBy.teamName)

    return storageService.query(TEAM_KEY)
        .then(teams => {
            return teams.filter(team => regExp.test(team.teamName))
        })
}

function get(teamId) {
    return storageService.get(TEAM_KEY, teamId)
}

function remove(teamId) {
    return storageService.remove(TEAM_KEY, teamId)
}

function save(team) {
    if (team._id) {
        return storageService.put(TEAM_KEY, team)
    } else {
        return storageService.post(TEAM_KEY, team)
    }
}

function getEmptyTeam(teamName = 'TeamName') {
    return {
        _id: '',
        teamName,
        teamMembers: []
    }
}

function getDefaultFilter() {
    return { teamName: '' }
}

function setFilterBy(filterType = '') {
}

function resetFilter() {
}

function _initTeams() {
    storageService.query(TEAM_KEY).then(teams => {
        if (!teams || !teams.length) {
            const initialTeam = {
                teamName: "team1",
                teamMembers: [
                    {
                        name: "breadrico",
                        email: "breadrico23@gmail.com",
                        phoneNumber: "053-0962835",
                        _id: "1"
                    },
                    {
                        name: "breadishia",
                        email: "breadishiaisaweseome@gmail.com",
                        phoneNumber: "057-2461842",
                        _id: "2"
                    },
                    {
                        name: "breadson",
                        email: "breadson@gmail.com",
                        phoneNumber: "055-2846321",
                        _id: "3"
                    },
                    {
                        name: "bready",
                        email: "breadson@hotmail.com",
                        phoneNumber: "055-2846311",
                        _id: "4"
                    }
                ]
            }
            initialTeam._id = utilService.makeId()
            storageService.post(TEAM_KEY, initialTeam)
        }
    })
}