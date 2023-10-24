import { create } from "zustand";

const store = (set) => ({
  tasks: [{ title: "Test task", state: "PLANNED" }],
});

export const useStore = create(store);
