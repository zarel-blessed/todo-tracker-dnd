import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Todo, todosContext } from "./TodoListContainer";
import TodoItem from "./TodoItem";

const Todos = () => {
  const { todos, setTodos } = useContext(todosContext);

  const handleDragNDrop = (results: any) => {
    const { source, destination } = results;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    let newTodoList = todos;
    const [removedTodo] = todos.splice(source.index, 1);
    newTodoList.splice(destination.index, 0, removedTodo);
    setTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  return (
    <DragDropContext onDragEnd={handleDragNDrop}>
      <Droppable droppableId="ROOT" type="group">
        {(provided: any) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col">
            {todos?.map((todo: Todo, index: number) => (
              <Draggable draggableId={todo._id.toString()} key={todo._id.toString()} index={index}>
                {(provided: any) => (
                  <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <TodoItem todo={todo} key={todo._id.toString()} />
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Todos;
