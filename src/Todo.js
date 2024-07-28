import {
  Button
} from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Todo() {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const localStorageData = localStorage.getItem("todoList");
    if (localStorageData === null) return [];
    return JSON.parse(localStorageData);
  });
  const [isError, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodoToList = (e) => {
    e.preventDefault();
    if (todoItem === '') return
    const isDuplicate = todoList?.some(item => item.name === todoItem);
    if (isDuplicate) {
      setError(true);
      return
    }
    setTodoList(currentTodo => {
      return [...currentTodo, { 'id': crypto.randomUUID(), 'name': todoItem, 'isCompleted': false }]
    })
    setError(false);
    setTodoItem('');
  }

  const markTodoAsCompleted = (id, value) => {
    setTodoList(todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, isCompleted: value};
      }
      return todo;
    }))
  }

  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    <div className='container'>
      <hr></hr>
      <h2>Todo Application</h2>
      <form onSubmit={addTodoToList}>
        <div className='row'>
          <div className='col-6'>
            <input type='text' value={todoItem} onChange={event => setTodoItem(event.target.value)} className='form-control' placeholder='Add Todo'></input>
            <div className='help-block'>
              {isError ? <p className='text-danger'>Duplicate Todo</p> : null}
            </div>
          </div>
          <div className='col-3'>
            <Button type='submit' className='btn' variant="primary">Add</Button>
          </div>
        </div>
      </form>
      <div className='row'>
        <div className='col-6'>
          <hr></hr>
          <h2>Todo list: </h2>
          <ul className="list-group">
            {todoList.length === 0 && "No Todo's added yet!"}
            {todoList.map(todo => {
              return (
                <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id={todo.id} checked={todo.isCompleted} onChange={e => markTodoAsCompleted(todo.id, e.target.checked)} />
                    <label className="form-check-label" htmlFor={todo.id}>
                      {todo.name}
                    </label>
                  </div>
                  <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </li>
              )
            })}
          </ul>
          <hr></hr>
          <h2>Done list: </h2>
          {todoList.some(todo => todo.isCompleted) || "No Todo's are done yet!"}
          <ul className="list-group">
            {todoList?.map(todo => {
              if (todo.isCompleted) {
                return (
                  <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id={todo.id} checked="true" disabled />
                      <label className="form-check-label" htmlFor={todo.id}>
                        {todo.name}
                      </label>
                    </div>
                  </li>
                )
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}