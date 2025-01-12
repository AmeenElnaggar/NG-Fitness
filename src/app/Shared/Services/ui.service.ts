import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private snackbar = inject(MatSnackBar);

  showSnackbar(message: string, duration: number, action?: any) {
    this.snackbar.open(message, undefined, {
      duration: duration,
    });
  }
}
