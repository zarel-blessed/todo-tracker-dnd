import { useContext } from "react";
import { Todo, todosContext } from "./TodoListContainer";
import TodoItem from "./TodoItem";

const Todos = () => {
  const { todos } = useContext(todosContext);

  return (
    <section className="flex flex-col gap-4">
      {todos?.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo._id.toString()} />
      ))}
    </section>
  );
}

export default Todos;
