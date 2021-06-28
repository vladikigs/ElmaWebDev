import {formatDateToString, parseDate} from "./date-manager";

export function getTheRemainingTimeBeforeTheTaskIsCompleted(task) {
    let remainingTime = (parseDate(task.planEndDate) - parseDate(task.planStartDate))/36e5;
    if (remainingTime < 0 ) {
        return "(просрочено)"
    }
    return `(${Math.round(remainingTime)}ч)`;
}

export function getCreationDate(task) {
    return formatDateToString(task.creationDate);
}

export function getPlanEndDate(task) {
    return formatDateToString(task.planEndDate);
}

export function getStatus(task) {
    switch(task.status) {
        case -1:
            return "overdue";
        case 0:
            return "";
        case 1:
            return "completed";
    }
}

export function editDataForTask(tasks, taskId, date, userId) {
    return tasks.map(item => {
        if (item.id === taskId) {
            item.planStartDate = new Date(date);
            item.executor = parseInt(userId);
        }
        return item;
    });
}
