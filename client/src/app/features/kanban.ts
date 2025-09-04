import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Board } from '../core/models';

@Injectable({ providedIn: 'root' })
export class KanbanService {
  private readonly MOCK: Board = {
    id: 'board-1',
    name: 'Kanban Demo',
    columns: [
      { id: 'col-1', name: 'To Do', order: 1, cards: [
          { id: 'c-1', title: 'Ler README', order: 1 },
          { id: 'c-2', title: 'Criar projeto Angular', order: 2 },
        ]},
      { id: 'col-2', name: 'Doing', order: 2, cards: [
          { id: 'c-3', title: 'Montar layout Kanban', order: 1 },
        ]},
      { id: 'col-3', name: 'Done', order: 3, cards: [
          { id: 'c-4', title: 'Estrutura repo', order: 1 },
        ]},
    ],
  };

  getBoard$() { return of(this.MOCK); }
}
