import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '~/app/models/task';


@Component({
    moduleId: module.id,
    selector: 'ns-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    @Input() tasks$: Observable<Task[]>;
    @Input() showDoneTasks: boolean = false;

    filteredTasks$: Observable<Task[]>;

    ngOnInit() {
        this.filteredTasks$ = this.tasks$.pipe(
            map(tasks => tasks.filter(task => task.done === this.showDoneTasks))
        )
    }

}
