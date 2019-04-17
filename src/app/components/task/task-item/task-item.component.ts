import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '~/app/models/task';
import { Store } from '@ngrx/store';
import * as fromRoot from '~/app/store/reducers';
import * as taskAction from '~/app/store/actions/tasks';


@Component({
    moduleId: module.id,
    selector: 'ns-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
    @Input() task: Task;
    @Input() selectedId: number;
    @Output() select = new EventEmitter();

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onTap() {
        console.log('Tap <- item');
        this.select.emit()
    }

    toggleTaskStatus(id: number) {
        this.store.dispatch(new taskAction.toggleTaskStatus(id))
    }

}
