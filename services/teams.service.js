import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'

const TEAM_KEY = 'teamsDB'
var gFilterBy = { teamName: '', memberName: '', sortKey: '' }

export const teamsService = {
    query,
    get,
    remove,
    save,
    getEmptyTeam,
    addMemberToTeam,
    removeMemberFromTeam,
    getDefaultFilter,
    setFilterBy,
    resetFilter,
}
_initTeams()

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
    if (team._id) return storageService.put(TEAM_KEY, team)
    else return storageService.post(TEAM_KEY, team)
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

function addMemberToTeam(teamId, newMember) {
    return get(teamId).then((team) => {
        if (!team) {
            throw new Error(`Team with ID ${teamId} not found.`);
        }
        newMember._id = utilService.makeId(); // Assuming utilService is imported and provides a unique ID
        team.teamMembers.push(newMember);
        console.log('Team to Save:', JSON.stringify(team, null, 2));
        return save(team);
    });
}

function removeMemberFromTeam(teamId, memberId) {
    return get(teamId).then((team) => {
        if (!team) {
            throw new Error(`Team with ID ${teamId} not found.`);
        }
        const memberIdx = team.teamMembers.findIndex((m) => m._id === memberId);
        if (memberIdx === -1) {
            throw new Error(`Member with ID ${memberId} not found.`);
        }
        team.teamMembers.splice(memberIdx, 1);
        console.log('Team to Save:', JSON.stringify(team, null, 2));
        return save(team);
    });
}

async function _initTeams() {
    const teams = await storageService.query(TEAM_KEY)
    if (!teams || !teams.length) {
        const initialTeams = [
            {
                teamName: "team1",
                teamDescription: 'Head bakery team, leading the bread production',
                teamMembers: [
                    {
                        name: "breadrico",
                        email: "breadrico23@gmail.com",
                        phoneNumber: "053-0962835",
                        _id: utilService.makeId(),
                        desc: "very trustworthy"
                    },
                    {
                        name: "breadishia",
                        email: "breadishiaisawesome@gmail.com",
                        phoneNumber: "057-2461842",
                        _id: utilService.makeId(),
                        desc: "look up!"
                    },
                    {
                        name: "breadson",
                        email: "breadson@gmail.com",
                        phoneNumber: "055-2846321",
                        _id: utilService.makeId(),
                        desc: "here he go!"
                    },
                    {
                        name: "bready",
                        email: "breadson@hotmail.com",
                        phoneNumber: "055-2846311",
                        _id: utilService.makeId(),
                        desc: "always bready"
                    },
                ],
            },
            {
                teamName: "team2",
                teamDescription: 'The cake squad, making the best cakes',
                teamMembers: [
                    {
                        name: "cakelisa",
                        email: "cakelisa@gmail.com",
                        phoneNumber: "053-1234567",
                        _id: utilService.makeId(),
                        desc: "cake master"
                    },
                    {
                        name: "cakebob",
                        email: "cakebob@gmail.com",
                        phoneNumber: "057-7654321",
                        _id: utilService.makeId(),
                        desc: "always caking"
                    },
                ],
            }
        ]
        for (const team of initialTeams) {
            await storageService.post(TEAM_KEY, team)
        }
    }
}