const { useEffect } = React

const { useSelector, useDispatch } = ReactRedux

import { teamsService } from "../services/teams.service.js"
import { TodoList } from "./TodoList.jsx"
import { AppHeader } from "./AppHeader.jsx"

import { addTeam, removeTeam, saveTeam } from "../store/actions/teams.action.js"
import { SET_TEAMS,SET_FILTER_BY,UPDATE_TEAM } from "../store/reducers/teams.reducer.js"
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

  function onRemoveTeam(todoId) {
    removeTeam(todoId)
      .then(() => {
        console.log("todo is gone")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onAddTeam() {
    const todoToSave = teamsService.getEmptyTeam()
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
      <AppHeader />
      {/* <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
      <TodoList
        teams={teams}
        // confirmChange={changeTodoConfirm}
        onRemoveTeam={onRemoveTeam}
        onAddTeam={onAddTeam}
      />
    </section>
  )
}
