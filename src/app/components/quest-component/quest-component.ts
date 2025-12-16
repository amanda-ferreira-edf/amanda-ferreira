import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuestsDTO, TypeResponse } from '../../models/questsDTO';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { QuestService } from '../../services/quest.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-quest-component',
  imports: [
    CommonModule,
    FormsModule,
    TextareaModule,
    DatePickerModule,
    InputNumberModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './quest-component.html',
  styleUrl: './quest-component.css',
})
export class QuestComponent implements OnChanges {

  @Input({ required: true }) quest!: QuestsDTO;
  @Output() response = new EventEmitter<any>();
  @Output() updateQuest = new EventEmitter<any>();
  TypeResponse = TypeResponse;
  value: any;
  valueOthersMultipleChoices: any;
  admin = true;
  // modal
  modal = false;
  modalForm!: QuestsDTO;
  constructor(private questService: QuestService, private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quest']) {
      if (changes['quest'].currentValue.response && changes['quest'].firstChange === false) {
        if (changes['quest'].currentValue.typeResponse === TypeResponse.text && changes['quest'].currentValue.multipleChoice) {
          this.value = changes['quest'].currentValue.response.split(', ');
          if(changes['quest'].currentValue.response.includes('Outros: ')) {
            this.valueOthersMultipleChoices = changes['quest'].currentValue.response.split('Outros: ')[1];
          }
        }else {
          this.value = this.quest.response
        }
      }
    }
  }
  changeModel() {
    if (this.quest.multipleChoice == true && this.valueOthersMultipleChoices) {
      if (this.value === undefined) {
        this.value = [];
      } else if (!this.value && !this.value.filter((item: string) => item.includes('Outros: '))) {
        this.value.push('Outros: ' + this.valueOthersMultipleChoices);
      } else {
        this.value = this.value.filter((item: string) => !item.includes('Outros: '));
        this.value.push('Outros: ' + this.valueOthersMultipleChoices);
      }
    } else if (this.quest.multipleChoice == true) {
      this.value = this.value.filter((item: string) => !item.includes('Outros: '));
      // this.onBlur(this.value.join(', '));
    }
    this.response.emit({ response: this.value, quest: this.quest });
  }

  onBlurMultipleChoices() {
    // console.log(this.valueOthersMultipleChoices);
          this.onBlur(this.value.join(', '));
  }

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

  onBlur(responseFormated?: string) {
    console.log(responseFormated);
    this.questService.addUpdateAnswer({ response: responseFormated ?? this.value ?? null, idUser: this.authService.getUserLogged()!.user.idUser, idQuestion: this.quest.questionId!, idAnswer: this.quest.idAnswer ?? null }).subscribe();
  }

  edit() {
    this.modal = true
    this.modalForm = { ...this.quest, choices: [...(this.quest.choices ?? [])] }
  }
  saveEdit() {
    this.questService.updateQuests(this.modalForm).subscribe(
      {
        next: () => {
          this.modal = false;
          this.updateQuest.emit();
        },
        error: () => {

        }
      }
    );
  }
}
