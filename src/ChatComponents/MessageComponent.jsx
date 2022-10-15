import "./chat.css"

const MessageComponent = (props) => {
    return (
        <div className="MessageBox">
            <h1 className="NameHeader">
                {props.username}
            </h1>
            <p className="MessageClass">
                {props.message}
            </p>
        </div>
    )
}

export { MessageComponent }