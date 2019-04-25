import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';
import { ITask, Task } from "~/app/models/task";


@Component({
    moduleId: module.id,
    selector: 'ns-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
    description = '';

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    addTask() {
        if (this.description) {
            const newTask: ITask = new Task(this.description);
            this.store.dispatch(new taskAction.AddTask(newTask));
            this.description = '';
        }
    }

}
