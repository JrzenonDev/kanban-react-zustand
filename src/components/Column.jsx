import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

export default function Column({ state }) {
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);

  return (
    <div className="column">
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            addTask("New Task" + state, state);
          }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
    </div>
  );
}
