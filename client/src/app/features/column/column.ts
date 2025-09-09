import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanService } from '../kanban';
import type { Card as CardModel } from '../../core/models';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  @Input() title = '';
  @Input() columnId = '';
  @Input() cards: CardModel[] = [];

  private kb = inject(KanbanService);

  remove() {
    if (confirm(`Remover a coluna "${this.title}"?`)) {
      this.kb.removeColumn(this.columnId);
    }
  }
}
