import React, { useEffect, useState } from 'react';
import instance from './api/api';
import CreateTask from './components/CreateTask';

function App() {
  const [task, setTask] = useState([]);
  const [editTask, setEditTask] = useState('');
  const [edit, setEdit] = useState(false);
  const [callback, setCallback] = useState(0);

  // Pega todas as tarefas
  const getTask = async () => {
    const result = await instance.get('/')
      .then(({ data }) => setTask(data));
    return result;
  };

  const deleteTask = async ({ target: { value } }) => {
    await instance({
      method: 'delete',
      data: { id: value },
    });
    setCallback(callback + 1);
  };

  const changeStatus = async ({ target }) => {
    await instance({
      method: 'put',
      data: { status: target.value, id: target.id },
    });
    setCallback(callback + 1);
  };

  const enableTask = ({ target: { value } }) => {
    setEdit(true);
    setEditTask(value);
  };

  const changeTaskName = async ({ target }) => {
    await instance({
      method: 'put',
      url: '/name',
      data: { name: target.value, id: target.id },
    });
    setEdit(false);
    setCallback(callback + 1);
  };

  useEffect(() => {
    getTask();
  }, [callback], [edit]);

  const table = {
    0: 'pendente',
    1: 'em andamento',
    2: 'concluido',
  };

  const options = [0, 1, 2];
  return (
    <div>
      <CreateTask callback={callback} setCallback={setCallback} />
      {task.map((e) => (
        <div key={e.id}>
          { edit
            ? (
              <div>
                <input value={editTask} onChange={(input) => setEditTask(input.target.value)} type="text" />
                <button id={e.id} value={editTask} onClick={changeTaskName} type="button">Change</button>
              </div>
            ) : (
              <div>
                <h1>{e.name}</h1>
                <button value={e.name} onClick={enableTask} type="button">Edit</button>
              </div>
            ) }
          <button value={e.id} type="button" onClick={deleteTask}>Delete</button>
          <select onChange={changeStatus} id={e.id} name="status">
            {options.map((option) => (
              option === e.status
                ? <option key={option} selected>{table[option]}</option>
                : <option key={option}>{table[option]}</option>
            ))}
          </select>

        </div>
      ))}
    </div>
  );
}

export default App;
