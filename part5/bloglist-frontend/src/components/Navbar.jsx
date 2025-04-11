import { Link, useLocation } from 'react-router-dom'
import Logout from './Logout'
import style from './style'

const Navbar = ({ user, userKey }) => {
  const path = useLocation().pathname
  const navStyle = {
    container: {},
    ul: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      blockSize: '100%',
    },
    li: {
      display: 'inline-block',
      padding: '0.5rem',
      marginRight: 5,
      float: 'left',
      color: 'white',
    },
  }

  return (
    <div style={navStyle.container}>
      <ul style={navStyle.ul}>
        <li
          style={{ ...navStyle.li, backgroundColor: path === '/' ? style.color.active : style.color.backgroundColor }}
        >
          <Link style={style.link} to="/">
            blogs
          </Link>
        </li>
        <li
          style={{
            ...navStyle.li,
            backgroundColor: path === '/users' ? style.color.active : style.color.backgroundColor,
          }}
        >
          <Link style={style.link} to="/users">
            users
          </Link>
        </li>
        <li style={navStyle.li}>{user.name} logged in</li>
        <li style={navStyle.li}>
          <Logout userKey={userKey} />
        </li>
      </ul>
    </div>
  )
}

export default Navbar
