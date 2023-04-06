import React, { useState } from "react";
import ReactDOM from 'react-dom'
import { toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";

import useTaskContext from "../../context/useContext";

const UpdateList = ({ update }) => {
  const { checkedList, updateList } = useTaskContext();
  const [listValue, setListValue] = useState({
    id: checkedList.id,
    title: checkedList.title,
    duedate: checkedList.duedate,
  });

  const toggle = () => update();

  const valueChange = (e) => {
    const { name, value } = e.target;

    const updatedValues = { ...listValue, [name]: value };
    setListValue(updatedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!listValue.title || !listValue.duedate || !listValue.id) {
      toast.error("Missing input fields", {
        position: "top-right",
        duration: 1000,
      });
      return;
    } else {
      updateList(checkedList.id, listValue);
      update();
      toast.success("Updated a list", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={toggle}
        className="absolute inset-0 bg-gray-300 opacity-50 z-10"
      ></div>
      <div className="absolute top-20 left-0 flex flex-col items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[40%] w-full bg-white rounded-lg overflow-hidden border border-gray-300 z-20"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h1 className="text-xl font-[500]">New Todo List</h1>
            <MdClose
              onClick={toggle}
              className="text-lg text-gray-600 cursor-pointer"
            />
          </div>
          <div className="flex flex-col px-4 pt-4 pb-10 border-b border-gray-300">
            <span className="text-lg mb-2">Todo Id</span>
            <input
              value={listValue.id}
              onChange={valueChange}
              name="id"
              type="text"
              className="border border-gray-300 h-[40px] rounded-lg outline-2 outline-gray-300 pl-2 mb-4"
            />
            <span className="text-lg mb-2">Title</span>
            <input
              value={listValue.title}
              onChange={valueChange}
              name="title"
              type="text"
              className="border border-gray-300 h-[40px] rounded-lg outline-2 outline-gray-300 pl-2 mb-4"
            />
            <span className="text-lg mb-2">Due Date</span>
            <input
              value={listValue.duedate}
              onChange={valueChange}
              name="duedate"
              type="text"
              placeholder="Select Due Date"
              className="border border-gray-300 h-[40px] rounded-lg outline-2 outline-gray-300 flex items-center pl-2"
            />
            <button
              type="submit"
              className="bg-yellow-400 py-3 text-xl font-[500] rounded-lg mt-4 hover:bg-yellow-500 ease-in duration-100"
            >
              Update
            </button>
          </div>
          <div className="p-4 flex justify-end">
            <button
              onClick={toggle}
              className="py-2 px-3 bg-teal-500 rounded-lg text-white hover:bg-teal-600 ease-in duration-100"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector(".task-container")
  );
};

export default UpdateList;
