const { useEffect, useState } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams } = ReactRouterDOM
import { SET_TEAMS } from '../store/store.js'
import { memberService } from '../services/member.service.js'
import { teamsService } from '../services/teams.service.js'

export function MemberDetails() {
    const [member, setMember] = useState(null)

    const dispatch = useDispatch()
    const params = useParams()
    const teams = useSelector(storeState => storeState.teamModule.teams)

    useEffect(() => {
        teamsService.query()
            .then(teams => {
                dispatch({ type: SET_TEAMS, teams })
            })
    }, [dispatch])

    useEffect(() => {
        if (teams.length > 0) {
            const teamIdx = teams.findIndex(team => team._id === params.teamId)
            if (teamIdx !== -1) {
                const foundTeam = teams[teamIdx]
                const foundMember = foundTeam.teamMembers.find(m => m._id === String(params.memberId))
                setMember(foundMember)
            }
        }
    }, [teams, params.teamId, params.memberId])

    const changeMember = () => {
        if (!member) return

        const updatedMember = {
            ...member,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            desc: document.getElementById('desc').value,
        }
        setMember(updatedMember)
        memberService.save(params.teamId, updatedMember)
            .then(() => {
                console.log('Member details have been successfully saved.')
            })
            .catch(err => {
                console.error('Failed to save member:', err)
            })
    }
    if (!member) return null

    return (
        <section className='member-details'>
            <input type='text' id='name' name='name' placeholder='Name' value={member.name || ''} onChange={changeMember} />
            <input type='email' id='email' name='email' placeholder='Email' value={member.email || ''} onChange={changeMember} />
            <input type='text' id='phoneNumber' name='phoneNumber' placeholder='Phone Number' value={member.phoneNumber || ''} onChange={changeMember} />
            <input type='text' id='desc' name='desc' placeholder='Description' value={member.desc || ''} onChange={changeMember} />
        </section>
    )
}