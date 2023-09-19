
const { Link } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

import { TodoPreview } from "./TodoPreview.jsx"
import { teamsService } from "../services/teams.service.js"
import { store } from "../store/store.js"
import { ADD_TEAM } from "../store/reducers/teams.reducer.js"

export function TodoList({teams, confirmChange, onAddTodo, onRemoveTodo}){
   const dispatch = useDispatch()
   if(teams.length===0){
     return(<section>
            <ul className='todo-list'>
               <li key='bread' className="todo">no teams:</li>
            </ul>
          </section>)
    }
    
    console.log('teams',teams[0].teamMembers)
    function addTodo(){
      const newTodo=teamsService.getEmptyTodo()
      teamsService.save(newTodo)
        .then((savedTodo) => {
            store.dispatch({ type: ADD_TEAM, todo: savedTodo })
            // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

        })
        .catch(err => {
            console.log('Cannot add todo', err)
            // showErrorMsg('Cannot add todo')
        })
    }

    return (<section>
             <ul className='todo-list'>
                <li key='bread' className="todo">teams:</li>
                {teams[0].teamMembers.map((member)=>
                <li key={member._id}>
                <TodoPreview member={member} confirmChange={confirmChange} onRemoveTodo={onRemoveTodo}/>
                </li>)}
                <button onClick={addTodo}>
                     add Todo
                </button>
             </ul>
           </section>)
}