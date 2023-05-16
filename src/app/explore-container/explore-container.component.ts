import { Component, Input } from '@angular/core';
import { SupabaseService } from '../shared/services/supabase.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  @Input() name?: string;

  constructor(private supabaseService: SupabaseService) { }

  public signOut(): void {
    console.log("Sign out");
    this.supabaseService.signOut();
  }

}
