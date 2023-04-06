import React, { useState } from 'react'
import {FaTasks} from 'react-icons/fa'
import { toast } from 'react-hot-toast'

import Header from './components/common/Header'
import { BtnForList } from './components/common/BtnGroup'
import CreateList from './components/modals/CreateList'
import UpdateList from './components/modals/UpdateList'
import TaskList from './todo/TaskList'
import useTaskContext from './context/useContext'

const Dashboard = () => {
  const { taskList, createList, updateList, checkedList } = useTaskContext();
  const [createTaskList, setCreateTaskList] = useState(false)
  const [updateTaskList, setUpdateTaskList] = useState(false)

  const handleCreateTaskList = () => {
    setCreateTaskList(!createTaskList);
  };

  const handleUpdateTaskList = () => {
    if (!checkedList) {
      toast.error('No list checked', {
        position: 'top-right',
        autoClose: 1000,
      });
      return;
    }

    setUpdateTaskList(!updateTaskList);
  };

  const renderedList = taskList?.map(list => (
    <TaskList key={list.id} {...list} />
  ));

  return (
    <section>
      <Header />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-7 max-w-7xl mx-auto">
        {taskList.length ? (
          renderedList
        ) : (
          <h1 className="text-4xl flex gap-x-5">Add Task Here <FaTasks /> </h1>
        )}
      </div>
      <BtnForList
        create={handleCreateTaskList}
        update={handleUpdateTaskList}
      />
      {createTaskList && (
        <CreateList create={handleCreateTaskList} />
      )}
      {updateTaskList && (
        <UpdateList update={handleUpdateTaskList} />
      )}
    </section>
  )
}

export default Dashboard