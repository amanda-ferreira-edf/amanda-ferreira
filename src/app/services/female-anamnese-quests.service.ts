import { Injectable } from "@angular/core";
// import { questsMock } from "../mock/quests-mock";
import { QuestsDTO } from "../models/questsDTO";
import { femaleQuestsIdMock } from "../mock/females-quest-id-mock";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { EnvService } from "./env.service";
@Injectable({
  providedIn: 'root'
})
export class FemaleAnamneseQuests {
  // femalesQuestsId: number[] = femaleQuestsIdMock
  apiUrl
  constructor(private http: HttpClient, private env: EnvService) {
    this.apiUrl = this.env.get('API_URL') || 'http://localhost:8000/api/v1';
  }
  getQuests(): Observable<QuestsDTO[]> {
    let params = new HttpParams();
    params = params.append('question_list_id', '1');
    return this.http.get<QuestsDTO[]>(`${this.apiUrl}/questions`, { params: params });
  }

  updateFemalesQuestsId(femalesQuestsId: number[]): Observable<{ question_list_id: number, question_id: string }> {
    let body = { question_list_id: 1, question_id: femalesQuestsId.join(',') };
    return this.http.put<{ question_list_id: number, question_id: string }>(`${this.apiUrl}/update-question-list`, body);
  }

}
