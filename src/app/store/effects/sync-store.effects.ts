import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appSettings from "tns-core-modules/application-settings";
import { Observable } from 'rxjs';

import * as taskAction from '~/app/store/actions/tasks';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '~/app/store/reducers';
import { catchError } from 'rxjs/internal/operators/catchError';


@Injectable()
export class TaskEffects {

    constructor(private actions$: Actions, private store: Store<fromRoot.State>) {
    }

    @Effect({dispatch: false})
    saveAllStat$: Observable<any> = this.actions$.pipe(
        ofType(taskAction.TOGGLE_TASK_STATUS, taskAction.ADD_TASK),
        tap(() => {
            this.store.pipe(select(fromRoot.getTaskState))
                .subscribe(state => {
                        try {
                            appSettings.setString("state", JSON.stringify(state));
                            const stateBackup = appSettings.getString("state");
                            console.log(stateBackup);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                );

        })
    );

}
