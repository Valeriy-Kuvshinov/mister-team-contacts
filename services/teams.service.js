import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'

const TEAM_KEY = 'teamsDB'
var gFilterBy = { teamName: '', memberName: '', sortKey: '' }
_initTeams()
console.log("Teams Service file loaded")

export const teamsService = {
    query,
    get,
    remove,
    save,
    getEmptyTeam,
    getDefaultFilter,
    setFilterBy,
    resetFilter,
    addMember,
    removeMember,
    getEmptyTeamMember
}

function query(filterBy = {}) {
    if (!filterBy.teamName) filterBy.teamName = ''
    if (!filterBy.memberName) filterBy.memberName = ''
    if (!filterBy.sortKey) filterBy.sortKey = ''

    const teamRegExp = new RegExp(filterBy.teamName, 'i')
    const memberRegExp = new RegExp(filterBy.memberName, 'i')

    return storageService.query(TEAM_KEY)
        .then(teams => {
            const filteredTeams = teams.filter(team => teamRegExp.test(team.teamName))
            filteredTeams.forEach(team => {
                if (filterBy.memberName) {
                    team.teamMembers = team.teamMembers.filter(member => memberRegExp.test(member.name))
                }
                if (filterBy.sortKey) {
                    team.teamMembers.sort((a, b) => {
                        if (a[filterBy.sortKey] < b[filterBy.sortKey]) return -1
                        if (a[filterBy.sortKey] > b[filterBy.sortKey]) return 1
                        return 0
                    })
                }
            })
            return filteredTeams
        })
}

function get(teamId) {
    return storageService.get(TEAM_KEY, teamId)
}

function remove(teamId) {
    return storageService.remove(TEAM_KEY, teamId)
}

function save(team) {
    console.log(team)
    // if (team._id) {
        return storageService.put2(TEAM_KEY, team)
    // } else {
    //     return storageService.post(TEAM_KEY, team)
    // }
}

function getEmptyTeam(teamName = 'TeamName') {
    return {
        _id: '',
        teamName,
        teamMembers: []
    }
}

function setFilterBy(newFilterBy) {
    gFilterBy = newFilterBy
}

function getDefaultFilter() {
    return { teamName: '', memberName: '', sortKey: '' }
}

function resetFilter() {
    gFilterBy = { teamName: '', memberName: '', sortKey: '' }
}

function getEmptyTeamMember(name = "teamMember") {
    return {
        name: "name",
        email: "email",
        phoneNumber: "number",
        _id: "",
        desc: ""
    }
}

function addMember(teamId, newMember) {
    return get(teamId).then((team) => {
        newMember._id = utilService.makeId()
        team.teamMembers.push(newMember)
        return save(team)
    })
}

function removeMember(teamId, memberId) {
    return get(teamId).then((team) => {
        const memberIdx = team.teamMembers.findIndex((m) => m._id === memberId)
        if (memberIdx > -1) {
            team.teamMembers.splice(memberIdx, 1)
            return save(team)
        }
    })
}

function _initTeams() {
    console.log('Running _initTeams')
    storageService.query(TEAM_KEY).then(teams => {
        if (!teams || !teams.length) {
            const initialTeam = {
                teamName: "team1",
                teamDescription:'description',
                teamMembers: [
                    {
                        name: "breadrico",
                        email: "breadrico23@gmail.com",
                        phoneNumber: "053-0962835",
                        _id: "1",
                        desc: "very trustworthy"
                    },
                    {
                        name: "breadishia",
                        email: "breadishiaisaweseome@gmail.com",
                        phoneNumber: "057-2461842",
                        _id: "2",
                        desc: "always bready"
                    },
                    {
                        name: "breadson",
                        email: "breadson@gmail.com",
                        phoneNumber: "055-2846321",
                        _id: "3",
                        desc: "here he go!"
                    },
                    {
                        name: "bready",
                        email: "breadson@hotmail.com",
                        phoneNumber: "055-2846311",
                        _id: "4",
                        desc: "look up!"
                    }
                ]
            }
            initialTeam._id = utilService.makeId()
            storageService.post(TEAM_KEY, initialTeam)
        }
    })
}