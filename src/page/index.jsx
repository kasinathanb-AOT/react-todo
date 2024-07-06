// Index.js

import React, { useEffect, useState } from "react";
import TaskContainer from "../components/taskContainer";
import TaskModal from "../components/taskModal";
import Header from "../components/header";
import DeleteModal from "../components/deleteModal";
import {
  deleteTask,
  getTasks,
  toggleTaskStatus,
  CreateTask,
  UpdateTask,
  deleteCompletedTasks,
} from "../services/userServices";
import { useParams } from "react-router-dom";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      getTasks(token).then((res) => {
        setTasks(res.data.Tasks);
      });
    }
  }, [token]);

  const handleShowModal = () => {
    setShowModal(true);
    setTaskToEdit(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteModal = (id) => {
    setTaskIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskIdToDelete(null);
  };

  const handleSave = async (taskData) => {
    if (!token) {
      return;
    }
    try {
      let response;
      if (taskToEdit && taskToEdit.id) {
        response = await UpdateTask(taskToEdit.id, taskData, token);
      } else {
        response = await CreateTask(taskData, token);
      }

      if (response && response.tasks) {
        setTasks(response.tasks);
        setShowModal(false);
      } else {
        console.log("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error saving the task in index JS", error);
    }
  };

  const handleEditingTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!token || id === null) {
      return;
    }
    try {
      await deleteTask(id, token);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setShowDeleteModal(false);
      setTaskIdToDelete(null);
    } catch (error) {
      console.error("Error deleting the task", error);
    }
  };

 // In the deleteCompleted function, use the correct API call
const deleteCompleted = async () => {
  if (!token) {
    return;
  }

  try {
    await deleteCompletedTasks(token);
    const updatedTasks = tasks.filter((task) => !task.status);
    setTasks(updatedTasks);
  } catch (error) {
    console.error("Error deleting completed tasks", error);
  }
};

  const toggleStatus = async (id) => {
    if (!token) {
      return;
    }
    try {
      await toggleTaskStatus(id, token);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task status", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  return (
    <>
      <Header
        handleShowModal={handleShowModal}
        handleSearch={handleSearch}
        handleSort={handleSort}
      />
      <TaskContainer
        tasks={tasks}
        handleDelete={handleDeleteModal}
        toggleStatus={toggleStatus}
        searchTerm={searchTerm}
        sortBy={sortBy}
        handleDeleteCompleted={deleteCompleted}
        handleEdit={handleEditingTask}
      />
      <TaskModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        taskToEdit={taskToEdit}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => handleDelete(taskIdToDelete)}
        taskId={taskIdToDelete}
      />
    </>
  );
};

export default Index;
