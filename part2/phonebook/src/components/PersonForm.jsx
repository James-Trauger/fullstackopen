import Input from "./Input"

const PersonForm = ({onSubmit, nameInput, numberInput}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input label='name' value={nameInput.value} onChange={nameInput.handler}/>
            <Input label='number' value={numberInput.value} onChange={numberInput.handler}/>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm