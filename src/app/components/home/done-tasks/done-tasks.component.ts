import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
// import { Page } from 'tns-core-modules/ui/page';

import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';
import { ITask, Task } from '~/app/models/task';
import { filter, map, tap } from 'rxjs/operators';

@Component({
    selector: 'ns-done-tasks',
    templateUrl: './done-tasks.component.html',
    styleUrls: ['./done-tasks.component.css'],
    moduleId: module.id,
})
export class DoneTasksComponent implements OnInit {
    tasks$: Observable<Task[]>;
    doneTasks$: Observable<Task[]>;

    constructor(
        private routerExtensions: RouterExtensions,
        private store: Store<fromRoot.State>,
    ) {
        this.tasks$ = store.pipe(select(fromRoot.getAllTasks));
        this.doneTasks$ = this.tasks$.pipe(
            map(tasks => tasks.filter(task => task.done === true))
        )
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    deleteDoneTasks() {
        this.store.dispatch(new taskAction.DeleteDoneTasks())
    }
}
