import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { NewTaskComponent } from './new-task/new-task.component';



@NgModule({
    imports: [CommonModule, NativeScriptCommonModule, NativeScriptFormsModule],
    declarations: [TaskListComponent, TaskItemComponent, NewTaskComponent],
    exports: [TaskListComponent, TaskItemComponent, NewTaskComponent]
})
export class TaskModule {
}
