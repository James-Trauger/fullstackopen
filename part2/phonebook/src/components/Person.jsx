import DeleteButton from "./DeleteButton"

const Person = ({person, deleteHandler}) => {
    return (
        <div>
            <p>{person.name} {person.number}</p>
            {<DeleteButton onSubmit={deleteHandler}/>}
        </div>
    )
}

export default Person