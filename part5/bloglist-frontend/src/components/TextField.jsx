const TextField = ({ label, type, name, value, handler }) => {

    return (
        <div>
        {label}
        <input
            type={type}
            name={name}
            value={value}
            onChange={handler}
        />
        </div>
    )
}

export default TextField