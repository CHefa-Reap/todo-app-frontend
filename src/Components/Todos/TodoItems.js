import React from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteTodos,
  getTodos,
  toggleCompleteAsync,
} from "../../features/todoSlice";
import Swal from "sweetalert2";
import moment from "moment";
import { MdDelete, MdDone, MdOutlineClose } from "react-icons/md";

function TodoItems({ todoName, id, completed, endDate }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodos({ id }));
    dispatch(getTodos());
    Swal.fire("Good job!", "Todo is Deleted!", "success");
  };

  const handleCompleted = () => {
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
    dispatch(getTodos());
  };
  return (
    <div className="mt-3 todoItems__component">
     
        <Card className="todos">
          <div className="d-flex justify-content-between">
            <Card.Body className="d-flex text-white align-items-center">
              {todoName}
              <br />
              End Date: {moment(endDate).format("DD-MM-YYYY")}
            </Card.Body>
            {completed === false && (
              <MdOutlineClose
                className="close-icon"
                onClick={handleCompleted}
              />
            )}

            {completed === true && <MdDone className="done-icon" />}

            <MdDelete onClick={handleDelete} className="trash-icon" />
          </div>
        </Card>
    </div>
  );
}

export default TodoItems;
