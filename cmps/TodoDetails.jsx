const { useEffect} = React

const { useSelector, useDispatch } = ReactRedux

const { useParams } = ReactRouterDOM

import { SET_TEAMS } from "../store/store.js"

import { todoService } from "../services/todo.service.js"

import { UPDATE_TEAM } from "../store/reducers/todo.reducer.js"

export function TodoDetails(){

    const dispatch = useDispatch()
    const params = useParams()
    const todos = useSelector(storeState => storeState.todoModule.todos)

    useEffect(() => {
        todoService.query()
            // TEAM: use dispatch
            .then(todos => {
                dispatch({ type: SET_TEAMS, todos })
            })
    }, [])

    const todo=todos.find((todo)=>todo._id===params.todoId)
    if(todo===undefined)return

    // console.log(document.getElementById('title'))
    // document.getElementById('task').value=todo.subject

    function showDetails(){
        document.getElementById('title').value=todo.title
        document.getElementById('subject').value=todo.subject
        document.getElementById('createdAt').innerText=todo.createdAt
        document.getElementById('isCompleted').checked=todo.isCompleted
    }
    
    function changeTodo(){
        todo.title=document.getElementById('title').value
        todo.subject=document.getElementById('subject').value
        todo.createdAt=document.getElementById('createdAt').innerText
        todo.isCompleted=document.getElementById('isCompleted').checked
        console.log('changed')
        // console.log(todo)
        const newTodo={...todo}
        todoService.save(newTodo)
        .then(()=>{
        dispatch({type:UPDATE_TEAM, todo: newTodo})})
    }

    // showDetails()
    setTimeout(showDetails,10)

    return (<section className='todo-details'>
               <input type='text' id='title' name='title' placeholder='title' onChange={changeTodo}/>
               <input type='text' id='subject' name='subject' placeholder="subject" onChange={changeTodo}/>
               <span id='createdAt'>1</span>
               <div>
               is completed?<input type='checkbox' id='isCompleted' name='isCompleted' onChange={changeTodo}/>
               </div>
               {/* <button onClick={showDetails}>details</button> */}
            </section>)
}