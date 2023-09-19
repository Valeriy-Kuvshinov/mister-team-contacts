const { useEffect, useState, useRef} = React

const { useSelector, useDispatch } = ReactRedux

import { SET_TEAMS } from "../store/reducers/todo.reducer.js"

import { todoService } from "../services/todo.service.js"

export function AppHeader(){

    var [progress,setProgress]=useState('')
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todoModule.todos)

    useEffect(() => {
        todoService.query()
            .then(todos => {
                dispatch({ type: SET_TEAMS, todos })
            })
    }, [progress])

    var howManyCompleted=0
    for(var i=0;i<todos.length;i++){
        if(todos[i].isCompleted===true) howManyCompleted++
    }
    progress=`${parseInt((howManyCompleted/todos.length)*100)}%`

    function showProgress(){
        document.querySelector('.progress').style.width=progress

        document.querySelector('.progress').innerText=progress
        if(progress==='100%') console.log('all done')
        if(progress==='NaN%') document.querySelector('.progress').innerText='no todos'
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