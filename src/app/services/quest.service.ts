import { Injectable } from '@angular/core';
// import { questsMock } from '../mock/quests-mock';
import { QuestsDTO } from '../models/questsDTO';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerDTO } from '../models/answerDTO';
import { environment } from "../../environments/environment";
@Injectable(
    {
        providedIn: 'root'
    }
)
export class QuestService {
    constructor(private http: HttpClient) { }

    updateQuests(updatedQuest: QuestsDTO): Observable<QuestsDTO> {
        return this.http.patch<QuestsDTO>(`${environment.apiUrl}/update-question`, updatedQuest);
    }

    addQuests(newQuest: QuestsDTO): Observable<QuestsDTO>  {
        // this.quests.push(newQuest);
        return this.http.post<QuestsDTO>(`${environment.apiUrl}/create-question`, newQuest);
    }

    removeQuests(questId: number): Observable<QuestsDTO> {
        let params = new HttpParams();
        params = params.append('questionId', questId.toString());
        return this.http.delete<QuestsDTO>(`${environment.apiUrl}/delete-question` , { params: params });
    }
    getAllQuests(): Observable<QuestsDTO[]> {
         return this.http.get<QuestsDTO[]>(`${environment.apiUrl}/questions`);
    }

    getAnswers(userId: string): Observable<AnswerDTO[]> {
        let params = new HttpParams();
        params = params.append('userId', userId);
        return this.http.get<AnswerDTO[]>(`${environment.apiUrl}/answers`, { params: params });
    }

    addUpdateAnswer(answer: AnswerDTO): Observable<AnswerDTO> {
        return this.http.post<AnswerDTO>(`${environment.apiUrl}/answer`, answer);
    }
}