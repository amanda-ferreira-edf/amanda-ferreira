import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { LoginWithGoogle } from "../login-with-google/login-with-google";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  form!: FormGroup;
  formCadastro!: FormGroup;
  loading = false;
  isLoggin = true;
  @Input({ required: true }) displayModal: boolean = false;
  @Output() displayModalChange = new EventEmitter<boolean>();


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.formCadastro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required, this.validatorsEquals]],
      role: ['user']
    })
  }

  validatorsEquals = (control: any) => {
    if (control.value !== this.formCadastro?.value.password) {
      return { equals: true };
    }
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.login(this.form.value).subscribe(
      {
        next: (res) => {
          if (res.access_token) {
            localStorage.setItem('userLogged', JSON.stringify(res));
            this.authService.setUserLogged(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Login realizado',
              detail: 'Você entrou no sistema'
            });
            this.loading = false;
            this.displayModalChange.emit(false);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao logar',
            detail: err.error.detail
          });
          this.loading = false;
        },
      }
    )
  }
  submitCadastro() {
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }
    this.authService.createUser(this.formCadastro.value).subscribe(
      {
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Cadastro realizado',
          });
          this.formCadastro.reset();
          this.formCadastro.controls['role'].setValue('user');
          this.isLoggin = true;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar',
            detail: err.error.detail
          });
        },
      },

    )
  }
}
