import {SET_FILTER_BACKLOG_BY_NAME} from '../types'
import {setFilterByName} from "./filter-backlog-manager";

const initialTableState = {
    filterName: "",
}

export function backlogReducer(state = initialTableState, action) {
    switch (action.type) {
        case SET_FILTER_BACKLOG_BY_NAME:
            return state = {...state, filterName: action.filterName};
        default: return state
    }
}
