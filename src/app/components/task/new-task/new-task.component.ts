import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';
import { ITask, Task } from "~/app/models/task";
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';


@Component({
    moduleId: module.id,
    selector: 'ns-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnDestroy {
    @ViewChild('input') inputEl: ElementRef;
    description = '';
    editedTaskSub;
    editedTask: ITask;

    constructor(private store: Store<fromRoot.State>) {
        this.editedTaskSub = store.select(fromRoot.getEditedTask)
            .subscribe(editedTask => {
                if (editedTask) {
                    this.editedTask = editedTask;
                    this.description = editedTask.description;
                    setTimeout(() => {
                        this.inputEl.nativeElement.focus();
                        this.inputEl.nativeElement.android.setSelection(this.description.length);
                    })
                }
            });
    }

    confirm(event) {
        if (this.description) {
            // edit an existing task
            if (this.editedTask && this.editedTask.id) {
                const updateTask: Update<ITask> = {
                    id: this.editedTask.id,
                    changes: {description: this.description}
                };
                this.store.dispatch(new taskAction.EditDescription(updateTask));
                this.editedTask = null;
                setTimeout(() => {
                    this.inputEl.nativeElement.dismissSoftInput();
                    // this.inputEl.nativeElement.clearFocus();
                    event.object.page.getViewById('input').nativeView.clearFocus()
                }, 0)
            } else {
                // create a new task
                const newTask: ITask = new Task(this.description);
                this.store.dispatch(new taskAction.AddTask(newTask));
            }
            this.description = '';
        }
    }

    ngOnDestroy() {
        this.editedTaskSub.unsubscribe();
    }


}
