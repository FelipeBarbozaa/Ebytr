import React, { useState } from 'react';
import PropTypes from 'prop-types';
import instance from '../api/api';

export default function CreateTask(props) {
  const { callback, setCallback } = props;
  const [inputTask, setInputTask] = useState('');

  // Cria uma tarefa
  const createTask = async () => {
    await instance({
      method: 'post',
      data: { name: inputTask },
    });
    setInputTask('');
    setCallback(callback + 1);
  };

  return (
    <form type="submit">
      <input value={inputTask} onChange={(e) => setInputTask(e.target.value)} type="text" placeholder="Add your new task" />
      <button onClick={createTask} type="button">Create</button>
    </form>
  );
}

CreateTask.propTypes = {
  callback: PropTypes.number.isRequired,
  setCallback: PropTypes.func.isRequired,
};
