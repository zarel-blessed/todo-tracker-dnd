import { useState, useRef, useEffect, FormEvent, useContext } from "react";
import { Todo, todosContext } from "./TodoListContainer";

const colors = ["#BDECB9", "#FDCCFB", "#CEDCFF", "#F3E6B9", "#D6BEE9", "#E9BEBE"];
const pickRandom = (array: string[]) => array[Math.floor(Math.random() * (array.length - 1))];

const TodoEntryBox = () => {
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { todos, setTodos } = useContext(todosContext);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo === "") return;
    const newTodoList: Todo[] = [...todos, { _id: Date.now(), task: newTodo, bg: pickRandom(colors), isCompleted: false }];
    localStorage.setItem("todos", JSON.stringify(newTodoList));
    setTodos(newTodoList);
    setNewTodo("");
  }

  return (
    <section className="w-full">
      <form onSubmit={handleAddTodo} className="flex gap-4 w-full">
        <input type="text" placeholder="Enter a new todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} ref={inputRef} className="flex-1 bg-purple-200 py-2 px-8 text-zinc-800 placeholder:text-zinc-800 outline-none rounded-md" />
        <input type="submit" value="Add" className="bg-zinc-500 text-zinc-100 w-40 py-2 px-3 outline-none rounded-md" />
      </form>
    </section>
  );
}

export default TodoEntryBox;
