import React, { useState, useEffect } from "react";
import httpRequest from "../functions/httpRequest";
import TaskInput from "../components/TaskInput";

const TasksScreen = () => {
  const [admin, setAdmin] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<{ _id; taskName }> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token: string | null = localStorage.getItem("jwt");

  //fetching all tasks repeat after every action in case needed
  const getTasks = async (): Promise<void> => {
    try {
      const response = await httpRequest(
        "get",
        "http://localhost:5000/tasks/gettasks"
      );
      setTasks(response.data.task);
      setAdmin(response.data.admin);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //getting tasks
  useEffect(() => {
    getTasks();
  }, []);

  //add note
  const addNote = async (): Promise<void> => {
    try {
      setLoading(true);
      await httpRequest("post", "http://localhost:5000/tasks/create");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"tasksContainer"}>
      <div className={"background"}></div>
      {!loading ? (
        <React.Fragment>
          {admin ? (
            <h1 className={"header"}>Hey mate you are an admin!</h1>
          ) : (
            <h1 className={"header"}>Hello a totally regular user :)</h1>
          )}
          {tasks
            ? tasks.map((task) => (
                <TaskInput
                  token={token}
                  loading={() => setLoading(true)}
                  key={task._id}
                  task={task}
                  getTasks={getTasks}
                />
              ))
            : null}
          <input
            className={"addButton"}
            onClick={addNote}
            type={"button"}
            value={" + "}
          />
        </React.Fragment>
      ) : (
        <div className="lds-dual-ring"></div>
      )}
    </div>
  );
};

export default TasksScreen;
