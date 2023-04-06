import React from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-hot-toast";

import useTaskContext from "../../context/useContext";

export const BtnForList = ({ create, update }) => {
  const { checkedList, deleteList } = useTaskContext();

  const handleDeleteList = () => {
    if (!checkedList) {
      toast.error('Please checked list', {
        position: 'top-right',
        duration: 1000,
      });
      return;
    } else {
      deleteList(checkedList.id);
      toast.success('List deleted', {
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white fixed bottom-0 left-0 w-full py-3 flex justify-center">
        <div className="flex text-white text-2xl">
          <button
            onClick={create}
            className="p-4 bg-green-400 rounded-l-lg"
          >
            <FiPlusSquare />
          </button>
          <button
            onClick={update}
            className="p-4 bg-yellow-400"
          >
            <BiEdit />
          </button>
          <button
            onClick={handleDeleteList}
            className="p-4 bg-red-400 rounded-r-lg"
          >
            <FiMinusSquare />
          </button>
        </div>
      </div>
    </>
  );
};

export const BtnForItem = ({create, update}) => {
  const {checkedItem, deleteItem} = useTaskContext()

  const handleDeleteItem = () => {
    if (!checkedItem) {
      toast.error('No item checked', {
        position: 'top-right',
        duration: 1000,
      });
      return;
    } else {
      deleteItem(checkedItem.id);
      toast.success('Deleted a item', {
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  return(
    <>
      <div>
      <div className="flex text-white text-2xl">
        <button
          onClick={create}
          className="p-3 bg-green-400 rounded-l-lg"
        >
          <FiPlusSquare />
        </button>
        <button
          onClick={update}
          className="p-3 bg-yellow-400"
        >
          <BiEdit />
        </button>
        <button
          onClick={handleDeleteItem}
          className="p-3 bg-red-400 rounded-r-lg"
        >
          <FiMinusSquare />
        </button>
      </div>
    </div>
    </>
  )
};
