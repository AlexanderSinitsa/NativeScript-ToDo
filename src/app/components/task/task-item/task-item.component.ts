import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ITask } from '~/app/models/task';
import { Store } from '@ngrx/store';
import * as fromRoot from '~/app/store/reducers';
import * as taskAction from '~/app/store/actions/tasks';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';


@Component({
    moduleId: module.id,
    selector: 'ns-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent  {
    @Input() task: ITask;

    selectedId$: Observable<string>;

    constructor(private store: Store<fromRoot.State>) {
        this.selectedId$ = store.select(fromRoot.getSelected);
    }

    selectTask() {
        this.store.dispatch(new taskAction.Select(this.task.id));
    }

    toggleTaskStatus() {
        const updateTask: Update<ITask> = {
            id: this.task.id,
            changes: {done: !this.task.done}
        };
        this.store.dispatch(new taskAction.ToggleTaskStatus(updateTask))
    }

    edit() {
        this.store.dispatch(new taskAction.StartEditing(this.task.id))
    }

    // onReturnPress(event) {
    //     // this.isEditable = false;
    //     // this.task.description = this.newTaskDescription;
    //     // this.store.dispatch(new taskAction.EditDescription(this.task))
    // }

}
