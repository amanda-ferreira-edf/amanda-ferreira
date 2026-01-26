import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvService } from "./env.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    apiUrl
    constructor(private http: HttpClient, private env: EnvService) {
        this.apiUrl = this.env.get('API_URL') || 'http://localhost:8000/api/v1';
    }

    sendEmailWithAttachment(email: string, name: string, file: Blob): Observable<any> {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('file', file, `anamnese${name}.pdf`);
        return this.http.post(`${this.apiUrl}/send-email`, formData);
    }
}// Replace with your backend URL