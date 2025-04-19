import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
    ApplicationConfig,
    isDevMode,
    provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'
import { UserEffects } from './store/users/user.effects'
import { userFeature } from './store/users/user.reducer'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([])),
        provideStore({
            [userFeature.name]: userFeature.reducer,
        }),
        provideEffects([UserEffects]),
        isDevMode()
            ? provideStoreDevtools({ maxAge: 25, autoPause: true })
            : [],
    ],
}
