import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'

const TEAM_KEY = 'teamsDB'

export const memberService = {
    query,
    get,
    remove,
    save,
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

function save(teamIdx,member) {
    return storageService.put(TEAM_KEY, member, teamIdx)
}

