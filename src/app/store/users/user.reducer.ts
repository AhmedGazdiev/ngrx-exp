import { createFeature, createReducer, on } from '@ngrx/store'
import { UserActions } from './user.actions'
import { User } from './user.models'

export interface UserState {
    loading: boolean
    error: string | null
    users: User[]
    user: User | null
}

export const initialState: UserState = {
    loading: false,
    error: null,
    users: [],
    user: null,
}

export const userFeature = createFeature({
    name: 'users',
    reducer: createReducer(
        initialState,
        // load users
        on(UserActions.loadUsers, state => ({ ...state, loading: true })),
        on(UserActions.loadUsersSuccess, (state, { users }) => ({
            ...state,
            loading: false,
            users: users,
        })),
        on(UserActions.loadUsersFailure, (state, { error }) => ({
            ...state,
            error: error,
        })),

        // load user with id
        on(UserActions.loadUser, state => ({ ...state, loading: true })),
        on(UserActions.loadUserSuccess, (state, { user }) => ({
            ...state,
            loading: false,
            user: user,
        })),
        on(UserActions.loadUserFailure, (state, { error }) => ({
            ...state,
            error: error,
        })),

        // Update user
        on(UserActions.updateUser, state => ({ ...state, loading: true })),
        on(UserActions.updateUserSuccess, (state, { user }) => ({
            ...state,
            loading: false,
            users: state.users.map(u => (user.id === u.id ? user : u)),
        })),
        on(UserActions.updateUserFailure, (state, { error }) => ({
            ...state,
            error: error,
        })),

        // Delete user
        on(UserActions.deleteUser, state => ({ ...state, loading: true })),
        on(UserActions.deleteUserSuccess, (state, { id }) => ({
            ...state,
            loading: false,
            users: state.users.filter(u => u.id !== id),
        })),
        on(UserActions.deleteUserFailure, (state, { error }) => ({
            ...state,
            error: error,
        }))
    ),
})
