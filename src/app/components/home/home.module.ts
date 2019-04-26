import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { StoreModule } from '@ngrx/store';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TaskModule } from './../task/task.module';
import { metaReducers, reducers } from "~/app/store/reducers";
import { TaskEffects } from '~/app/store/effects/sync-store.effects';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        // StoreModule.forRoot(reducers, { metaReducers }),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([TaskEffects]),
        TaskModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        HomeComponent,
        DoneTasksComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule {
}


