import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Task } from '~/app/models/task';
import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    selector: 'ns-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    @Input() tasks$: Observable<Task[]>;
    @Input() showDoneTasks: boolean = false;

    selectedId$: Observable<any>;
    filteredTasks$: Observable<Task[]>;

    constructor(private store: Store<fromRoot.State>) {
        this.selectedId$ = store.select(fromRoot.getSelected);
    }

    ngOnInit() {
        this.filteredTasks$ = this.tasks$.pipe(
            map(tasks => tasks.filter(task => task.done === this.showDoneTasks))
        )
    }

    onSelect(id) {
        console.log('tap <- list', id);
        this.store.dispatch(new taskAction.Select(id));
    }

}
