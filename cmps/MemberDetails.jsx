const { useEffect } = React

const { useSelector, useDispatch } = ReactRedux

const { useParams } = ReactRouterDOM

import { SET_TEAMS } from "../store/store.js"

import { memberService } from "../services/member.service.js"
import { teamsService } from "../services/teams.service.js"
import { UPDATE_TEAM } from "../store/reducers/teams.reducer.js"

export function MemberDetails() {

    const dispatch = useDispatch()
    const params = useParams()
    const teams = useSelector(storeState => storeState.teamModule.teams)

    useEffect(() => {
        teamsService.query()
            .then(teams => {
                dispatch({ type: SET_TEAMS, teams })
            })
    }, [])
    const teamId = params.teamId
    const teamIdx = teams.findIndex(team => team._id === teamId)
    if (teams[teamIdx] === undefined) return
    const member = teams[teamIdx].teamMembers.find((member) => member._id === String(params.memberId))
    // console.log(member)
    if (member === undefined) return

    function showDetails() {
        document.getElementById('name').value = member.name
        document.getElementById('email').value = member.email
        document.getElementById('phoneNumber').value = member.phoneNumber
    }

    function changeMember() {
        member.name = document.getElementById('name').value
        member.email = document.getElementById('email').value
        member.phoneNumber = document.getElementById('phoneNumber').value
        console.log('changed')
        const newMember = { ...member }
        memberService.save(teamIdx, newMember)
        // .then(()=>{
        // dispatch({type:UPDATE_TEAM, team: newTeam})})
    }

    setTimeout(showDetails, 10)

    return (
        <section className='member-details'>
            <input type='text' id='name' name='name' placeholder='name' onChange={changeMember} />
            <input type='email' id='email' name='email' placeholder="email" onChange={changeMember} />
            <input type='text' id='phoneNumber' name='phoneNumber' placeholder="phoneNumber" onChange={changeMember} />

            {/* <button onClick={showDetails}>details</button> */}
        </section>
    )
}