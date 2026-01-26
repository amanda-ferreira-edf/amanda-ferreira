import { Component, OnInit, signal, effect, HostListener, ViewChild, ElementRef } from '@angular/core';
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
import { FormsModule, NgForm } from '@angular/forms';
import { LoginWithGoogle } from "../../components/login-with-google/login-with-google";
import { LoginModal } from "../../components/login-modal/login-modal";
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../models/userDTO';
import { QuestService } from '../../services/quest.service';
import { AnswerDTO } from '../../models/answerDTO';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmailService } from '../../services/email.service';

(pdfMake as any).vfs = (pdfFonts as any).vfs;
export interface Html2PdfOptions {
  margin?: number | [number, number, number, number];
  filename?: string;
  image?: {
    type?: 'jpeg' | 'png' | 'webp';
    quality?: number;
  };
  html2canvas?: any;
  jsPDF?: {
    unit?: string;
    format?: string | [number, number];
    orientation?: 'portrait' | 'landscape';
  };
}


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
    LoginWithGoogle,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './female-anamnese.html',
  styleUrl: './female-anamnese.css',
})
export class FemaleAnamnese implements OnInit {
  questsFemale = signal<QuestsDTO[]>([]);
  questsID = signal<number[]>([]);
  onBottom = signal<boolean>(false);
  admin = false;
  displayModalLogin = false;
  loggedDisplay = 'block';
  loggedDisplayFalse = 'none';
  firstGetAnswers = true;
  @ViewChild('toPrint', { static: false }) toPrintElement!: ElementRef;
  constructor(private femaleAnamneseQuests: FemaleAnamneseQuests, private authService: AuthService, private quests: QuestService,
    private messageService: MessageService, private emailService: EmailService) {
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
        this.admin = userLogged?.role === 'admin';
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
    this.quests.getAnswers(this.authService.getUserLogged()!.idUser).subscribe((answer: AnswerDTO[]) => {
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
      this.getQuests();
      this.getAnswers();
    });
  }

  sendForm(form: NgForm) {
    let firstInvalidName: string = "";

    if (form.invalid) {
      Object.entries(form.controls).forEach(([name, control]) => {
        control.markAsTouched();
        control.markAsDirty();

        if (control.invalid && !firstInvalidName) {
          firstInvalidName = name;
        }
      });

      if (firstInvalidName) {
        let nameRegex = firstInvalidName!.match(/\d+/)![0];
        this.smoothScroll(nameRegex);
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: 'Preencha todos os campos'
      });

      return;
    }

    let documentPDf = this.toPrint();
    documentPDf.getBlob((doc: Blob) => {
      this.emailService.sendEmailWithAttachment(
        this.authService.getUserLogged()!.email,
        this.authService.getUserLogged()!.name,
        doc
      ).subscribe({
        next: (res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Formulário enviado com sucesso!' });
          // this.authService.setSendedForm(true);
        },
        error: (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar formulário. Tente novamente mais tarde.' });
        }
      });
    });
  }

  toPrint() {
    let perguntas: any = [];

    this.questsFemale().forEach((quest: any) => {
      perguntas.push({
        pergunta: quest.questionText,
        resposta: quest.response ? quest.response.toString() : quest.response
      })
    })

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      header: {text: `Amanda Ferreira I Profissional de Educação Física \n CREF: 022035-G/BA`, style: 'cabecalho'},
      footer:{text: `Amanda Ferreira I Profissional de Educação Física \n CREF: 022035-G/BA`, style: 'cabecalho'},
      content: [
        { text: `Anamnese ${this.authService.getUserLogged()!.name}`, style: 'titulo' },
        { text: `Data: ${new Date().toLocaleString()}`, style: 'subtitulo' },
        ...perguntas.flatMap((q: any) => ([
          { text: q.pergunta, style: 'pergunta' },
          {
            table: {
              widths: ['*'],
              body: [[
                { text: q.resposta || ' ', style: 'resposta' }
              ]]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 5]
          }
        ]))
      ],

      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center'
        },
        cabecalho: {
          fontSize: 8,
          margin: [0, 10, 0, 20],
          alignment: 'center'
        },
        subtitulo: {
          fontSize: 12,
          margin: [0, 0, 0, 50],
          alignment: 'center'
        },
        pergunta: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 4]
        },
        resposta: {
          fontSize: 11,
          margin: [4, 4, 4, 4]
        }
      },

      defaultStyle: {
        fontSize: 11
      }
    };
    return pdfMake.createPdf(docDefinition);
  }

  validateResponses(): boolean {
    let valid = true;
    this.questsFemale().forEach(quest => {
      if (!quest.response || quest.response == undefined) {
        valid = false;
        this.messageService.add({ severity: 'error', summary: 'Atenção', detail: `${quest.questionText} é obrigatorio` });
      }
    });
    return valid
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.onBottom.set(window.innerHeight + window.scrollY >= document.body.offsetHeight);
  }
}
