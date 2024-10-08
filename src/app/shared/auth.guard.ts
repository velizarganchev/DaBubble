import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

/**
 * Custom route guard that handles authentication and specific query parameters for password reset or email verification.
 * It intercepts routes, checks for specific query parameters, and navigates to appropriate routes accordingly
 * to prevent the standard route direction to the login form or home / new message view.
 * 
 * @param route - The activated route snapshot containing route information, including query parameters.
 * @param state - The current router state.
 * @returns A boolean indicating whether to allow or prevent navigation to the route.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.getCurrentUid()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const mode = route.queryParams['mode'];
  const oobCode = route.queryParams['oobCode'];

  if (oobCode) {
    switch (mode) {
      case 'resetPassword':
        router.navigate(['/auth/resetPw'], { queryParams: { oobCode } });
        break;
      case 'verifyAndChangeEmail':
        router.navigate(['/auth/changeEmail'], { queryParams: { oobCode } });
        break;
    }
    return false;
  }

  router.navigate(['/new']);
  return false;
};
