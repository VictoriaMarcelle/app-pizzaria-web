import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import IAuth from 'src/app/interfaces/IAuth';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { email, getInputError, maxLength, minLength, required } from 'src/app/utils/Validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  inputPasswordType = 'password';
  isPassword = true;
  formSubmitted = false;
  isLoading = false;

  constructor(
    private authService: AuthenticationService,
    private notifications: NotificationsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [required, email]],
      senha: ['', [required, minLength(8), maxLength(50)]]
    });
  }

  login() {
    if (this.form.valid) {
      const body = this.form.getRawValue() as IAuth;
      this.isLoading = true;

      this.authService.auth(body).subscribe({
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

  openRegisterRoute(){
    this.router.navigate(['/usuario/cadastrar']);
  }

  changeInputPasswordType() {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
    this.isPassword = !this.isPassword;
  }

  getErrors(name: string, label = name) {
    return getInputError(this.formSubmitted, this.form.get(name), label);
  }
}
