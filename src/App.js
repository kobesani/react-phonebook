import { useEffect, useState } from 'react'

import phonebookServices from './services/phonebook'

const attributes = ["name", "number"]

const Notification = ({ message }) => {
  if (message === null) {
    return (null)
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newEntry, setNewEntry] = useState({name: "", number: ""})
  const [searchTerm, setSearchTerm] = useState("")
  const [statusMessage, setStatusMessage] = useState(null)

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

  const handleChange = (valueToChange) => {
    if (
      attributes.filter(
        (attribute) => attribute === valueToChange).length === 0
    ) {
      throw new Error(`${valueToChange} is not in ${attributes}`)
    }
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
    const match = persons.find(person => person.name === newEntry.name)

    if (match) {
      if (window.confirm(`${newEntry.name} is already in the phonebook, do you want to replace the number?`)) {
        phonebookServices
          .updateEntry(match.id, newEntry)
          .then(
            updatedEntry => {
              setPersons(persons.map(person => person.id !== updatedEntry.id ? person : updatedEntry))
              setFilteredPersons(
                filteredPersons.map(
                  person => person.name !== updatedEntry.name ? person : updatedEntry
                )
              )
              setStatusMessage(`${updatedEntry.name} updated in the phonebook`)
              setTimeout(
                () => {
                  setStatusMessage(null)
                }, 5000
              )
              setNewEntry({name: "", number: ""})
            }
          )
        }
      } else {
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
            setStatusMessage(`${returnedEntry.name} added to the phonebook`)
            setTimeout(
              () => {
                setStatusMessage(null)
              }, 5000
            )
            console.log(statusMessage)
            setNewEntry({name: "", number: ""})
          }
        )
      }
      console.log(statusMessage)
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
          person
            .name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} />
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
