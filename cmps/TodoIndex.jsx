const { useEffect } = React

const { useSelector, useDispatch } = ReactRedux

import { teamsService } from "../services/teams.service.js"
import { TodoList } from "./TodoList.jsx"

import { addTeam, removeTeam, saveTeam } from "../store/actions/teams.action.js"
import { SET_TEAMS, SET_FILTER_BY, UPDATE_TEAM } from "../store/reducers/teams.reducer.js"
import { TodoFilter } from "./TodoFilter.jsx"

export function TodoIndex() {
  const dispatch = useDispatch()
  // TEAM: move to storeState
  const filterBy = useSelector(storeState => storeState.teamModule.filterBy)
  const teams = useSelector((storeState) => storeState.teamModule.teams)

  useEffect(() => {
    teamsService
      .query(filterBy)
      // TEAM: use dispatch
      .then((teams) => {
        dispatch({ type: SET_TEAMS, teams })
      })
  }, [filterBy])

  function onRemoveMember(memberId) {
    // teamsService.removeMember(teams[0]._id,memberId)
    removeTeam(teams[0]._id, memberId)
      .then(() => {
        console.log("todo is gone")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onAddMember() {
    const todoToSave = teamsService.getEmptyTeamMember()
    addTeam(todoToSave)
      .then(() => {
        console.log("todo is here")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section>
      {/* <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
      <TodoList
        teams={teams}
        // confirmChange={changeTodoConfirm}
        onRemoveMember={onRemoveMember}
        onAddMember={onAddMember}
      />
    </section>
  )
}
