import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '~/app/models/task';


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

    constructor() {
    }

    ngOnInit() {
    }

    onTap() {
        console.log('Tap <- item');
        this.select.emit(event)
    }

}
