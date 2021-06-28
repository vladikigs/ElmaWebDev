import {combineReducers} from 'redux'
import {
  CHANGE_IN_TABLE,
  INIT_APPLICATION,
  LOAD_TASKS,
  LOAD_USERS,
  NEXT_DATES,
  PREVIOUS_DATES
} from "../types";
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
      startDateOfTheTable = addDaysToDate(new Date(), -Math.floor(state.numberOfDatesPerPage/2));
      return {...state, startDateOfTheTable: startDateOfTheTable};
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
    case LOAD_USERS:
      return state = {...state, users: action.users};
    case LOAD_TASKS:
      return state = {...state, tasks: action.tasks};

    default:
      return state;
  }
}

export const rootReducer  = combineReducers({
  table: tableReducer,
  backlog: backlogReducer
})
