import TextField from "./TextField"

const LoginForm = ({username, password, changeUsername, changePassword, handleLogin}) => {
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
    )
}

export default LoginForm