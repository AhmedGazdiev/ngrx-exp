import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { User } from './user.models'

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        // load users
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),

        // load user by id
        'Load User': props<{ id: number }>(),
        'Load User Success': props<{ user: User }>(),
        'Load User Failure': props<{ error: string }>(),

        // update user
        'Update User': props<{ id: number; data: Partial<User> }>(),
        'Update User Success': props<{ user: User }>(),
        'Update User Failure': props<{ error: string }>(),

        // delete user
        'Delete User': props<{ id: number }>(),
        'Delete User Success': props<{ id: number }>(),
        'Delete User Failure': props<{ error: string }>(),
    },
})
