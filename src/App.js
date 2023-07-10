import { useEffect, useState } from 'react'

import phonebookServices from './services/phonebook'

const App = (props) => {
  const attributes = ["name", "number"]
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newEntry, setNewEntry] = useState({name: "", number: ""})
  const [searchTerm, setSearchTerm] = useState("")

  const hook = () => {
    phonebookServices
      .getAllEntries()
      .then(
        entries => {
          setPersons(entries)
          setFilteredPersons(entries)
        }
      )
  }
  useEffect(hook, [])

  console.log(
    "render",
    persons.length,
    "persons",
    filteredPersons.length,
    "filteredPersons"
  )

  const handleChange = (valueToChange) => {
    if (
      attributes.filter(
        (attribute) => attribute === valueToChange).length === 0
    ) {
      throw new Error(`${valueToChange} is not in ${attributes}`)
    }
    console.log(valueToChange)
    return (
      (event) => setNewEntry(
        existingValues => (
          {
            ...existingValues,
            [valueToChange]: event.target.value
          }
        )
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

    phonebookServices
      .createEntry(newEntry)
      .then(
        returnedEntry => {
          console.log(returnedEntry)
          setPersons([...persons, returnedEntry])

          if (
            returnedEntry
              .name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            setFilteredPersons([...filteredPersons, returnedEntry])
          }

          setNewEntry({name: "", number: ""})
        }
      )

    return (true)
  }

  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookServices
        .deleteEntry(id)
        .then(result => console.log(`deleted ${id}: ${result}`))
      setPersons(persons.filter(person => person.id !== id))
      setFilteredPersons(filteredPersons.filter(person => person.id !== id))
    }
  }

  const handleSearchTermChange = (event) => {
    console.log(event.target.value.toLowerCase())
    setSearchTerm(event.target.value)

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
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <h2>Add a new entry</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newEntry.name} onChange={handleChange("name")} /><br/>
          number: <input value={newEntry.number} onChange={handleChange("number")} />
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
                <button onClick={() => deleteEntry(person.id, person.name)}>delete</button>
              </li>
          )
        }
      </ul>
    </div>
  )
}

export default App
