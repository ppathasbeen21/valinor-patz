import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../../features/column/column';
import { KanbanService } from '../../features/kanban';
import { Observable } from 'rxjs';
import { Board } from '../../core/models';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, Column],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
})
export class Kanban {
  board$!: Observable<Board>;

  constructor(private kanban: KanbanService) {
    this.board$ = this.kanban.getBoard$();
  }
}
