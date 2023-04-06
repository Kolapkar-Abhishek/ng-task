import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {MdClose} from 'react-icons/md'
import { toast } from 'react-hot-toast'
import useTaskContext from '../../context/useContext'

const UpdateItem = ({update}) => {
  const { updateItem, checkedItem } = useTaskContext();
  const [itemValue, setItemValue] = useState({
    id: checkedItem.id,
    title: checkedItem.title,
    duedate: checkedItem.duedate,
  });

  const toggle = () => {
    update();
  };

  const valueChange = e => {
    const { name, value } = e.target;

    const updatedValues = { ...itemValue, [name]: value };
    setItemValue(updatedValues);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!itemValue.title || !itemValue.duedate || !itemValue.id) {
      toast.error('Missing input fields', {
        position: 'top-right',
        duration: 1000,
      });
      return;
    } else {
      updateItem(checkedItem.id, itemValue);
      update();
      toast.success('Updated a item', {
        position: 'top-right',
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
              value={itemValue.id}
              onChange={valueChange}
              name="id"
              type="text"
              className="border border-gray-300 h-[40px] rounded-lg outline-2 outline-gray-300 pl-2 mb-4"
            />
            <span className="text-lg mb-2">Title</span>
            <input
              value={itemValue.title}
              onChange={valueChange}
              name="title"
              type="text"
              className="border border-gray-300 h-[40px] rounded-lg outline-2 outline-gray-300 pl-2 mb-4"
            />
            <span className="text-lg mb-2">Due Date</span>
            <input
              value={itemValue.duedate}
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
    document.querySelector('.task-container')
  )
}

export default UpdateItem