import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        console.log({
            type: "Apple",
            color: "Red"
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
