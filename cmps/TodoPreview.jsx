const { Link } = ReactRouterDOM

export function TodoPreview({ teamId, member, onRemoveMember }) {

    function removeMember() {
        // console.log(teamId,' ',member._id)
        onRemoveMember(teamId, member._id);
    }

    return (
        <section className='member-preview'>
            <span className={(member.isCompleted === true) ? 'completed member-link' : 'member-link'}>
                <Link to={`/team/details/${teamId}/${member._id}`} className='member-info'>
                    <div className="member-name">{member.name}</div>
                    <div className="member-email">{member.email}</div>
                    <div className="member-phone">{member.phoneNumber}</div>
                </Link>
            </span>
            <button className="remove-button" onClick={removeMember}>X</button>
        </section>
    )
}