import {TASKS_SERVER_URL, USERS_SERVER_URL} from "../types";
import {loadTasks, loadUsers} from "../actions";

export function loadDataUsers(tableReducer) {
  console.log(`users`)
  $.ajax({
    dataType: 'json',
    url: USERS_SERVER_URL,
    success: function (users) {
      console.log(`users`)
      tableReducer.dispatch(loadUsers(users));
    }
  });
}

export function loadDataTasks(tableReducer) {
  console.log(`users`)
  $.ajax({
    dataType: 'json',
    url: TASKS_SERVER_URL,
    success: function (tasks) {
      tableReducer.dispatch(loadTasks(tasks));
    }
  });
}
