import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  protected signupForm: FormGroup = new FormGroup({});
  protected isToastOpen: boolean = false;

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit() {
    this.initForm();
  }

  protected dismissToast(): void {
    this.isToastOpen = false;
  }

  protected submit(): void {
    if (this.signupForm.valid) {
      this.supabaseService.signUp(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).then((response) => {
        if (response.error) {
          console.error(response.error);
          return;
        }

        this.signupForm.reset();
        this.isToastOpen = true;
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  private initForm(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.passwordMatchValidator()]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator()]),
    });
  }

  private passwordMatchValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const password = this.signupForm.get('password')?.value;
      const confirmPassword = this.signupForm.get('confirmPassword')?.value;

      return password && confirmPassword && password !== confirmPassword ? { passwordMatch: true } : null;
    };
  }

}
