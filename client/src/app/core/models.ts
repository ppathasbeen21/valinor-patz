export interface Card { id: string; title: string; order: number; description?: string; }
export interface Column { id: string; name: string; order: number; cards: Card[]; }
export interface Board { id: string; name: string; columns: Column[]; }
