import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private supabaseService: SupabaseService, private formBuilder: FormBuilder, private router: Router) {
    this.supabaseService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log("User is logged in");
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      }
    });
  }

  protected async onSubmit(): Promise<void> {
    try {
      const { error } = await this.supabaseService.signInWithEmail(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);

      if (error) {
        throw error;
      }

      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      console.error(error);
    }
  }

  protected async signInWithGoogle(): Promise<void> {
    try {
      const { error } = await this.supabaseService.signInWithGoogle();

      if (error) {
        throw error;
      }

      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (error: any) {
      console.log("banzaeia a")
      console.error(error);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
