const { useEffect, useState, useRef} = React

const { useSelector, useDispatch } = ReactRedux

import { SET_TEAMS } from "../store/reducers/teams.reducer.js"

import { teamsService } from "../services/teams.service.js"

export function AppHeader(){

    var [progress,setProgress]=useState('')
    const dispatch = useDispatch()
    const teams = useSelector(storeState => storeState.teamModule.teams)
    // console.log('teams',teams)

    // useEffect(() => {
    //     teamsService.query()
    //         .then(teams => {
    //             dispatch({ type: SET_TEAMS, teams })
    //         })
    // }, [progress])

    return (<section className="todo-header">
        sup?
    </section>)
}