import './QueueComponents.css'

const UsernameForm = (props) => {

    return (
        <div>
            <form>
                <input
                className="UsernameForm"
                placeholder="Enter a Username"
                maxLength={20}
                onChange={(e) => props.setUsername(e.target.value)}
                >
                </input>
                <h1 className='FiltersHeader'>
                    Filters 
                </h1>
                <h2 className='Subfilters'>
                    Game Size : 8
                </h2>
            </form>
        </div>
    )
}

export { UsernameForm }