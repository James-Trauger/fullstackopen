const TextField = ({ label, type, name, value, handler }) => {
    const changeField = ({target}) => handler(target.value)
    return (
        <div>
        {label}
        <input
            type={type}
            name={name}
            value={value}
            onChange={changeField}
        />
        </div>
    )
}

export default TextField