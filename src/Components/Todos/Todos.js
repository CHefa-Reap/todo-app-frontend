import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTodos } from "../../features/todoSlice";
import CreateTodo from "./CreateTodo";
import TodoItems from "./TodoItems";
import _ from "lodash";
function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [order, SetOrder] = useState("ASC");
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const dataSort = () => {
    const sortBy = _.sortBy(todos, ["endDate"]);
    dispatch(getTodos(sortBy));
  };
  return (
    <div>
      <CreateTodo />
      <Container>
        <div>
          {todos.map((todo) => (
            <TodoItems
              id={todo._id}
              todoName={todo.todoName}
              completed={todo.completed}
              endDate={todo.endDate}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Todos;
