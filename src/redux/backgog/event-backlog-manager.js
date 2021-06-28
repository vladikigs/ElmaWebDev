import {changeInTable} from "../actions";

export function applyBacklogEvents(table) {
    $('.list-group-item')
        .on('dragend', function(e) {
            const state = table.getState();
            state.dragElement = e.target
            if (state.dragContainer == null) return;
            if (state.dragContainer.classList.contains("dropzone")) {
                table.dispatch(changeInTable(state.dragElement, state.dragContainer));
            }
            state.dragContainer = null;
        })
        .on('drop', function(e) {
            e.target.classList.remove('drop');
            const state = table.getState();
            state.dragContainer = e.target;
            return true;
        });
}
