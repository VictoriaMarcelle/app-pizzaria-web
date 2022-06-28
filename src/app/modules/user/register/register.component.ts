import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import IUser from 'src/app/interfaces/IUser';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { email, maxLength, minLength, required, getInputError } from 'src/app/utils/Validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  inputPasswordType = 'password';
  isPassword = true;
  formSubmitted = false;
  isLoading = false;

  constructor(
    private router: Router,
    private notifications: NotificationsService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [required, minLength(5), maxLength(50)]],
      email: ['', [required, email]],
      senha: ['', [required, minLength(8), maxLength(50)]]
    });
  }

  register() {
    if (this.form.valid) {
      this.isLoading = true;

      const user = this.form.getRawValue() as IUser;

      this.userService.regiterUser(user).subscribe({
        next: (v) => {
          this.notifications.notify({ message: 'Usuário criado com sucesso', type: 'success' });
          this.router.navigate(['']);
        },
        error: (e) => {
          const mensagem = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
          this.notifications.notify({ message: mensagem, type: 'error' });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
    this.formSubmitted = true;
  }

  goBack() {
    this.router.navigate(['']);
    return false;
  }

  changeInputPasswordType() {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
    this.isPassword = !this.isPassword;
  }

  getErrors(name: string, label = name) {
    return getInputError(this.formSubmitted, this.form.get(name), label);
  }
}
