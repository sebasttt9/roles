export class CreateBookDto {
  title: string;
  author: string;
  genre: string;
  pages: number;
  publishedYear: number;
  isbn?: string;
  description?: string;
  rating?: number;
}

export class UpdateBookDto {
  title?: string;
  author?: string;
  genre?: string;
  pages?: number;
  publishedYear?: number;
  isbn?: string;
  description?: string;
  rating?: number;
}

export class BookResponseDto {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  publishedYear: number;
  isbn?: string;
  description?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}
