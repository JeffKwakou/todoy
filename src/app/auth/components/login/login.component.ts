import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  protected loginForm: FormGroup = new FormGroup({});

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit() {
    this.initForm();
  }

  protected submit(): void {
    if (this.loginForm.valid) {
      this.supabaseService.signInWithEmail(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    }
  }

  protected signInWithGoogle(): void {
    this.supabaseService.signInWithGoogle();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

}
