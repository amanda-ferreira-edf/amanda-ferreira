import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PickList, PickListModule } from 'primeng/picklist';
import { QuestsDTO, TypeResponse } from '../../models/questsDTO';
import { QuestService } from '../../services/quest.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin-quests',
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    PickListModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './admin-quests.html',
  styleUrl: './admin-quests.css',
})
export class AdminQuests {
  //modal admin quests
  modal = false
  allQuests: QuestsDTO[] = [];
  sourceQuests: QuestsDTO[] = [];
  questsSelected: QuestsDTO[] = [];
  @Input({ required: true }) questsID!: number[];
  @Output() updateQuest = new EventEmitter<number[]>()

  //modal new
  modalNew = false
  modalForm: QuestsDTO = {
    questionText: '',
    typeResponse: TypeResponse.text,
    multipleChoice: false
  };
  selectedQuest: QuestsDTO | null = null;
  TypeResponse = TypeResponse
  edit = false;
  @ViewChild('myPickList') pickList!: PickList;
  constructor(private questsService: QuestService, private cd: ChangeDetectorRef) {
    this.getAllQuests()
  }


  getAllQuests() {
    this.questsService.getAllQuests().subscribe((quests: QuestsDTO[]) => {
      this.sourceQuests = quests ?? [];
      this.cd.detectChanges();
      setTimeout(() => {
        if (this.questsID) {
          this.questsSelected = this.sourceQuests.filter((q: any) => this.questsID.includes(q.questionId)).sort((a: any, b: any) => this.questsID.indexOf(a.questionId) - this.questsID.indexOf(b.questionId));
          this.allQuests = this.sourceQuests.filter((q: any) => !this.questsID.includes(q.questionId));
        } else {
          this.questsSelected = []
          this.allQuests = this.sourceQuests
        }
      });
      
    })
  }

  openModal() {
    this.modal = true
    this.getAllQuests();
  }
  handleMoveAllToTarget(event: any) {
    const moved = Array.isArray(event.items) ? event.items : [event.items];
    const movedIds = new Set(moved.map((m: any) => m.questionId));

    // adiciona ao destino recriando o array
    this.questsSelected = [...this.questsSelected, ...moved];
    this.questsID = this.questsSelected.map((quest: any) => quest.questionId);

    // remove do source recriando o array filtrando por id
    this.allQuests = this.allQuests.filter((q: any) => !movedIds.has(q.questionId));
  }

  handleMoveAllToSource(event: any) {
    const moved = Array.isArray(event.items) ? event.items : [event.items];
    const movedIds = new Set(moved.map((m: any) => m.questionId));

    this.allQuests = [...this.allQuests, ...moved];
    this.questsSelected = this.questsSelected.filter((q: any) => !movedIds.has(q.questionId));
    this.questsID = this.questsSelected.map((quest: any) => quest.questionId);
  }

  refresh() {
    this.questsSelected = [...this.questsSelected]; // cria novo array
    this.questsID = this.questsSelected.map((quest: any) => quest.questionId);
    this.allQuests = [...this.allQuests];
  }

  saveEdit() {
    this.updateQuest.emit(this.questsSelected.map((quest: any) => quest.questionId));
  }

  //modal new

  changeValueTypeMultiple() {
    if (this.modalForm.typeResponse !== TypeResponse.text) {
      this.modalForm.choices = undefined
      this.modalForm.multipleChoice = false
    } else if (this.modalForm.typeResponse === TypeResponse.text) {
      if (this.modalForm.multipleChoice) {
        this.modalForm.choices = [];
      }
    }
  }

  sourceSelect(event: any) {
    if (event.items.length == 0 || event.items.length > 1) {
      this.selectedQuest = null;
    }
    else {
      this.selectedQuest = event.items[0];
    }
  }
  modalNewEdit(isEdit: boolean) {
    if (isEdit && this.selectedQuest != null) {
      this.modalForm = { ...this.selectedQuest }
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.modalNew = true;
  }
  saveNew() {
    if (this.edit) {
      this.questsService.updateQuests(this.modalForm).subscribe(e => {
        this.getAllQuests();
        this.selectedQuest = null;
        this.pickList.selectedItemsSource = [];
        this.cancelNewEdit();
      })
    } else {
      this.questsService.addQuests(this.modalForm).subscribe(e => {
        this.getAllQuests();
        this.selectedQuest = null;
        this.pickList.selectedItemsSource = [];
        this.cancelNewEdit();
      })
    }
  }
  cancelNewEdit() {
    this.modalForm = {
      questionText: '',
      typeResponse: TypeResponse.text,
      multipleChoice: false
    };
    this.modalNew = false;
    this.cd.detectChanges();
  }
  remover() {
    if (this.selectedQuest) {
      this.questsService.removeQuests(this.selectedQuest!.questionId as number).subscribe(e => {
        this.getAllQuests();
        // this.allQuests = this.sourceQuests.filter((q: any) => !this.questsID.includes(q.questionId));
        this.selectedQuest = null;
        this.pickList.selectedItemsSource = [];
        this.cd.detectChanges();

      });
    }
  }
}
