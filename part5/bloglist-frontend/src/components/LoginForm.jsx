import PropTypes from 'prop-types'

const LoginForm = ({ username, password, changeUsername, changePassword, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            value={username}
            name="Username"
            onChange={({ target }) => changeUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            value={password}
            name='Password'
            type='password'
            onChange={({ target }) => changePassword(target.value)}
          />
        </div>
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