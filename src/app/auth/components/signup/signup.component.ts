import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  protected isToastOpen: boolean = false;
  protected toastMessage: string = '';

  protected signupForm: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordMatchValidator()]],
    confirmPassword: ['', [Validators.required, this.passwordMatchValidator()]],
  });

  constructor(private supabaseService: SupabaseService, private formBuild: FormBuilder, private router: Router) {
    this.supabaseService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log("User is logged in");
        this.router.navigate(['/tabs']);
      }
    });
  }

  protected dismissToast(): void {
    this.isToastOpen = false;
    this.toastMessage = '';
  }

  protected async onSubmit(): Promise<void> {
    try {
      const { error } = await this.supabaseService.signUp(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value);

      if (error) {
        throw error;
      }

      this.toastMessage = 'Check your email for the confirmation link.';
    } catch (error: any) {
      this.toastMessage = error.message;
      console.error(error);
    } finally {
      this.isToastOpen = true;
      this.signupForm.reset();
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const password = this.signupForm?.get('password')?.value;
      const confirmPassword = this.signupForm?.get('confirmPassword')?.value;

      return password && confirmPassword && password !== confirmPassword ? { passwordMatch: true } : null;
    };
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

}
