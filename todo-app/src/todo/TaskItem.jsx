import React from 'react'
import { Checkbox, Switch } from '@mui/material'

import useTaskContext from '../context/useContext'

const TaskItem = ({id, title, checked, listId}) => {
  const {updateCheckedItemAndList} = useTaskContext()

  const handleCheckedItemAndList = () => {
    updateCheckedItemAndList(id, listId, !checked)
  }

  return (
    <div className="bg-white px-4 border-gray-300">
      <div className="w-full flex justify-between items-center bg-gray-200 rounded-lg border border-gray-300 h-[40px]">
        <Checkbox
          checked={checked}
          onChange={handleCheckedItemAndList}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <div className="flex w-full items-center pl-2 bg-white h-full">
          <span className="text-md">{title}</span>
        </div>
        <Switch inputProps={{ 'aria-label': 'controlled' }} />
      </div>
    </div>
  )
}

export default TaskItem