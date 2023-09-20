import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'
import { teamsService } from './teams.service.js'

const TEAM_KEY = 'teamsDB'

export const memberService = {
    query,
    get,
    remove,
    save,
    addMember,
    removeMember,
    getEmptyTeamMember
}

function addMember(teamId, newMember) {
    return teamsService.addMemberToTeam(teamId, newMember)
}

function removeMember(teamId, memberId) {
    return teamsService.removeMemberFromTeam(teamId, memberId)
}

function getEmptyTeamMember() {
    return {
        name: "Name of member",
        email: "teammember@gmail.com",
        phoneNumber: "052-1234567",
        _id: "",
        desc: "The most member of our team"
    }
}

function query(filterBy = {}) {
    if (!filterBy.teamName) filterBy.teamName = ''
    const regExp = new RegExp(filterBy.teamName)

    return storageService.query(TEAM_KEY)
        .then(teams => {
            return teams.filter(team => regExp.test(team.teamName))
        })
}

function get(memberId) {
    return storageService.get(TEAM_KEY, memberId)
}

function remove(memberId) {
    return storageService.remove(TEAM_KEY, memberId)
}

function save(teamId, member) {
    return teamsService.get(teamId).then((team) => {
        const memberIdx = team.teamMembers.findIndex((memb) => memb._id === member._id)

        if (memberIdx > -1) {
            team.teamMembers[memberIdx] = member
            return storageService.put(TEAM_KEY, team)
        } else {
            member._id = utilService.makeId()
            team.teamMembers.push(member)
            return storageService.put(TEAM_KEY, team)
        }
    })
}