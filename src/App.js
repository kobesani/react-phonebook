import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [filteredPersons, setFilteredPersons] = useState(props.persons)
  const [newEntry, setNewEntry] = useState({name: "", number: ""})
  const [searchTerm, setSearchTerm] = useState("")

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewEntry(
      existingValues => (
        {
          ...existingValues,
          name: event.target.value
        }
      )
    )
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewEntry(
      existingValues => (
        {
          ...existingValues,
          number: event.target.value
        }
      )
    )
  }

  const addEntry = (event) => {
    event.preventDefault()

    if (
      persons
      .filter((person) => person.name === newEntry.name)
      .length > 0
    ) {
      console.log(`${newEntry.name} already in list`)
      window.alert(`${newEntry.name} is already in the phonebook!`)
      return (false)
    }

    setPersons(
      persons.concat(
        {
          id: persons.length + 1,
          name: newEntry.name,
          number: newEntry.number,
        }
      )
    )
    setNewEntry({name: "", number: ""})
    return (true)
  }

  const handleSearchTermChange = (event) => {
    console.log(event.target.value.toLowerCase())
    setSearchTerm(event.target.value)

    const filteredPersons = persons.filter(
      (person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    console.log(filteredPersons)
    // filtered persons is a subset of the phonebook entries
    setFilteredPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Filter</h2>
      <input value={searchTerm} onChange={handleSearchTermChange}/>
      <h2>Add a new entry</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newEntry.name} onChange={handleNameChange} /><br/>
          number: <input value={newEntry.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          filteredPersons.map(
            person =>
              <li key={person.id}>
                {person.name} {person.number}
              </li>
          )
        }
      </ul>
    </div>
  )
}

export default App
