import { AsyncPipe } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserActions } from './store/users/user.actions'
import { UserState } from './store/users/user.reducer'
import {
    selectAllUsers,
    selectUserError,
    selectUserLoading,
} from './store/users/user.selectors'

@Component({
    selector: 'app-root',
    imports: [AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private store = inject(Store<UserState>)

    public loading$ = this.store.select(selectUserLoading)
    public error$ = this.store.select(selectUserError)
    public _users = this.store.selectSignal(selectAllUsers)

    ngOnInit(): void {
        this.store.dispatch(UserActions.loadUsers())
    }

    deleteUser(id: number) {
        this.store.dispatch(UserActions.deleteUser({ id }))
    }
}
