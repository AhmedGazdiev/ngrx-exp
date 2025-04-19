import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { UserService } from '../../services/user.service'
import { UserActions } from './user.actions'

@Injectable()
export class UserEffects {
    actions$ = inject(Actions)
    api = inject(UserService)

    public loadUsersEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() =>
                this.api.getUsers().pipe(
                    map(res =>
                        UserActions.loadUsersSuccess({
                            users: res,
                        })
                    ),
                    catchError(() =>
                        of(
                            UserActions.loadUsersFailure({
                                error: "Couldn't get users",
                            })
                        )
                    )
                )
            )
        )
    )

    public loadUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap(({ id }) =>
                this.api.getUserById(id).pipe(
                    map(res =>
                        UserActions.loadUserSuccess({
                            user: res,
                        })
                    ),
                    catchError(() =>
                        of(
                            UserActions.loadUserFailure({
                                error: "Couldn't get user",
                            })
                        )
                    )
                )
            )
        )
    )

    public updateUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            switchMap(({ id, data }) =>
                this.api.updateUser(id, data).pipe(
                    map(res =>
                        UserActions.updateUserSuccess({
                            user: res,
                        })
                    ),
                    catchError(() =>
                        of(
                            UserActions.updateUserFailure({
                                error: "Couldn't update user",
                            })
                        )
                    )
                )
            )
        )
    )

    public deleteUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            switchMap(({ id }) =>
                this.api.deleteUser(id).pipe(
                    map(() => UserActions.deleteUserSuccess({ id })),
                    catchError(() =>
                        of(
                            UserActions.deleteUserFailure({
                                error: "Couldn't delete user",
                            })
                        )
                    )
                )
            )
        )
    )
}
