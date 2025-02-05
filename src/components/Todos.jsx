import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { editTodos, removeTodo } from "../store/slice/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "react-modal";





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





function Todos({ todo }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editTodo, setEditTodo] = useState({
    id: "",
    title: "",
    priority: "",
  });

  const handleEditClick = (todo) => {
    setIsOpen(true);
    setEditTodo({
      id: todo.id,
      title: todo.title,
      priority: todo.priority,
    })
  };

  const handleEditTodo  = (e) => {
    e.preventDefault();
    dispatch(editTodos({id: editTodo.id, title: editTodo.title, priority: editTodo.priority}));
    setIsOpen(false);
  }


  const closeModal = () => {
    setIsOpen(false);
  };

  const todos = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();

  const handleDeleteClick = (todo) => {
    dispatch(removeTodo(todo));
    toast.success("Task Deleted Succesfully")
  };

  return (
    <>
      {todo && Array.isArray(todo) && todo.length > 0 ? (
        todo.map((item) => (
          <div key={item.id} className="w-full grid grid-cols-12 mb-3 bg-gray-50 p-5 rounded-xl">
            {/* Task Section */}
            <div className="col-span-7 flex justify-center flex-col">
              <p className="text-gray-400 text-base">Task</p>
              <p className="text-black text-base">{item.title}</p>
            </div>

            {/* Priority Section */}
            <div className="col-span-2 flex justify-center flex-col">
              <p className="text-gray-400 text-lg">Priority</p>
              <p className={`text-base 
    ${item.priority === "High" ? "text-red-500" : ""} 
    ${item.priority === "Medium" ? "text-yellow-500" : ""} 
    ${item.priority === "Low" ? "text-green-500" : ""}`}>{item.priority}</p>
            </div>

            {/* Actions Section */}
            <div className="col-span-3 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <button onClick={() => handleEditClick(item)}>
                  <Icon
                    icon="mynaui:edit-one"
                    width="18"
                    height="18"
                    className="text-[#7240ff] cursor-pointer"
                  />
                </button>
                <button onClick={() => handleDeleteClick(item.id)}>
                  <Icon
                    icon="fluent-mdl2:delete"
                    width="18"
                    height="18"
                    className="text-red-400 cursor-pointer"

                  />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No tasks available</p>
      )}


      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-white border-[1px] border-gray-200 rounded-xl p-6 w-[500px]">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">Edit Task</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleEditTodo}>
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
                  value={editTodo.title}
                  onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
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
                    onClick={() => setEditTodo({ ...editTodo, priority: "High" })}
                    className={` ${editTodo.priority === "High" && "bg-red-500 text-white"
                      } px-4 py-2 rounded-md border border-red-500 text-red-500 `}
                    type="button"
                  >
                    High
                  </button>
                  <button
                    onClick={() => setEditTodo({ ...editTodo, priority: "Medium" })}
                    className={`${editTodo.priority === "Medium" && "bg-yellow-500 !text-white"
                      } px-4 py-2 rounded-md border border-yellow-500 text-yellow-500 `}
                    type="button"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setEditTodo({ ...editTodo, priority: "Low" })}
                    className={`${editTodo.priority === "Low" && "bg-green-500 text-white"
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
                Edit
              </button>
            </div>
          </form>
        </div>
      </Modal>

    </>

  )
}

export default Todos;
