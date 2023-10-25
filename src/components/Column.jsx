import { useState } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className="column"
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDrop={() => {
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
