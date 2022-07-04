import React, { useEffect, useState } from 'react';

const axios = require('axios').default;

const instance = axios.create({ baseURL: 'http://localhost:3001' });

function App() {
  const [inputTask, setInputTask] = useState('');
  const [task, setTask] = useState([]);
  // eslint-disable-next-line prefer-const
  let [callback, setCallback] = useState(0);

  // Pega todas as tarefas
  const getTask = async () => {
    const result = await instance.get('/')
      .then(({ data }) => setTask(data));
    return result;
  };

  const updateInputTask = ({ target: { value } }) => {
    setInputTask(value);
  };

  // Cria uma tarefa
  const createTask = async () => {
    await instance({
      method: 'post',
      data: { name: inputTask },
    });
    setInputTask('');
    setCallback(callback += 1);
  };

  const deleteTask = async ({ target: { value } }) => {
    await instance({
      method: 'delete',
      data: { id: value },
    });
    setCallback(callback += 1);
  };

  const changeStatus = async ({ target }) => {
    await instance({
      method: 'put',
      data: { status: target.value, id: target.id },
    });
    setCallback(callback += 1);
  };

  useEffect(() => {
    getTask();
  }, [callback]);

  const table = {
    0: 'pendente',
    1: 'em andamento',
    2: 'concluido',
  };

  const options = [0, 1, 2];
  return (
    <div>
      <form type="submit">
        <input value={inputTask} onChange={updateInputTask} type="text" placeholder="Add your new task" />
        <button onClick={createTask} type="button">Create</button>
      </form>
      {task.map((e) => (
        <div key={e.id}>
          <h1>{e.name}</h1>
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
