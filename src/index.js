import {createTable } from './create-table'
import {rootReducer} from './redux/table/table-reducer'
import {
  asyncLoadData,
  initApplication,
  nextDates,
  previousDates,
  setFilterBacklogByName
} from './redux/actions'
import './styles.css'
import {generateTable} from "./redux/table/generator-table";
import {applyTableEvents} from "./redux/table/event-table-manager";
import {generateBacklog} from "./redux/backgog/generator-backlog";
import {applyBacklogEvents} from "./redux/backgog/event-backlog-manager";

const tableReducer = createTable(
    rootReducer,

)

$( "#nextDates").click(function() {
  tableReducer.dispatch(nextDates());
});

$("#previousDates").click(function() {
  tableReducer.dispatch(previousDates());
});

$( ".input-group-append").click(function() {
  let name = $(".input-filter-backlog")[0].value;
  tableReducer.dispatch(setFilterBacklogByName(name));
});

tableReducer.subscribe(() => {
  const state = tableReducer.getState();
  if (!$.isEmptyObject(state.table.users) && !$.isEmptyObject(state.table.tasks)) {
    console.log(state)
    generateTable(state.table);
    generateBacklog(state.table.tasks, state.backlog.filterName);
    applyTableEvents(tableReducer);
    applyBacklogEvents(tableReducer);
  }
})
tableReducer.dispatch(initApplication())
tableReducer.dispatch(asyncLoadData(tableReducer))
