import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { EffectsModule } from '@ngrx/effects';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskEffects } from '~/app/store/effects/sync-store.effects';


@NgModule({
    imports: [
        CommonModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        EffectsModule.forFeature([TaskEffects])
    ],
    declarations: [TaskListComponent, TaskItemComponent, NewTaskComponent],
    exports: [TaskListComponent, TaskItemComponent, NewTaskComponent]
})
export class TaskModule {
}
