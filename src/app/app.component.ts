import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly mainForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\D*$/),
      Validators.maxLength(32)
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d*$/)
    ])
  });

  markAllAsTouched(): void {
    this.mainForm.markAllAsTouched();
  }

  markAllAsUntouched(): void {
    this.mainForm.markAsUntouched();
  }
}
