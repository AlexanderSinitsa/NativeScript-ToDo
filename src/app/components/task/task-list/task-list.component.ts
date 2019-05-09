import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '~/app/models/task';


@Component({
    moduleId: module.id,
    selector: 'ns-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
    @Input() tasks$: Observable<Task[]>;
}
