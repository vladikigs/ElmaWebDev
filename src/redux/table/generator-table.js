import {getFullName, getUserById} from "./user-manager";
import {
    getCreationDate,
    getPlanEndDate,
    getStatus,
    getTheRemainingTimeBeforeTheTaskIsCompleted
} from "./task-manager";
import {addDaysToDate, parseDate, resetDateTime} from "./date-manager";

let globalTableData;

export function generateTable(tableData) {
    globalTableData = tableData
    let dateText;
    console.log(tableData)
    let date = new Date(parseDate(tableData.startDateOfTheTable).toDateString());
    $('#tasks')[0].innerHTML = "";
    $('#dates')[0].innerHTML = '<th class="text-center" scope="col">&nbsp;</th>';
    for (let i = 1; i <= tableData.numberOfDatesPerPage; i++) {
        dateText = ("00" + (date.getDate())).slice(-2) + '.' + ("00" + (date.getMonth() + 1)).slice(-2);
        $('#dates')[0].innerHTML  += `<th class="text-center" scope="col">${dateText}</th>`;
        date = addDaysToDate(date, 1);
    }
    setTasksToCell(tableData);
}


function setTasksToCell(tableData) {
    for (let i = 0; i < tableData.users.length; i++) {
        showTasksForUser(tableData.users[i], tableData);
    }
}

function showTasksForUser(user, tableData) {
    $('#tasks')[0].innerHTML +=
        `<tr id="user-${user.id}">
        <th class="align-middle text-center" scope="row">${getFullName(user)}</th>`;
    let date = new Date(parseDate(tableData.startDateOfTheTable).toDateString());
    for (let i = 0; i < tableData.numberOfDatesPerPage; i++) {
        let tasks = getTaskByStartDateAndUser(date, user);
        if (tasks.length > 0) {
            $('#user-'+user.id)[0].innerHTML += generateHtmlTasks(tasks, user, date);
        } else {
            $('#user-'+user.id)[0].innerHTML += `<td data-date="${date}" data-user-id="${user.id}" class="dropzone">&nbsp;</td>`;
        }
        date = addDaysToDate(date, 1);
    }
}

function getTaskByStartDateAndUser(date, user) {
    date = resetDateTime(date);
    return globalTableData.tasks.filter(function(item){
        return (parseDate(item.planStartDate).getTime() === date.getTime() && item.executor === user.id);
    });
}

function generateHtmlTasks(tasks, user, date) {
    let html = `<td data-date="${date}" data-user-id="${user.id}" class="dropzone text-center">`;
    for (let i = 0; i < tasks.length; i++) {
        html += `<div data-id="${tasks[i].id}" draggable="true" class="w-100 p-2 mb-2 info task ${getStatus(tasks[i])}">
        <h6 class="">
        ${tasks[i].subject}
      </h6>
      <p class="mb-0">
        ${getTheRemainingTimeBeforeTheTaskIsCompleted(tasks[i])}
        </p>
        <span class="tooltip-span">
          <p class="tooltip-text">Тема: ${tasks[i].subject}</p>
          <p class="tooltip-text">Описание: ${tasks[i].description === ""?"отсутствует":tasks[i].description}</p>
          <p class="tooltip-text">Автор: ${getFullName(getUserById(globalTableData.users, tasks[i].creationAuthor))}</p>
          <p class="tooltip-text">До завершения: ${getTheRemainingTimeBeforeTheTaskIsCompleted(tasks[i])}</p>
          <p class="tooltip-text">Дата создания: ${getCreationDate(tasks[i])}</p>
          <p class="tooltip-text">Дата завершения: ${getPlanEndDate(tasks[i])}</p>
          <p class="tooltip-text">Статус: ${getStatus(tasks[i])}</p>
        </span>
      </div>`
    }
    html += `</td>`;
    return html;
}
