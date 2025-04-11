import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUserInfo } from '../reducers/userInfoReducer'
import User from './User'

const UserList = () => {
  const users = useSelector(({ notification, user, blogs, userInfo }) => userInfo)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
