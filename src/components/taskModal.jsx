import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TaskModal = ({ show, handleClose, handleSave, taskToEdit }) => {
  const [taskName, setTaskName] = useState("");
  const [desc, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      console.log(taskToEdit);
      setTaskName(taskToEdit.taskName);
      setDescription(taskToEdit.desc);
      setDueDate(taskToEdit.dueDate);
    } else {
      setTaskName("");
      setDescription("");
      setDueDate("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName) {
      const task = { taskName, desc, dueDate };
      handleSave(task);
      setTaskName("");
      setDescription("");
      setDueDate("");
      handleClose();
    }
  };

  return (
    <Modal show={show} className="main-modal" onHide={handleClose}>
      <div className="container">
        <Modal.Header closeButton>
          <Modal.Title>{taskToEdit ? "Edit Task" : "Add New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="modal-body-container">
            <Form.Group className="mb-3" controlId="formTaskTitle">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={desc}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
            <div className="btn-ctn">
              <Button
                onClick={handleClose}
                variant="light"
                className="border-secondary"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {taskToEdit ? "Save Changes" : "Save Task"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default TaskModal;
