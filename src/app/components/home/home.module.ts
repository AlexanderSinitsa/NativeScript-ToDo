import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TaskModule } from './../task/task.module';
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "~/app/store/reducers";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        // StoreModule.forRoot(reducers, { metaReducers }),
        StoreModule.forRoot(reducers),
        TaskModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }


