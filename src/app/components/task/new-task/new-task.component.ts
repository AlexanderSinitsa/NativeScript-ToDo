import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';


@Component({
    moduleId: module.id,
    selector: 'ns-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
    selectedId$: Observable<any>;
    description = '';

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    addTask() {
        if (this.description) {
            this.store.dispatch(new taskAction.AddTask(this.description));
            this.description = '';
        }

    }


}
