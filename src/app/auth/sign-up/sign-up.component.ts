import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LegalFooterComponent } from '../legal-footer/legal-footer.component';
import { AuthService } from '../../../services/auth.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';
import { User } from '../../../models/user.class';
import { UsersService } from '../../../services/users.service';


/**
 * This component displays the signup page with the signup form at the center.
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LegalFooterComponent, ToastNotificationComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private router = inject(Router);

  /** Sign up form data */
  user = {
    name: '',
    email: '',
    password: ''
  }

  /** Toast notification display state */
  showToast: boolean = false;

  /** Storage for any authentication error response from backend */
  authError: string | null = null;

  /** Loading state during data processing / toast notification / backend communication */
  loading: boolean = false;


  /**
   * This function is triggered by the signup form submission.
   * @param form - signup form
   */
  onSubmit(form: NgForm) {
    if (form.submitted && form.valid) { this.signUp() }
  }


  /**
   * This function signs up the new user via authentication service.
   */
  signUp() {
    this.loading = true;
    this.authService.register(this.user.name, this.user.email, this.user.password).subscribe({
      next: () => this.onSignUp(),
      error: () => this.onError()
    });
  }


  /**
   * This function handles system errors/exceptions during signup.
   * @param err - error
   */
  onError() {
    this.setAuthError();
    this.loading = false;
  }


  /**
   * This function handles the sign in.
   */
  onSignUp() {
    this.showToast = true;
    const uid = this.authService.getCurrentUid();
    if (uid) {
      const user = new User({
        uid: uid,
        name: this.user.name,
        email: this.user.email
      });
      this.usersService.addUser(user)
        .catch(() => this.onError());
    }
  }


  /**
   * This function sets the "authError" property.
   * @param response - error from log in response
   */
  setAuthError() {
    this.authError = 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
  }


  /**
   * This function is called when the toast notification timeout has expired.
   */
  afterToast() {
    this.router.navigateByUrl('auth/pickAvatar');
  }
}
