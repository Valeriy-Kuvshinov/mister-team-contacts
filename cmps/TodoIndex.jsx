const { useEffect } = React

const { useSelector, useDispatch } = ReactRedux

import { todoService } from "../services/todo.service.js"
import { TodoList } from "./TodoList.jsx"
import { AppHeader } from "./AppHeader.jsx"

import { addTodo, removeTodo, saveTodo } from "../store/actions/todo.action.js"
import { SET_TEAMS,SET_FILTER_BY,UPDATE_TEAM } from "../store/reducers/todo.reducer.js"
import { TodoFilter } from "./TodoFilter.jsx"

export function TodoIndex() {
  const dispatch = useDispatch()
  // TEAM: move to storeState
  const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
  const todos = useSelector((storeState) => storeState.todoModule.todos)

  useEffect(() => {
    todoService
    .query(filterBy)
      // TEAM: use dispatch
      .then((todos) => {
        dispatch({ type: SET_TEAMS, todos })
      })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => {
        console.log("todo is gone")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onAddTodo() {
    const todoToSave = todoService.getEmptyTodo()
    addTodo(todoToSave)
      .then(() => {
        console.log("todo is here")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function changeTodoConfirm(todoId) {
    var todo = todos.find((todo) => todo._id === todoId)
    todo.isCompleted = !todo.isCompleted
    const newTodo = { ...todo }
    todoService.save(newTodo).then(() => {
      dispatch({ type: UPDATE_TEAM, todo: newTodo })
    })
  }

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  return (
    <section>
      <AppHeader />
      <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <TodoList
        todos={todos}
        confirmChange={changeTodoConfirm}
        onRemoveTodo={onRemoveTodo}
        onAddTodo={onAddTodo}
      />
    </section>
  )
}
