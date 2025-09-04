import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card as CardCmp } from '../card/card';
import type { Card as CardModel } from '../../core/models';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, CardCmp],
  templateUrl: './column.html',
  styleUrl: './column.scss'
})
export class Column {
  @Input() title = '';
  @Input() cards: CardModel[] = [];
}

