import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-done-tasks',
  templateUrl: './done-tasks.component.html',
  styleUrls: ['./done-tasks.component.css'],
  moduleId: module.id,
})
export class DoneTasksComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.routerExtensions.back();
    }
}
