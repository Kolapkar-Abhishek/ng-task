import React, { useState } from "react";
import { Checkbox, Switch } from "@mui/material";
import { toast } from "react-hot-toast";

import useTaskContext from "../context/useContext";
import { BtnForItem } from "../components/common/BtnGroup";
import TaskItem from "./TaskItem";
import CreateItem from "../components/modals/CreateItem";
import UpdateItem from "../components/modals/UpdateItem";

const TaskList = (props) => {
  const { updateCheckedList, checkedItem } = useTaskContext();
  const { id, title, taskItems, checked } = props;
  const [createTaskItem, setCreateTaskItem] = useState(false);
  const [updateTaskItem, setUpdateTaskItem] = useState(false);

  const handleCreateTaskItem = () => {
    setCreateTaskItem(!createTaskItem);
  };

  const handleUpdateTaskItem = () => {
    if (!checkedItem) {
      toast.error("No item checked", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    setUpdateTaskItem(!updateTaskItem);
  };

  const handleCheckbox = () => {
    updateCheckedList(id, !checked);
  };

  const renderItems = taskItems.map((item) => (
    <TaskItem key={item.id} listId={id} {...item} />
  ));

  return (
    <div className="rounded-lg overflow-hidden border border-gray-300 h-[fit-content]">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <div className="w-full flex justify-between items-center bg-gray-200 rounded-lg border border-gray-300 h-[40px]">
          <Checkbox
            checked={checked}
            onChange={handleCheckbox}
            inputProps={{ "aria-label": "controlled" }}
          />
          <span className="text-lg">{title}</span>
          <Switch inputProps={{ "aria-label": "controlled" }} />
        </div>
      </div>
      <div className={`flex flex-col gap-2 ${taskItems.length ? "py-4" : ""}`}>
        {renderItems}
      </div>
      <div className="flex justify-center bg-gray-100 py-2">
        <BtnForItem
          create={handleCreateTaskItem}
          update={handleUpdateTaskItem}
        />
      </div>
      {createTaskItem && (
        <CreateItem listId={id} create={handleCreateTaskItem} />
      )}
      {updateTaskItem && <UpdateItem update={handleUpdateTaskItem} />}
    </div>
  );
};

export default TaskList;
