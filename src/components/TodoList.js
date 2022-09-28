import { useState } from 'react'

const TodoList = props => {

    const [listItems, setListItems] = useState([])

    const handleForm = (e) => {
        e.preventDefault()

        if (e.target.todo_item.value.length < 1) {
            return 0
        }

        let payload = {
            newItem : e.target.todo_item.value,
            state : false
        }

        e.target.todo_item.value = ''

        setListItems([...listItems, payload])
    }

    const checkbox = (e, index) => {
        // we don't want to mutate data directly, so we'll copy everything.
        let copyOfState = [...listItems]
        // copy the specific object
        let copyOfObject = copyOfState[index]
        // change the state value of the copy.
        copyOfObject.state = e.target.checked
        // update this in the copy of the state.
        copyOfState[index] = copyOfObject

        // lastly, update the state! :D
        setListItems(copyOfState)
    }

    const remove = (e, index) => {
        // same as above, copy state.
        let copyOfState = [...listItems]
        copyOfState.splice(index, 1)

        // update state.
        setListItems(copyOfState)
    }

    return (
        <>
          <form onSubmit={ handleForm }>
            <input type="text" name="todo_item" placeholder="New Item..."/>
            <input type="submit" value="Add Item"/>
          </form>
          {
              listItems.map( (item, index) =>
              <div className='todoContainer' key={index} >
                {
                    item.state ?
                      <p className='todoItem' style={{ textDecoration: 'line-through'}}>{ item.newItem }</p> :
                      <p className='todoItem'>{ item.newItem }</p>
                }
                <input className='todoCB' type="checkbox" value={ item.state } onChange={ (e) => checkbox(e, index) }/>
                <button onClick={ (e) => remove(e, index) }>Remove</button>
              </div>
            )
          }
        </>
    )
}

export default TodoList