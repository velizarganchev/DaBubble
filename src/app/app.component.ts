import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AnimationIntroService } from './animation-intro/service/animation-intro.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


/**
 * This component is the central component displaying all other components as its children.
 * It also directly displays the intro animation and handles the user authentication upon visit.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'DaBubble';
  uid: string | null = null;
  private authService = inject(AuthService);
  public introService = inject(AnimationIntroService);
  userSub = new Subscription();


  /**
   * The constructor declares a Router instance
   * @param router - Router instance
   */
  constructor(private router: Router) {

  }


  /**
   * This function creates an authentication service subscription for user authentication.
   */
  ngOnInit(): void {
    const url = new URL(window.location.href);
    if (url.href.slice(-5).includes('auth')) {this.router.navigate(['/auth/logIn']) }
    // if (!url.href.includes('mode')) {this.router.navigate(['/auth/logIn']) }
    this.userSub = this.subUser();
    this.awaitMax();
  }


  /**
   * This function unsubscribes all subscriptions.
   */
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  /**
   * This function defines the user authentication process.
   * @returns authentication service subscription
   */
  subUser(): Subscription {
    return this.authService.user$.subscribe((user) => {
      if (user && user.uid) {
        this.uid = user.uid;
        this.introService.awaitingAppInit = false;
        this.userSub.unsubscribe();
      }
    });
  }


  /**
   * This function automatically aborts the visual display of the authentication process after a timeout duration.
   * 
   * That simply means that the intro animation will start and the user can access the "auth" route.
   * The authentication process itself will not be affected since it is handled via
   * subscriptions which continue in the runtime environment.
   */
  awaitMax(): void {
    setTimeout(() => this.introService.awaitingAppInit = false, 1000);
  }


  onProtectedRoute(): boolean {
    const route = this.router.url;
    return !(
      route.includes('auth') ||
      route.includes('impress') ||
      route.includes('privacypolicy')
    );
  }
}