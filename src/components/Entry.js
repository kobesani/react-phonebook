const Entry = ({ person, clickHandler }) => {
  return (
    <>
      <li>
        {person.name} {person.number} 
        <button onClick={clickHandler}>delete</button>
      </li>
    </>
  )
}

export default Entry
