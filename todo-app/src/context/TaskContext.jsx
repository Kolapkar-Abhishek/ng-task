import React, { useState, createContext } from "react";
import nextId from "react-id-generator";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [checkedItem, setCheckedItem] = useState(null);
  const [checkedList, setCheckedList] = useState(null);
  const [checkedItemList, setCheckedItemList] = useState(null);

  const createItem = (id, object) => {
    const index = taskList.findIndex((list) => list.id === id);

    if (index !== -1) {
      const updatedTaskList = [
        ...taskList.slice(0, index),
        {
          ...taskList[index],
          taskItems: [
            ...taskList[index].taskItems,
            {
              id: nextId(),
              checked: false,
              completed: false,
              ...object,
            },
          ],
        },
        ...taskList.slice(index + 1),
      ];
      setTaskList(updatedTaskList);
    }
  };

  const updateItem = (itemId, Object) => {
    const listIndex = taskList.findIndex((list) =>
      list.taskItems.some((item) => item.id === itemId)
    );

    const itemIndex = taskList[listIndex].taskItems.findIndex(
      (item) => item.id === itemId
    );

    if (itemIndex !== -1) {
      const updatedTaskList = [...taskList];
      updatedTaskList[listIndex].taskItems[itemIndex] = {
        ...updatedTaskList[listIndex].taskItems[itemIndex],
        ...Object,
      };
      return updatedTaskList;
    }

    return taskList;
  };

  const deleteItem = (itemId) => {
    const listIndex = taskList.findIndex((list) =>
      list.taskItems.some((item) => item.id === itemId)
    );

    const itemIndex = taskList[listIndex].taskItems.findIndex(
      (item) => item.id === itemId
    );

    if (itemIndex !== -1) {
      const updatedTaskList = [...taskList];
      updatedTaskList[listIndex].taskItems.splice(itemIndex, 1);
      setTaskList(updatedTaskList);
    }
  };

  const createList = (object) => {
    const updatedList = [
      ...taskList,
      {
        ...object,
        id: nextId(),
        checked: false,
        completed: false,
        taskItems: [],
      },
    ];

    setTaskList(updatedList);
  };

  const deleteList = (id) => {
    const deletedList = taskList.filter((list) => list.id !== id);

    setTaskList(deletedList);
  };

  const updateList = (id, object) => {
    const updatedList = taskList.map((list) => {
      if (list.id === id) {
        setCheckedList({ ...list, ...object });
        return { ...list, ...object };
      }
      return list;
    });
    setTaskList(updatedList);
  };

  const updateCheckedList = (id, boolean) => {
    const updatedList = taskList.map((list) => {
      if (list.id === id) {
        if (list.checked === false) setCheckedList(list);
        else setCheckedList(null);
        return { ...list, checked: boolean };
      }
      return { ...list, checked: false };
    });

    setTaskList(updatedList);
  };

  const updateCheckedItemAndList = (itemId, listId, boolean) => {
    const updatedTaskList = taskList.map((list) => {
      if (list.id === listId) {
        const updatedTaskItems = list.taskItems.map((item) => {
          if (item.id === itemId) {
            item.checked = boolean;
          } else {
            item.checked = false;
          }
          return item;
        });
        return {
          ...list,
          taskItems: updatedTaskItems,
        };
      } else {
        return {
          ...list,
          taskItems: list.taskItems.map((item) => {
            return {
              ...item,
              checked: false,
            };
          }),
        };
      }
    });

    const updatedItem = updatedTaskList
      .flatMap((list) => list.taskItems)
      .find((item) => item.id === itemId && item.checked === true);

    const updatedList = updatedTaskList.find((list) => list.id === listId);

    setCheckedItemList(updatedList || null);
    setCheckedItem(updatedItem || null);
  };

  const values = {
    taskList,
    createList,
    updateList,
    deleteList,
    updateCheckedList,
    checkedList,
    createItem,
    updateItem,
    deleteItem,
    checkedItem,
    updateCheckedItemAndList,
    checkedItemList,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskContext;
export { TaskProvider };
