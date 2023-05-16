import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {
  protected resetForm: FormGroup = new FormGroup({});

  constructor(private supabaseService: SupabaseService, private router: Router) {
    this.supabaseService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log("User is logged in");
        this.router.navigate(['/tabs']);
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }

  protected submit(): void {
    console.log(this.resetForm.getRawValue());
    if (this.resetForm.valid) {
      this.supabaseService.resetPassword(this.resetForm.get('email')?.value);
    }
  }

  private initForm(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

}
