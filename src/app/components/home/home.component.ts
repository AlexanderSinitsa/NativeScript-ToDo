import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '~/app/store/reducers';
import { Task } from '~/app/models/task';
import * as taskAction from '~/app/store/actions/tasks';


@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    tasks$: Observable<Task[]>;

    constructor(private store: Store<fromRoot.State>) {
        // this.tasks$ = store.select(fromRoot.getAllTasks);
        this.tasks$ = store.pipe(select(fromRoot.getAllTasks));
    }

    deleteDoneTasks() {
        this.store.dispatch(new taskAction.DeleteDoneTasks())
    }


}
