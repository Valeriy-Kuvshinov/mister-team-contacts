const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { TodoPreview } from "./TodoPreview.jsx"
import { teamsService } from "../services/teams.service.js"
import { memberService } from "../services/member.service.js"
import { store } from "../store/store.js"
import { ADD_TEAM } from "../store/reducers/teams.reducer.js"

export function TodoList({ teams, confirmChange, onAddMember, onRemoveMember }) {
  if (teams.length === 0) {
    return <div>No teams available.</div>;
  }

  return (
    <section className="team-section">
      {teams.map((team) => (
        <ul key={team._id} className="team-list">
          <li className="team-item">
            <div className="team-header">
              <h2 className="team-name">{team.teamName}</h2>
            </div>
            <h2>{team.teamDescription}</h2>
          </li>
          {team.teamMembers.map((member) => (
            <li key={member._id} className="team-member-item">
              <TodoPreview
                teamId={team._id}
                member={member}
                confirmChange={confirmChange}
                onRemoveMember={() => onRemoveMember(team._id, member._id)}
              />
            </li>
          ))}
          <li className="add-button-wrapper">
            <button className="add-button" onClick={() => onAddMember(team._id)}>
              Add Member
            </button>
          </li>
        </ul>
      ))}
    </section>
  );
}