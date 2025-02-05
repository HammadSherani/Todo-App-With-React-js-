import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/slice/todoSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    padding: "0px",
    background: "transparent",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
  },
};

function AddTodos({ setTodos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
    id: "",
    title: "",
    priority: "",
    completed: false,
  });

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  console.log(todos);

  if(!isOpen) {
    newTodo.title = "";
  }
  

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo({title: newTodo.title, priority: newTodo.priority}));
    setIsOpen(false);
    setNewTodo({
      id: "",
      title: "",
      priority: "",
      completed: false,
    })
    toast.success("Task added successfully");
  };

  const openAddModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-5xl font-serif">Task List</h1>

      <button
        onClick={() => openAddModal()}
        className="py-2 px-8 text-white rounded-md flex items-center gap-1 font-bold cursor-pointer bg-[#7240ff]"
      >
        <Icon icon="line-md:plus" width="18" height="18" />
        Add Task{" "}
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-white border-[1px] border-gray-200 rounded-xl p-6 w-[500px]">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">Add Task</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleAddTodo}>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="task"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  className="mt-1 block w-full p-3 focus:outline-0 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add Task"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  name="title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-4">
                  <button
                    name="priority"
                    onClick={() => setNewTodo({...newTodo, priority: "High"})}
                    className={` ${
                      newTodo.priority === "High" && "bg-red-500 text-white"
                    } px-4 py-2 rounded-md border border-red-500 text-red-500 `}
                    type="button"
                  >
                    High
                  </button>
                  <button
                     onClick={() => setNewTodo({...newTodo, priority: "Medium"})}
                    className={`${
                      newTodo.priority === "Medium" && "bg-yellow-500 !text-white"
                    } px-4 py-2 rounded-md border border-yellow-500 text-yellow-500 `}
                    type="button"
                  >
                    Medium
                  </button>
                  <button
                     onClick={() => setNewTodo({...newTodo, priority: "Low"})}
                    className={`${
                      newTodo.priority === "Low" && "bg-green-500 text-white"
                    } px-4 py-2 rounded-md border border-green-500 text-green-500`}
                    type="button"
                  >
                    Low
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AddTodos;
