import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { addTodos } from "../../features/todoSlice";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function CreateTodo() {
  const [data, setData] = useState("");
  const [errors, setErrors] = useState({});
  const [endDate, setEndDate] = useState(parseInt(moment().format("x")));
  const dispatch = useDispatch();

  const findFormErrors = () => {
    const newErrors = {};

    if (!data) {
      newErrors.data = "Please add a Todo";
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    console.log("has");
    e.preventDefault();

    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      debugger;
      dispatch(
        addTodos({
          todoName: data,
          endDate: endDate,
        })
      );
      Swal.fire("Good job!", "Todo Added Successfully!", "success");
    }

    console.log("Tam", endDate);
  };
  return (
    <div className="mt-4">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Todo Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            isInvalid={!!errors.data}
            onChange={(e) => setData(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.data}
          </Form.Control.Feedback>
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-control date-picker"
            placeholderText="dd/mm/yyyy"
          />

          <div className="mt-3">
            <Button type="submit" variant="success">
              Add Todo
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CreateTodo;
