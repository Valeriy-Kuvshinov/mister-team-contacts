
const { Link } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

import { TodoPreview } from "./TodoPreview.jsx"
import { teamsService } from "../services/teams.service.js"
import { memberService } from "../services/member.service.js"
import { store } from "../store/store.js"
import { ADD_TEAM } from "../store/reducers/teams.reducer.js"

export function TodoList({ teams, confirmChange, onAddMember, onRemoveMember }) {
  const dispatch = useDispatch()
  if (teams.length === 0) {
    return (<section>
      <ul className='todo-list'>
        <li key='bread' className="todo">no teams:</li>
      </ul>
    </section>)
  }

  console.log('teams', teams[0].teamMembers)
  function addMember() {
    const newMember = teamsService.getEmptyTeamMember()
    console.log(newMember)
    teamsService.addMember(teams[0]._id, newMember)
      .then((savedMember) => {
        store.dispatch({ type: ADD_TEAM, todo: savedMember })
        // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

      })
      .catch(err => {
        console.log('Cannot add todo', err)
        // showErrorMsg('Cannot add todo')
      })
  }

  return (
    <section className="team-section">
      <ul className='team-list'>
        <li key='bread' className="team-item">
          <div className="team-header">
            <h2 className="team-name">{teams[0].teamName}</h2>
            <span>{teams[0].teamDescription}</span>
          </div>
        </li>
        {teams[0].teamMembers.map((member) =>
          <li key={member._id} className="team-member-item">
            <TodoPreview teamId={teams[0]._id} member={member} confirmChange={confirmChange} onRemoveMember={onRemoveMember} />
          </li>)}
        <li className="add-button-wrapper">
          <button className="add-button" onClick={addMember}>
            Add Member
          </button>
        </li>
      </ul>
    </section>
  )
}