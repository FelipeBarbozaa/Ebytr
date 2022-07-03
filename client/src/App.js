import React, { useEffect, useState } from 'react';

const axios = require('axios').default;

const instance = axios.create({ baseURL: 'http://localhost:3001' });

function App() {
  const [inputTask, setInputTask] = useState('');
  const [task, setTask] = useState([]);

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
  };

  useEffect(() => {
    getTask();
  }, [task]);

  return (
    <div>
      <form type="submit">
        <input value={inputTask} onChange={updateInputTask} type="text" placeholder="Add your new task" />
        <button onClick={createTask} type="button">Create</button>
      </form>
      {task.map((e) => (
        <h1 key={e.id}>{e.name}</h1>
      ))}
    </div>
  );
}

export default App;
