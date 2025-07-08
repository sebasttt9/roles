import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

console.log('📚 Loading BooksModule...');

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule {
  constructor() {
    console.log('✅ BooksModule initialized with BooksController');
    console.log('🛣️  Books routes:');
    console.log('     GET    /books');
    console.log('     GET    /books/test');
    console.log('     GET    /books/stats');
    console.log('     GET    /books/search?q=query');
    console.log('     GET    /books/genre/:genre');
    console.log('     GET    /books/author/:author');
    console.log('     GET    /books/:id');
    console.log('     POST   /books');
    console.log('     PUT    /books/:id');
    console.log('     DELETE /books/:id');
  }
}
