import React, { useState } from "react";
import httpRequest from "../functions/httpRequest";
import { TaskInputProps } from "../types";

const TaskInput = (props): React.FunctionComponentElement<TaskInputProps> => {
  const [taskValue, setTaskValue] = useState<string>(props.task.taskName);

  const handleChange = async (data: any): Promise<void> => {
    try {
      const words: string = data.target.value;
      setTaskValue(words);
      await httpRequest("put", "http://localhost:5000/tasks/edit", {
        taskName: words,
        _id: props.task._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      props.loading();
      await httpRequest(
        "delete",
        `http://localhost:5000/tasks/${props.task._id}`
      );
      props.getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        className={"taskInput"}
        value={taskValue}
        type={"text"}
        onChange={handleChange}
        spellCheck={false}
      />
      <button className={"garbage"} onClick={handleDelete}>
        &#x1F5D1;
      </button>
    </div>
  );
};

export default TaskInput;
