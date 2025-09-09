import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KanbanService } from '../kanban';
import { Card } from '../card/card';
import type { Card as CardModel } from '../../core/models';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, FormsModule, Card],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  @Input() title = '';
  @Input() columnId = '';
  @Input() cards: CardModel[] = [];

  private kb = inject(KanbanService);

  addingCard = false;
  newCardTitle = '';

  editingCard: CardModel | null = null;
  editCardTitle = '';
  editCardDescription = '';

  remove() {
    if (confirm(`Remover a coluna "${this.title}"?`)) {
      this.kb.removeColumn(this.columnId);
    }
  }

  openAddCard() {
    this.addingCard = true;
  }

  cancelAddCard() {
    this.addingCard = false;
    this.newCardTitle = '';
  }

  confirmAddCard() {
    const title = this.newCardTitle.trim();
    if (title) {
      this.kb.addCard(this.columnId, title);
    }
    this.cancelAddCard();
  }

  openEditCard(card: CardModel) {
    this.editingCard = card;
    this.editCardTitle = card.title;
    this.editCardDescription = card.description;
  }

  cancelEditCard() {
    this.editingCard = null;
    this.editCardTitle = '';
    this.editCardDescription = '';
  }

  confirmEditCard() {
    if (this.editingCard) {
      this.kb.updateCard(this.editingCard.id, this.editCardTitle, this.editCardDescription);
    }
    this.cancelEditCard();
  }
}
