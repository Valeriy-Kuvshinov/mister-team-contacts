
const { Link } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

import { TodoPreview } from "./TodoPreview.jsx"
import { teamsService } from "../services/teams.service.js"
import {memberService} from "../services/member.service.js"
import { store } from "../store/store.js"
import { ADD_TEAM } from "../store/reducers/teams.reducer.js"

export function TodoList({teams, confirmChange, onAddMember, onRemoveMember}){
   const dispatch = useDispatch()
   if(teams.length===0){
     return(<section>
            <ul className='todo-list'>
               <li key='bread' className="todo">no teams:</li>
            </ul>
          </section>)
    }
    
    console.log('teams',teams[0].teamMembers)
    function addMember(){
      const newMember=teamsService.getEmptyTeamMember()
      console.log(newMember)
      teamsService.addMember(teams[0]._id,newMember)
        .then((savedMember) => {
            store.dispatch({ type: ADD_TEAM, todo: savedMember })
            // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

        })
        .catch(err => {
            console.log('Cannot add todo', err)
            // showErrorMsg('Cannot add todo')
        })
    }

    return (<section>
             <ul className='todo-list'>
                <li key='bread' className="todo">{teams[0].teamName}</li>
                {teams[0].teamMembers.map((member)=>
                <li key={member._id}>
                <TodoPreview teamId={teams[0]._id} member={member} confirmChange={confirmChange} onRemoveMember={onRemoveMember}/>
                </li>)}
                <button onClick={addMember}>
                     add Member
                </button>
             </ul>
           </section>)
}