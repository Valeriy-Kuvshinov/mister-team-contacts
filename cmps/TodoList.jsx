
const { Link } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux

import { TodoPreview } from "./TodoPreview.jsx"
import { todoService } from "../services/todo.service.js"
import { store } from "../store/store.js"
import { ADD_TODO } from "../store/reducers/todo.reducer.js"

export function TodoList({todos, confirmChange, onAddTodo, onRemoveTodo}){
   const dispatch = useDispatch()

    if(todos.length===0){
        return(<section>
            <ul className='todo-list'>
               <li key='bread' className="todo">no todos:</li>
            </ul>
          </section>)
    }

    function addTodo(){
      const newTodo=todoService.getEmptyTodo()
      todoService.save(newTodo)
        .then((savedTodo) => {
            store.dispatch({ type: ADD_TODO, todo: savedTodo })
            // showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

        })
        .catch(err => {
            console.log('Cannot add todo', err)
            // showErrorMsg('Cannot add todo')
        })
    }

    return (<section>
             <ul className='todo-list'>
                <li key='bread' className="todo">todos:</li>
                {todos.map((todo)=>
                <li key={todo._id}>
                <TodoPreview todo={todo} confirmChange={confirmChange} onRemoveTodo={onRemoveTodo}/>
                </li>)}
                <button onClick={addTodo}>
                     add Todo
                </button>
             </ul>
           </section>)
}