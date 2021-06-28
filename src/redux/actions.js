import {
  ASYNC_LOAD_DATA,
  CHANGE_IN_TABLE,
  INIT_APPLICATION, LOAD_TASKS, LOAD_USERS,
  NEXT_DATES,
  PREVIOUS_DATES,
  SET_FILTER_BACKLOG_BY_NAME
} from './types'
import {loadDataTasks, loadDataUsers} from "./loader/data-loader";


export function nextDates() {
  return {
    type: NEXT_DATES
  }
}

export function previousDates() {
  return {
    type: PREVIOUS_DATES
  }
}

export function changeInTable(dragElement, dragContainer) {
  return {
    type: CHANGE_IN_TABLE,
    dragElement: dragElement,
    dragContainer: dragContainer
  }
}

export function initApplication() {
  return {
    type: INIT_APPLICATION
  }
}


export function setFilterBacklogByName(filterName) {
  return {
    type: SET_FILTER_BACKLOG_BY_NAME,
    filterName: filterName
  }
}

export function asyncLoadData(tableReducer) {
  loadDataTasks(tableReducer)
  loadDataUsers(tableReducer)
  return {
    type: ASYNC_LOAD_DATA,
  }
}

export function loadUsers(users) {
  return {
    type: LOAD_USERS,
    users: users
  }
}

export function loadTasks(tasks) {
  return {
    type: LOAD_TASKS,
    tasks: tasks
  }
}
