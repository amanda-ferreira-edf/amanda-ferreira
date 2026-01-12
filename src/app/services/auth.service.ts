import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserDTO } from "../models/userDTO";
import { environment } from "../../environments/environment";
import { EnvService } from "./env.service";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userLogged = new BehaviorSubject<UserDTO|null>(null);
    public userLogged$ = this._userLogged.asObservable();
    apiUrl
    constructor(private http: HttpClient, private env: EnvService) {
        this.apiUrl = this.env.get('API_URL') || 'http://localhost:8000/api/v1';
     }

    loginAuth2(response: any): Observable<UserDTO> {
        let formData = new FormData();
        formData.append('credential', response.credential)
        return this.http.post<UserDTO>(`${this.apiUrl}/auth/google`, formData);

    }
    login(user: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(`${this.apiUrl}/auth`, user);
    }
    logout() {
        localStorage.removeItem('userLogged');
    }

    getUserLogged() {
        let userLogged = localStorage.getItem('userLogged');
        if (!userLogged) return null;
        return JSON.parse(userLogged);
    }
    setUserLogged(userLogged: UserDTO|null) {
        this._userLogged.next(userLogged);
    }
    setLocalStorageUserLogged(userLogged: UserDTO) {
        localStorage.setItem('userLogged', JSON.stringify(userLogged));
    }

    createUser(user: UserDTO): Observable<UserDTO> {
        let userDTO = {
            email: user.email,
            password: user.password, 
            name: user.name,
            role: user.role,
            account_google: false,
            sended: false
        }
        return this.http.post<UserDTO>(`${this.apiUrl}/user`, userDTO);
    }
}