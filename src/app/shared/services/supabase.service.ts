import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  AuthError, AuthResponse, OAuthResponse, SupabaseClient, User, UserResponse, createClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | boolean | null> = new BehaviorSubject<User | boolean | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key);

    this.supabase.auth.onAuthStateChange((event, sess) => {
      console.log('SUPABAS AUTH CHANGED: ', event);
      console.log('SUPABAS AUTH CHANGED sess: ', sess);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER');

        this.currentUser.next(sess?.user || false);
      } else {
        this.currentUser.next(false);
      }
    });

    this.loadUser();
  }

  public async loadUser(): Promise<void> {
    if (this.currentUser.value) {
      return;
    }

    const user = await this.supabase.auth.getUser();

    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }

  public getCurrentUser(): Observable<User | boolean | null> {
    return this.currentUser.asObservable();
  }

  /**
   * Sign up with email and password
   * @param email
   * @param password
   * @returns
   */
  public signUp(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({ email, password });
  }

  /**
   * Sign in with email and password
   * @param email
   * @param password
   */
  public signInWithEmail(email: string, password: string): Promise<AuthResponse>  {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  /**
   * Sign in with Google
   */
  public signInWithGoogle(): Promise<OAuthResponse>  {
    return this.supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:8100/tabs/'} });
  }

  /**
   * Sign out
   */
  public async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/auth/login');
  }

  /**
   * Reset password
   * @param email
   */
  public resetPassword(email: string): Promise<{
    data: {};
    error: null;
} | {
    data: null;
    error: AuthError;
}> {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  /**
   * Update user
   * @param email
   * @param password
   * @returns
   */
  public updateUser(password: string): Promise<UserResponse> {
    return this.supabase.auth.updateUser({ password });
  }
}
