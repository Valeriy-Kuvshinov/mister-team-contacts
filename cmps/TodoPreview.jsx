const { Link } = ReactRouterDOM

export function TodoPreview({todo,confirmChange,onRemoveTodo}){

    function confirmTodo(){
        confirmChange(todo._id,!todo.isCompleted)
    }
    function removeTodo(){
        onRemoveTodo(todo._id)
    }

    return (
              <section className='todo'>
                <button id={todo._id} onClick={confirmTodo}
                className={(todo.isCompleted===true)?'marked preview':'preview'}>
                    {(todo.isCompleted===false)?<i className="fa-regular fa-circle"></i>
                    :<i className="fa-regular fa-circle-check"></i>}
                </button>
                <span className={(todo.isCompleted===true)?'completed':''}>
                    <Link to={`/todo/details/${todo._id}`}>
                    {todo.title}
                    </Link>
                </span>
                <button onClick={removeTodo}>X</button>
              </section>
    )
}