const { useState, useEffect, useRef } = React

import { teamsService } from "../services/todo.service.js"
import { utilService } from "../services/util.service.js"


export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className="todo-filter full main-layout">
            <h2>Todos Filter</h2>
            <form >
                <label htmlFor="title">Title:</label>
                <input type="text"
                    id="title"
                    name="title"
                    placeholder="By title"
                    value={filterByToEdit.title}
                    onChange={handleChange}
                />

                <label htmlFor="subject">Subject:</label>
                <input type="text"
                    id="subject"
                    name="subject"
                    placeholder="By subject"
                    value={filterByToEdit.subject}
                    onChange={handleChange}
                />

            </form>

        </section>
    )
}