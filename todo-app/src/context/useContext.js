import React, { useContext } from 'react'
import TaskContext from './TaskContext'

const useTaskContext = () => {
  return (
    useContext(TaskContext)
  )
}

export default useTaskContext