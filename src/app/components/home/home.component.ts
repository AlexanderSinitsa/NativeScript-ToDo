import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Page } from 'tns-core-modules/ui/page';

import * as fromRoot from '~/app/store/reducers';
import { Task } from '~/app/models/task';
import * as taskAction from '~/app/store/actions/tasks';


@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    tasks$: Observable<Task[]>;
    @ViewChild("rsd") rSideDrawer: ElementRef;

    pages: { index: number, name: string }[] = [
        {index: 0, name: "Home"},
        {index: 1, name: "Done tasks"},
        {index: 2, name: "Settings"}
    ];

    constructor(private store: Store<fromRoot.State>, private page: Page) {
        // this.tasks$ = store.select(fromRoot.getAllTasks);
        this.tasks$ = store.pipe(select(fromRoot.getAllTasks));
    }

    deleteDoneTasks() {
        this.store.dispatch(new taskAction.DeleteDoneTasks())
    }


    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }


    onOpenDrawerTap(args): void {
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }

    goToPage(args): void {
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }


}
