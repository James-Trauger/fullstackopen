import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, handler, testid }) => {
  const changeField = ({ target }) => handler(target.value)
  return (
    <div>
      {label}
      <input
        data-testid={testid}
        type={type}
        name={name}
        value={value}
        onChange={changeField}
      />
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}

export default TextField