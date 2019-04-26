import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { DoneTasksComponent } from '~/app/components/home/done-tasks/done-tasks.component';
import { HomeComponent } from '~/app/components/home/home.component';

const routes: Routes = [
    {path: "", pathMatch: "full", component: HomeComponent},
    {path: "done-tasks", component: DoneTasksComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule {
}
