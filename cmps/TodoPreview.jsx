const { Link } = ReactRouterDOM

export function TodoPreview({member,onRemoveTeam}){

    // function confirmTodo(){
    //     confirmChange(todo._id,!todo.isCompleted)
    // }
    function removeTeam(){
        onRemoveTeam(member._id)
    }

    return (
              <section className='todo'>
                {/* <button id={todo._id} onClick={confirmTodo}
                className={(todo.isCompleted===true)?'marked preview':'preview'}>
                    {(todo.isCompleted===false)?<i className="fa-regular fa-circle"></i>
                    :<i className="fa-regular fa-circle-check"></i>}
                </button> */}
                <span className={(member.isCompleted===true)?'completed':''}>
                    <Link to={`/todo/details/${member._id}`}>
                    {member.title}
                    </Link>
                </span>
                <button onClick={removeTeam}>X</button>
              </section>
    )
}