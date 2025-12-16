import { Component, OnInit, signal, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { FemaleQuest } from '../../models/female-quest';
import { QuestsDTO } from '../../models/questsDTO';
import { FemaleAnamneseQuests } from '../../services/female-anamnese-quests.service';
import { CommonModule } from '@angular/common';
import { QuestComponent } from '../../components/quest-component/quest-component';
import { DialogModule } from 'primeng/dialog';
import { PickListModule } from 'primeng/picklist';
import { AdminQuests } from "../../components/admin-quests/admin-quests";
import { FormsModule } from '@angular/forms';
import { LoginWithGoogle } from "../../components/login-with-google/login-with-google";
import { LoginModal } from "../../components/login-modal/login-modal";
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../models/userDTO';
import { QuestService } from '../../services/quest.service';
import { AnswerDTO } from '../../models/answerDTO';
@Component({
  selector: 'app-female-anamnese',
  imports: [
    ButtonModule,
    ImageModule,
    DividerModule,
    CardModule,
    CommonModule,
    FormsModule,
    QuestComponent,
    DialogModule,
    PickListModule,
    AdminQuests,
    LoginModal,
    LoginWithGoogle
  ],
  templateUrl: './female-anamnese.html',
  styleUrl: './female-anamnese.css',
})
export class FemaleAnamnese implements OnInit {
  questsFemale = signal<QuestsDTO[]>([]);
  questsID = signal<number[]>([]);
  admin = true;
  displayModalLogin = false;
  loggedDisplay = 'block';
  loggedDisplayFalse = 'none';
  firstGetAnswers = true;
  constructor(private femaleAnamneseQuests: FemaleAnamneseQuests, private authService: AuthService, private quests: QuestService) {
    effect(() => {
      let quests = this.questsFemale();  // <-- leitura do Signal
      if (this.firstGetAnswers && this.questsFemale().length > 0) {
        this.getAnswers();
        this.firstGetAnswers = false
      }
    }
    );
  }
  ngOnInit(): void {
    this.authService.userLogged$.subscribe((userLogged: UserDTO | null) => {
      if (userLogged) {
        this.loggedDisplayFalse = 'block';
        this.loggedDisplay = 'none';
        this.getQuests();
      } else {
        this.loggedDisplayFalse = 'none';
        this.loggedDisplay = 'block';
        this.questsFemale.set([]);
        this.questsID.set([]);
        this.firstGetAnswers = true;
      }
    });
  }
  getQuests() {
    this.femaleAnamneseQuests.getQuests().subscribe((quests: QuestsDTO[]) => {
      this.questsFemale.set(quests ?? []);
      this.questsID.set(this.questsFemale().map(q => q.questionId!));

    });
  }

  getAnswers() {
    this.quests.getAnswers(this.authService.getUserLogged()!.user.idUser).subscribe((answer: AnswerDTO[]) => {
      this.questsFemale().forEach((quest: any) => {
        answer.forEach((ans: any) => {
          if (quest.questionId == ans.question?.questionId) {
            quest.response = ans.response;
            quest.idAnswer = ans.idAnswer
          }
        })
      })
      this.questsFemale.set(this.questsFemale().map(q => ({ ...q })));
    })
  }

  clickStart() {
    // this.displayModalLogin = true
    this.loggedDisplay = 'none';
    this.loggedDisplayFalse = 'block';
    // this.smoothScroll('Anamnese');
  }

  smoothScroll(target: string) {
    const targetElement = document.getElementById(target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onResponse(event: any) {
    this.questsFemale().forEach((quest: any) => {
      if (quest.questionId == event.quest.questionId) {
        quest.response = event.response;
      }
    })
    this.questsFemale.set(this.questsFemale());
  }


  onUpdateQuest(event?: any) {
    this.femaleAnamneseQuests.updateFemalesQuestsId(event ?? this.questsID()).subscribe((response: any) => {
      this.getQuests()
    });
  }

}
