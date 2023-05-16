import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent  implements OnInit {
  protected updateUserForm: FormGroup = new FormGroup({});

  constructor(private supabaseService: SupabaseService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  protected submit(): void {
    console.log(this.updateUserForm.getRawValue());
    if (this.password?.value !== this.confirmPassword?.value) {
      console.log("Passwords don't match");
      return;
    }
    if (this.updateUserForm.valid) {
      this.supabaseService.updateUser(this.updateUserForm.get('password')?.value).then((user) => {
        // this.router.navigate(['/tabs']);
        console.log(user);
      }).catch((error) => {
        console.log(error);
      }
      );
    }
  }

  private initForm(): void {
    this.updateUserForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  get password() {
    return this.updateUserForm.get('password');
  }

  get confirmPassword() {
    return this.updateUserForm.get('confirmPassword');
  }
}
