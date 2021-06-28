import {changeInTable} from "../actions";

export function applyTableEvents(table) {
    $('.dropzone')
        .on('dragenter', function(e) {
            e.target.classList.add('drop');
        })
        .on('dragstart', function(e) {
            e.originalEvent.target.lastElementChild.style.display = "none"
        })

        .on('dragleave', function(e) {
            e.target.classList.remove('drop');
        })

        .on('dragover', function(e) {
            e.preventDefault();

        })

        .on('drop', function(e) {
            e.target.classList.remove('drop');
            const state = table.getState();
            state.dragContainer = e.target;
        })

        .on('dragend', function(e) {
            const state = table.getState();
            state.dragElement = e.target;
            if (state.dragContainer == null) return;
            if (state.dragContainer.classList.contains("dropzone")) {
                state.dragElement.lastElementChild.style.display = "inline"
                table.dispatch(changeInTable(state.dragElement, state.dragContainer));
            }
            state.dragContainer = null;
        });
}
