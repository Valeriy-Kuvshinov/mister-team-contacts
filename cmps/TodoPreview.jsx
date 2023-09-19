const { Link } = ReactRouterDOM

export function TodoPreview({teamId,member,onRemoveTeam}){

    function removeTeam(){
        onRemoveTeam(member._id)
    }
    
    return (
              <section className='todo'>
                <span className={(member.isCompleted===true)?'completed member-link':'member-link'}>
                    <Link to={`/team/details/${teamId}/${member._id}`} className='member'>
                    <div>{member.name}</div>
                    <div>{member.email}</div>
                    <div>{member.phoneNumber}</div>
                    </Link>
                </span>
                <button onClick={removeTeam}>X</button>
              </section>
    )
}