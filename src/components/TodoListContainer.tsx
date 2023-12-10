import { useState, useEffect, createContext } from "react";

import TodoEntryBox from "./TodoEntryBox";
import Todos from "./Todos";

export type Todo = {
  _id: Date,
  task: string,
  bg: string,
  isCompleted: boolean,
}

export const todosContext = createContext<any>(null);

const TodoListContainer = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos") || "[]";
    setTodos(JSON.parse(storedTodos));
  }, []);

  return (
    <section className="flex flex-col gap-8 bg-purple-50 p-8 w-full max-w-3xl h-[86lvh] shadow shadow-purple-400 rounded-lg">
      <div className="flex flex-col">
        <span className="text-2xl text-purple-600">Hello, Jennifer!</span>
        <span className="text-3xl text-zinc-800">What's your plan for today?</span>
      </div>

      <todosContext.Provider value={{ todos, setTodos }}>
        <TodoEntryBox />
        <Todos />
      </todosContext.Provider>
    </section>
  );
}

export default TodoListContainer;
