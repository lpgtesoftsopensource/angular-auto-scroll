import { Routes } from '@angular/router';
import { HorizentralAnimationComponent } from './app/horizentral-animation/horizentral-animation.component';

export const routes: Routes = [
  { path: 'horizentalanimation', component: HorizentralAnimationComponent },
  { path: '', redirectTo: 'horizentalanimation', pathMatch: 'full' },
];
