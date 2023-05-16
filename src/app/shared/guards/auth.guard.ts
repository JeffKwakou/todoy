import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { SupabaseService } from "../services/supabase.service";

export const authGuard = () => {
  const router = inject(Router);
  const supabaseService = inject(SupabaseService);

  supabaseService.getCurrentUser().subscribe((user) => {
    if (!user) {
      router.navigate(['/auth']);
      return false;
    }

    return true;
  });
}
