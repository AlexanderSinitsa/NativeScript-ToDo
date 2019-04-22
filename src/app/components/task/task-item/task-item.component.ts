import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '~/app/models/task';
import { Store } from '@ngrx/store';
import * as fromRoot from '~/app/store/reducers';
import * as taskAction from '~/app/store/actions/tasks';
import { Observable } from 'rxjs';


@Component({
    moduleId: module.id,
    selector: 'ns-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
    @Input() task: Task;
    @Output() select = new EventEmitter();
    @ViewChild('input') inputEl: ElementRef;

    selectedId$: Observable<any>;

    isEditable = false;
    newTaskDescription = '';

    constructor(private store: Store<fromRoot.State>) {
        this.selectedId$ = store.select(fromRoot.getSelected);
    }

    ngOnInit() {
    }

    selectTask() {
        this.store.dispatch(new taskAction.Select(this.task.id));
    }

    toggleTaskStatus(event, id: number) {
        // console.log(event, '--');
        this.store.dispatch(new taskAction.ToggleTaskStatus(id))
    }

    doEditable() {
        this.newTaskDescription = this.task.description;
        this.isEditable = true;
        setTimeout(() => {
            this.inputEl.nativeElement.focus();
        }, 0)
    }

    onBlur() {
        this.isEditable = false;
    }

    // onReturnPress(event) {
    //     // this.isEditable = false;
    //     // this.task.description = this.newTaskDescription;
    //     // this.store.dispatch(new taskAction.EditDescription(this.task))
    // }

    confirmDescription() {
        this.isEditable = false;
        this.task.description = this.newTaskDescription;
        this.store.dispatch(new taskAction.EditDescription(this.task))
    }


}
