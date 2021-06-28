import {TASKS_SERVER_URL, USERS_SERVER_URL} from "../types";

export function loadDataUsers() {
  let data = $.ajax({
    async: false,
    dataType: 'json',
    url: USERS_SERVER_URL,
  });
  return data.responseJSON.map(item => {
    return {
      id: item.id,
      username: item.username,
      surname: item.surname,
      firstName: item.firstName,
      secondName: item.secondName
    }
  });
}

export function loadDataTasks() {
  let data = $.ajax({
    async: false,
    dataType: 'json',
    url: TASKS_SERVER_URL,
  });
  return data.responseJSON.map(item => {
    return {
      id: item.id,
      subject: item.subject,
      description: item.description,
      creationAuthor: item.creationAuthor,
      executor: item.executor,
      creationDate: item.creationDate,
      planStartDate: item.planStartDate,
      planEndDate: item.planEndDate,
      endDate: item.endDate,
      status: item.status,
      order: item.order
    }
  })
}
