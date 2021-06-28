import {setFilterByName} from "./filter-backlog-manager";

export function generateBacklog(tasks, filterName) {
    let htmlBacklog = "";
    let backlogTasks = getTasksForBacklog(tasks);
    backlogTasks.forEach(
        function setBacklog(value) {
            htmlBacklog +=
                `<li class="info w-100 p-2 mb-2 list-group-item cursor-pointer" data-id="${value.id}" draggable="true">
                  <h5 class="backlog-item-name">${value.subject}</h5>
                  <p  class="mb-0">${value.description}</p>
                </li>`;
        }
    );
    $('.list-group')[0].innerHTML = htmlBacklog;
    setFilterByName(filterName);
}

function getTasksForBacklog(tasks) {
    return tasks.filter(function(item){
        return (item.executor == null);
    });
}
