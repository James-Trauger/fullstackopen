import TextField from './TextField'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, changeUsername, changePassword, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <TextField
          label="username"
          type="text"
          value={username}
          name="Username"
          handler={changeUsername}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          handler={changePassword}
        />
        <button type="submit">login</button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm