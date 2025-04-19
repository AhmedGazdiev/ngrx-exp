import { createSelector } from '@ngrx/store'
import { userFeature } from './user.reducer'

export const selectAllUsers = createSelector(
    userFeature.selectUsersState,
    state => state.users
)
export const selectUser = createSelector(
    userFeature.selectUsersState,
    state => state.user
)
export const selectUserLoading = createSelector(
    userFeature.selectUsersState,
    state => state.loading
)
export const selectUserError = createSelector(
    userFeature.selectUsersState,
    state => state.error
)
