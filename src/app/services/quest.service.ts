import { Injectable } from '@angular/core';
// import { questsMock } from '../mock/quests-mock';
import { QuestsDTO } from '../models/questsDTO';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerDTO } from '../models/answerDTO';
import { environment } from "../../environments/environment";
import { EnvService } from './env.service';
@Injectable(
    {
        providedIn: 'root'
    }
)
export class QuestService {
        apiUrl
        constructor(private http: HttpClient, private env: EnvService) {
            this.apiUrl = this.env.get('API_URL') || 'http://localhost:8000/api/v1';
         }

    updateQuests(updatedQuest: QuestsDTO): Observable<QuestsDTO> {
        return this.http.patch<QuestsDTO>(`${this.apiUrl}/update-question`, updatedQuest);
    }

    addQuests(newQuest: QuestsDTO): Observable<QuestsDTO>  {
        // this.quests.push(newQuest);
        return this.http.post<QuestsDTO>(`${this.apiUrl}/create-question`, newQuest);
    }

    removeQuests(questId: number): Observable<QuestsDTO> {
        let params = new HttpParams();
        params = params.append('questionId', questId.toString());
        return this.http.delete<QuestsDTO>(`${this.apiUrl}/delete-question` , { params: params });
    }
    getAllQuests(): Observable<QuestsDTO[]> {
         return this.http.get<QuestsDTO[]>(`${this.apiUrl}/questions`);
    }

    getAnswers(userId: string): Observable<AnswerDTO[]> {
        let params = new HttpParams();
        params = params.append('userId', userId);
        return this.http.get<AnswerDTO[]>(`${this.apiUrl}/answers`, { params: params });
    }

    addUpdateAnswer(answer: AnswerDTO): Observable<AnswerDTO> {
        return this.http.post<AnswerDTO>(`${this.apiUrl}/answer`, answer);
    }
}