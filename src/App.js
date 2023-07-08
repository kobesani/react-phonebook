import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()

    if (
      persons
      .filter((person) => person.name === newName)
      .length > 0
    ) {
      console.log(`${newName} already in list`)
      return (false)
    }

    setPersons(
      persons.concat(
        {
          id: persons.length + 1,
          name: newName,
        }
      )
    )
    setNewName("")
    return (true)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App
