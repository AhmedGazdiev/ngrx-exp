import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { User } from '../store/users/user.models'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient)
    private api = 'https://jsonplaceholder.typicode.com/users'

    public getUsers() {
        return this.http.get<User[]>(this.api)
    }

    public getUserById(id: number) {
        return this.http.get<User>(`${this.api}/${id}`)
    }

    public updateUser(id: number, data: Partial<User>) {
        return this.http.patch<User>(`${this.api}/${id}`, data)
    }

    public deleteUser(id: number) {
        return this.http.delete<any>(`${this.api}/${id}`)
    }
}
