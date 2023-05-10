import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {
  protected resetForm: FormGroup = new FormGroup({});

  constructor(private supabaseService: SupabaseService) { }

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
