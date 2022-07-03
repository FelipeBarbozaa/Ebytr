import React, { useState } from 'react';

function App() {
  const [task, setTask] = useState();

  return (
    <form type="submit">
      <input type="text" placeholder="Add your new task" />
      <button type="button">Create</button>
    </form>
  );
}

export default App;
