import {combineReducers} from 'redux'

import {loadDataTasks, loadDataUsers} from "../loader/data-loader";
import {CHANGE_IN_TABLE, INIT_APPLICATION, NEXT_DATES, PREVIOUS_DATES} from "../types";
import {addDaysToDate} from "./date-manager";
import {editDataForTask} from "./task-manager";
import {backlogReducer} from "../backgog/backlog-reducer";

const initialTableState = {
  numberOfDatesPerPage: 13,
  users: {},
  tasks: {},
  startDateOfTheTable: {}
}

function tableReducer(state = initialTableState, action) {
  let startDateOfTheTable;
  switch (action.type) {
    case INIT_APPLICATION:
      let users = loadDataUsers();
      let tasks = loadDataTasks();
      startDateOfTheTable = addDaysToDate(new Date(), -Math.floor(state.numberOfDatesPerPage/2));
      return {...state, users: users, tasks: tasks, startDateOfTheTable: startDateOfTheTable};
    case NEXT_DATES:
      startDateOfTheTable = addDaysToDate(state.startDateOfTheTable, state.numberOfDatesPerPage-1);
      return {...state, startDateOfTheTable: startDateOfTheTable};
    case PREVIOUS_DATES:
      startDateOfTheTable = addDaysToDate(state.startDateOfTheTable, -state.numberOfDatesPerPage+1);
      return {...state, startDateOfTheTable: startDateOfTheTable};
    case CHANGE_IN_TABLE:
      let newTasks = editDataForTask(
          state.tasks,
          action.dragElement.dataset.id,
          action.dragContainer.dataset.date,
          action.dragContainer.dataset.userId
      );
      return state = {...state, tasks: newTasks};
    default:
      return state;
  }
}

export const rootReducer  = combineReducers({
  table: tableReducer,
  backlog: backlogReducer
})
