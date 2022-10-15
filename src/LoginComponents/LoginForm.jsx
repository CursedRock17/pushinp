import './QueueComponents.css'

const LoginForm = (props) => {

    return (
        <div className='FillingSpace'>
            <h1 className='FiltersHeader'>
                Choose a Username to enter with
            </h1>
            <form>
                <input
                className="UsernameForm"
                placeholder="Enter a Username"
                maxLength={20}
                onChange={(e) => props.setUsername(e.target.value)}
                >
                </input>
            </form>
            <h1 className='FiltersHeader'>
                Now choose the subject that you need help with
            </h1>
            <select
                className="UsernameForm"
                onChange={(e) => props.setCategory(e.target.value)}
            >
                <option value="Calculus"> Calculus </option>
                <option value="Physics Mechanics"> Physics_Mechanics </option>
                <option value="English Lang"> English_Lang </option>
                <option value="English Lit"> English_Lit </option>
                <option value="Basic Programming"> Basic_Programming </option>
                <option value="Linear Algebra"> Linear_Algebra </option>
                <option value="Chemistry"> Chemistry </option>
                <option value="World History"> World_History </option>
            </select>
        </div>
    )
}

export { LoginForm }