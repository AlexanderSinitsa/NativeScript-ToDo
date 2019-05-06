import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appSettings from "tns-core-modules/application-settings";
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as taskAction from '~/app/store/actions/tasks';
import * as fromRoot from '~/app/store/reducers';


@Injectable()
export class TaskEffects {

    constructor(private actions$: Actions, private store: Store<fromRoot.State>) {
    }

    @Effect({dispatch: false})
    saveAllStat$: Observable<any> = this.actions$.pipe(
        ofType(
            // Save state to device memory upon these actions:
            taskAction.TOGGLE_TASK_STATUS,
            taskAction.ADD_TASK,
            taskAction.EDIT_DESCRIPTION,
            taskAction.DELETE_DONE_TASKS),
        switchMap(action => this.store.pipe(
            select(fromRoot.getTaskState),
            take(1),
            tap(state => {
                try {
                    // Save state to device memory
                    appSettings.setString("state", JSON.stringify(state));
                    // const stateBackup = appSettings.getString("state");
                    console.log("action ==>", action);
                    console.log('state ==>', state);
                } catch (err) {
                    console.error(err);
                }
            })
            )
        ),
    );

}
