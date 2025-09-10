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

  draggedCardId: string | null = null;
  draggedFromColumn: string | null = null;
  isDragOver = false;

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

  openEditCard(card: CardModel, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
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

  onDragStart(event: DragEvent, card: CardModel) {
    this.draggedCardId = card.id;
    this.draggedFromColumn = this.columnId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', card.id);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDragLeave(event: DragEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      this.isDragOver = false;
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (this.draggedCardId && this.draggedFromColumn) {
      const newOrder = this.cards.length + 1;
      this.kb.moveCard(this.draggedCardId, this.draggedFromColumn, this.columnId, newOrder);
    }

    this.draggedCardId = null;
    this.draggedFromColumn = null;
  }

  onDragEnd() {
    this.draggedCardId = null;
    this.draggedFromColumn = null;
    this.isDragOver = false;
  }
}
