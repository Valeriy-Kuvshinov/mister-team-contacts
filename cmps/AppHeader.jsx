const { useEffect, useState, useRef} = React

const { useSelector, useDispatch } = ReactRedux

import { SET_TEAMS } from "../store/reducers/teams.reducer.js"

import { teamsService } from "../services/teams.service.js"

export function AppHeader(){

    var [progress,setProgress]=useState('')
    const dispatch = useDispatch()
    const teams = useSelector(storeState => storeState.teamModule.teams)
    // console.log('teams',teams)

    useEffect(() => {
        teamsService.query()
            .then(teams => {
                dispatch({ type: SET_TEAMS, teams })
            })
    }, [progress])

    var howManyCompleted=0
    for(var i=0;i<teams.length;i++){
        if(teams[i].isCompleted===true) howManyCompleted++
    }
    progress=`${parseInt((howManyCompleted/teams.length)*100)}%`

    function showProgress(){
        document.querySelector('.progress').style.width=progress

        document.querySelector('.progress').innerText=progress
        if(progress==='100%') console.log('all done')
        if(progress==='NaN%') document.querySelector('.progress').innerText='no teams'
    }

    setTimeout(showProgress,10)

    return (<section className="todo-header">
        sup?
        {/* <button onClick={showProgress}>progress</button> */}
        <div className="progress-bar">
            <div className="progress">

            </div>
        </div>
    </section>)
}