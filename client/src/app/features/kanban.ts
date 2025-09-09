import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../core/models';

@Injectable({ providedIn: 'root' })
export class KanbanService {
  private readonly MOCK: Board = {
    id: 'board-1',
    name: 'Kanban Demo',
    columns: [
      { id: 'col-1', name: 'To Do', order: 1, cards: [
          { id: 'c-1', title: 'Ler README', order: 1, description: 'Ler toda a documentação do projeto' },
          { id: 'c-2', title: 'Criar projeto Angular', order: 2, description: 'Configurar projeto com Angular CLI e estruturar a construção de um kanban utilizando ' },
        ]},
      { id: 'col-2', name: 'Doing', order: 2, cards: [
          { id: 'c-3', title: 'Montar layout Kanban', order: 1, description: 'Criar interface visual do kanban' },
        ]},
      { id: 'col-3', name: 'Done', order: 3, cards: [
          { id: 'c-4', title: 'Estrutura repo', order: 1, description: 'Organizar pastas e arquivos iniciais' },
        ]},
    ],
  };

  private boardSubject = new BehaviorSubject<Board>(this.MOCK);

  getBoard$(): Observable<Board> {
    return this.boardSubject.asObservable();
  }

  addColumn(name: string): void {
    const currentBoard = this.boardSubject.value;
    const maxOrder = Math.max(...currentBoard.columns.map(col => col.order), 0);
    const newColumnId = `col-${Date.now()}`; // ID único simples

    const newColumn = {
      id: newColumnId,
      name: name.trim(),
      order: maxOrder + 1,
      cards: []
    };

    const updatedBoard = {
      ...currentBoard,
      columns: [...currentBoard.columns, newColumn]
    };

    this.boardSubject.next(updatedBoard);
  }

  removeColumn(columnId: string): void {
    const currentBoard = this.boardSubject.value;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.filter(col => col.id !== columnId)
    };

    this.boardSubject.next(updatedBoard);
  }

  addCard(columnId: string, title: string): void {
    const currentBoard = this.boardSubject.value;
    const targetColumn = currentBoard.columns.find(col => col.id === columnId);

    if (!targetColumn) return;

    const maxOrder = Math.max(...targetColumn.cards.map(card => card.order), 0);
    const newCard = {
      id: `c-${Date.now()}`,
      title: title.trim(),
      description: '',
      order: maxOrder + 1
    };

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    };

    this.boardSubject.next(updatedBoard);
  }

  updateCard(cardId: string, title: string, description: string): void {
    const currentBoard = this.boardSubject.value;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(col => ({
        ...col,
        cards: col.cards.map(card =>
          card.id === cardId
            ? { ...card, title: title.trim(), description: description.trim() }
            : card
        )
      }))
    };

    this.boardSubject.next(updatedBoard);
  }
}
