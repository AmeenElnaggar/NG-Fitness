import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../../Shared/Services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth()) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/login'));
};
