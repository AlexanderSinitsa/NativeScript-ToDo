import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'ns-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    moduleId: module.id,
})
export class NotFoundComponent {

    constructor(private routerExtensions: RouterExtensions) {
    }

    goBack(): void {
        this.routerExtensions.back();
    }

}
