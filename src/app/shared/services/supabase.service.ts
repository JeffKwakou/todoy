import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthError, AuthResponse, SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public session: any;

  private supabaseClient: SupabaseClient;

  constructor(
    private router: Router
  ) {
    this.supabaseClient = createClient(environment.supabase.url, environment.supabase.key);
  }

  public isAuthenticated(): boolean {
    return this.session ? true : false;
  }

  /**
   * Get user
   * @returns
   */
  public getUser() {
    return this.supabaseClient.auth.getUser(this.session?.access_token);
  }

  /**
   * Get session
   * @returns
   */
  public getSession() {
    return this.supabaseClient.auth.getSession();
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  public signUp(email: string, password: string): Promise<AuthResponse> {
    return this.supabaseClient.auth.signUp({ email, password });
  }

  /**
   * Sign in with email and password
   * @param email
   * @param password
   */
  public signInWithEmail(email: string, password: string) {
    this.supabaseClient.auth.signInWithPassword({ email, password }).then((response: AuthResponse) => {
      console.log(response);
      this.session = response?.data?.session;
      this.router.navigate(['/tabs']);
    }).catch((error: Error) => {
      throw error;
    });
  }

  /**
   * Sign in with Google
   */
  public signInWithGoogle() {
    this.supabaseClient.auth.signInWithOAuth({ provider: 'google' }).then((response: any) => {
      console.log(response);
      this.session = response?.data?.session;
      this.router.navigate(['/tabs']);
    }).catch((error: Error) => {
      throw error;
    });
  }

  /**
   * Sign out
   */
  public signOut() {
    this.supabaseClient.auth.signOut().then((response: {error: AuthError | null}) => {
      console.log(response);
      this.session = null;
      this.router.navigate(['/auth/login']);
    }
    ).catch((error: Error) => {
      throw error;
    }
    );
  }

  /**
   * Reset password
   * @param email
   */
  public resetPassword(email: string) {
    this.supabaseClient.auth.resetPasswordForEmail(email).then((response: any) => {
      console.log(response);
      this.router.navigate(['/auth/login']);
    }
    ).catch((error: Error) => {
      throw error;
    }
    );
  }

}
