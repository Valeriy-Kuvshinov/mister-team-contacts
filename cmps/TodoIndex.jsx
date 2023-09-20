const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { teamsService } from "../services/teams.service.js"
import { TodoList } from "./TodoList.jsx"
import { memberService } from "../services/member.service.js"
import { SET_TEAMS, SET_FILTER_BY, UPDATE_TEAM } from "../store/reducers/teams.reducer.js"
import { TodoFilter } from "./TodoFilter.jsx"

export function TodoIndex() {
  const dispatch = useDispatch();
  const filterBy = useSelector(storeState => storeState.teamModule.filterBy)
  const teams = useSelector(storeState => storeState.teamModule.teams)

  useEffect(() => {
    teamsService.query(filterBy)
      .then(teams => {
        dispatch({ type: SET_TEAMS, teams })
      })
  }, [filterBy, dispatch])

  function onAddMember(teamId) {
    const memberToSave = memberService.getEmptyTeamMember()

    teamsService.addMemberToTeam(teamId, memberToSave)
      .then(updatedTeam => {
        dispatch({ type: UPDATE_TEAM, team: updatedTeam })
      })
      .catch(error => {
        console.error("Error adding member:", error)
      })
  }

  function onRemoveMember(teamId, memberId) {
    teamsService.removeMemberFromTeam(teamId, memberId)
      .then(updatedTeam => {
        dispatch({ type: UPDATE_TEAM, team: updatedTeam })
      })
      .catch(error => {
        console.error("Error removing member:", error)
      })
  }

  return (
    <section>
      <TodoList
        teams={teams}
        onRemoveMember={onRemoveMember}
        onAddMember={onAddMember}
      />
    </section>
  )
}