import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskFormProps } from "./interface";
import { config } from "../config";

const TaskForm = ({ task, isEditing = false, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [priority, setPriority] = useState<string>("low");
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("low");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      priority,
    };

    const url = isEditing
      ? `${config.API_URL}/api/tasks/${task?._id}`
      : `${config.API_URL}/api/tasks`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (response.ok) {
        if (isEditing) {
          console.log("Task updated successfully");
          // Update the task in your state here
        } else {
          console.log("Task created successfully");
          // Add the new task to your state here
        }

        // Reset form fields
        setTitle("");
        setDescription("");
        setStatus("pending");
        setPriority("low");
        onClose?.();
        navigate("/tasks");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h2 className="card-title">{isEditing ? "Edit" : "Create"} Task</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status:
                </label>
                <select
                  className="form-select"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority:
                </label>
                <select
                  className="form-select"
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {task ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
