import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Page } from 'tns-core-modules/ui/page';

import * as fromRoot from '~/app/store/reducers';
import { Task } from '~/app/models/task';
import { map } from 'rxjs/operators';


@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild("rsd") rSideDrawer: ElementRef;

    tasks$: Observable<Task[]>;
    activeTasks$: Observable<Task[]>;
    pages: { index: number, name: string, url: string }[] = [
        {index: 0, name: "Home", url: '/home'},
        {index: 1, name: "Done tasks", url: '/home/done-tasks'},
        {index: 2, name: "Settings", url: '/settings'}
    ];

    constructor(private store: Store<fromRoot.State>, private page: Page) {
        this.tasks$ = store.pipe(select(fromRoot.getAllTasks));
        this.activeTasks$ = this.tasks$.pipe(
            map(tasks => tasks.filter(task => task.done !== true))
        )
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    onOpenDrawerTap(): void {
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }

    onCloseDrawerTap(): void {
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }


}
