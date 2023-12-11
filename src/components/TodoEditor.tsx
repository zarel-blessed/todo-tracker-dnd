import { FormEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Todo, todosContext } from "./TodoListContainer";

const TodoEditor = ({ todo, setEditMode }:
  { todo: Todo, setEditMode: React.Dispatch<SetStateAction<boolean>> }) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo.task);
  const { todos, setTodos } = useContext(todosContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleTodoUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedTodoList = todos.map((storedTodo: Todo) => {
      if (storedTodo._id === todo._id) {
        return {
          ...storedTodo,
          task: updatedTodo,
        }
      }

      return storedTodo;
    });

    setTodos(updatedTodoList);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
    setEditMode(false);
  };

  return (
    <section className="edit-box">
      <form onSubmit={handleTodoUpdate} className="flex gap-4 w-full">
        <input
          type="text"
          placeholder="Enter a new todo..."
          value={updatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)}
          ref={inputRef}
          className="flex-1 bg-purple-200 py-2 px-8 text-zinc-800 placeholder:text-zinc-800 outline-none rounded-md" />

        <input
          type="submit"
          value="Update"
          className={`${updatedTodo.length ? "bg-purple-400" : "bg-zinc-500"} text-zinc-100 w-40 py-2 px-3 outline-none rounded-md`} />
      </form>
    </section>
  );
}

export default TodoEditor;
