import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import useHttp from "./Hooks/useHttp";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const processData = (data) => {
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: data[taskKey].id, text: data[taskKey].title });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: "https://jsonplaceholder.typicode.com/todos" },
      processData
    );
  }, [fetchTasks]);

  return (
    <React.Fragment>
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
