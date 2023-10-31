import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Modal } from "react-bootstrap"; // Install react-bootstrap if not installed
import { Task } from "./interface";
import { config } from "../config";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [paginate, setPaginate] = useState({
    limit: 10,
    skip: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editedComplete, setEditedComplete] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, [paginate, showModal]);

  const handleClose = (): void => setShowModal(false);
  const handleShow = (): void => setShowModal(true);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    handleShow();
  };

  const handleDelete = async (taskId: String) => {
    try {
      const response = await fetch(`${config.API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      if (response.ok) {
        // Remove the deleted task from the tasks state
        setTasks((prevTasks) =>
          prevTasks.filter((task: Task) => task._id !== taskId)
        );
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/tasks?skip=${paginate.skip}&limit=${paginate.limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handlePrevPaginate = () => {
    if (currentPage === 1) return null;
    setPaginate({
      skip: paginate.skip - paginate.limit,
      limit: paginate.limit,
    });
    setCurrentPage((oldCount) => oldCount - 1);
  };

  const handleNextPaginate = () => {
    if (tasks.length < paginate.limit) return null;
    setPaginate({
      skip: paginate.skip + paginate.limit,
      limit: paginate.limit,
    });
    setCurrentPage((oldCount) => oldCount + 1);
  };

  return (
    <div className="container">
      <h1 className="text-white m-2">Task List</h1>
      <div className="row row-cols-2">
        <table className="table table-hover" data-show-pagination-switch="true">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

          {tasks.length > 0 ? (
            <>
              <tbody>
                {tasks.map((task: Task, index: number) => (
                  <tr key={Number(task._id)}>
                    <th scope="row">{index + paginate.skip}</th>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center text-center max-vw-100 display-1">
              <span>No Data Found</span>
            </div>
          )}

          <nav
            className="position-absolute bottom-0 end-50"
            aria-label="Page navigation example"
          >
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link" onClick={handlePrevPaginate}>
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPaginate}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </table>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm task={editingTask} isEditing={true} onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskList;
