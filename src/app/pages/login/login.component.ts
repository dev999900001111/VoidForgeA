import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppCommonModule } from 'src/app/app-common.module';
import { AuthService } from 'src/app/services';
import { GService } from 'src/app/services/g.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginState: 'login' | 'password-reset' | 'sendmail' = 'login';

  loginForm!: FormGroup;
  sendMailForm!: FormGroup;
  passwordResetForm!: FormGroup;

  constructor(
    public g: GService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    // 認証トークンが生きてたら自動ログイン
    this.authService.getUser().subscribe({
      next: next => {
        console.log(next);
        this.router.navigate(['/top-menu']);
      },
      error: error => {
        // 未ログイン
        // console.log(error);
      },
      complete: () => {
        // console.log('complete');
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.sendMailForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.passwordResetForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email || '', this.loginForm.value.password || '').subscribe({
        next: (user) => {
          console.log(user);
          this.router.navigate(['/top-menu']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log('invalid');
    }
  }
  onSend(): void {
    console.log(this.loginForm.value);

    if (this.sendMailForm.value.email) {
      this.authService.requestForPasswordReset(this.sendMailForm.value.email).subscribe({
        next: (user) => {
          console.log(user);
          this.authService.onetimeLogin('passwordReset', (user as any).onetimeToken).subscribe({
            next: (token) => {
              localStorage.setItem('invite_token', token);
              console.log(user);
              this.loginState = 'password-reset';
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log('invalid');
    }
  }

  onReset(): void {
    console.log(this.passwordResetForm.value);
    if (this.passwordResetForm.value.password === this.passwordResetForm.value.passwordConfirm) {
      this.authService.passwordReset(this.passwordResetForm.value.password, this.passwordResetForm.value.passwordConfirm).subscribe({
        next: (user) => {
          console.log(user);
          this.router.navigate(['/top-menu']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
interface LoginForm {
  email: string;
  password: string;
}