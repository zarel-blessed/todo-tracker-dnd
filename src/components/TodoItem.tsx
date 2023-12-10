import { CgClose } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

import { Todo, todosContext } from "./TodoListContainer";
import { useContext, useState } from "react";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [deleted, setDelete] = useState(false);
  const [completed, setCompleted] = useState(todo.isCompleted);
  const { setTodos } = useContext(todosContext);

  const handleDeleteTodo = (todoId: Date) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") as string);
    const newTodoList = todos.filter((todo: Todo) => todo._id !== todoId);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
    setDelete(prev => !prev);
    setTimeout(() => setTodos(newTodoList), 300);
  }

  const handleChangeComplete = () => {
    setCompleted(prev => !prev);

    const newTodos = JSON.parse(localStorage.getItem("todos") as string).map((storedTodo: Todo) => {
      if (storedTodo._id === todo._id) {
        return {
          ...storedTodo,
          isCompleted: !storedTodo.isCompleted
        }
      }

      return storedTodo;
    });

    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <article className="mb-4 flex gap-4 items-center transition-all duration-300 ease-in" style={{
      opacity: deleted ? "0" : "1",
    }}>
      <div className="flex-1 flex justify-between items-center py-2 px-8 rounded-md" style={{
        backgroundColor: todo.bg
      }}>
        <span className="inline-block w-[38ch] text-zinc-900 font-medium" style={{
          textDecoration: completed ? "line-through" : "none",
        }}>{todo.task}</span>
        <CgClose className="p-2 text-4xl text-red-700 cursor-pointer" onClick={() => handleDeleteTodo(todo._id)} />
      </div>

      <div className="flex gap-4 items-center">
        <FaCheck className={`p-2 text-4xl ${completed ? "text-green-700" : "text-zinc-600"} bg-slate-200 cursor-pointer rounded-full`} onClick={handleChangeComplete} />
        <FaRegEdit className="p-2 text-4xl text-slate-700 cursor-pointer" />
      </div>
    </article>
  );
}

export default TodoItem;
