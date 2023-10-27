import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  // Initial store values
  tasks: [{ title: "Test task", state: "DONE" }],
  draggedTask: null,

  // Actions
  addTask: (title, state) =>
    set(
      (store) => ({ tasks: [...store.tasks, { title, state }] }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set(
      (store) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      }),
      false,
      "deleteTask"
    ),

  // set draggedTask
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      }),
      false,
      "moveTask"
    ),
});

export const useStore = create(
  persist(devtools(store), { name: "kanban-store" })
);
