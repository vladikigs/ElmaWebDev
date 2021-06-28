import {
  CHANGE_IN_TABLE,
  INIT_APPLICATION,
  NEXT_DATES,
  PREVIOUS_DATES,
  SET_FILTER_BACKLOG_BY_NAME
} from './types'


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
