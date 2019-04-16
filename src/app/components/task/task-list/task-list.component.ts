import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Task } from '~/app/models/task';
import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';
import { Observable } from 'rxjs';

import { ListView } from "tns-core-modules/ui/list-view";

@Component({
    moduleId: module.id,
    selector: 'ns-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    @Input() tasks$: Observable<Task[]>;

    selectedId$: Observable<any>;

    constructor(private store: Store<fromRoot.State>) {
        this.selectedId$ = store.select(fromRoot.getSelected);
    }

    ngOnInit() {
        // setTimeout(() => {
        //     console.log(this.task);
        // }, 4000)
    }

    onSelect(id) {
        console.log('tap <- list', id);
        this.store.dispatch(new taskAction.Select(id));
    }


    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }
}
