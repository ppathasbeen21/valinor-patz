import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column } from '../../features/column/column';
import { KanbanService } from '../../features/kanban';
import { Observable } from 'rxjs';
import { Board } from '../../core/models';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, Column],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
})
export class Kanban {
  private kb = inject(KanbanService);
  board$: Observable<Board> = this.kb.getBoard$();

  adding = false;
  newCol = '';

  openAdd() { this.adding = true; }
  cancelAdd() { this.adding = false; this.newCol = ''; }
  confirmAdd() {
    const name = this.newCol.trim();
    if (name) this.kb.addColumn(name);
    this.cancelAdd();
  }
}
