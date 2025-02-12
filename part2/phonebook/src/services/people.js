import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(response => response.data)
}

const deletePerson = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data)
}

const replaceNumber = newPerson => {
    const req = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
    return req.then(response => response.data)
}

export default { getAll, create, deletePerson, replaceNumber }