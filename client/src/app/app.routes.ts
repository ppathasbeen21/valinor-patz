import { Routes } from '@angular/router';
import { Kanban } from './pages/kanban/kanban';

export const routes: Routes = [
  { path: '', component: Kanban },
  { path: '**', redirectTo: '' },
];

