import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto, BookResponseDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: BookResponseDto[] = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      genre: 'Programming',
      pages: 464,
      publishedYear: 2008,
      isbn: '978-0132350884',
      description: 'A handbook of agile software craftsmanship',
      rating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      genre: 'Programming',
      pages: 352,
      publishedYear: 2019,
      isbn: '978-0135957059',
      description: 'Your journey to mastery',
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      pages: 688,
      publishedYear: 1965,
      isbn: '978-0441013593',
      description: 'Epic science fiction masterpiece',
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  findAll(): BookResponseDto[] {
    console.log('📚 Getting all books...');
    return this.books;
  }

  findOne(id: string): BookResponseDto | null {
    console.log(`📖 Getting book with ID: ${id}`);
    return this.books.find(book => book.id === id) || null;
  }

  findByGenre(genre: string): BookResponseDto[] {
    console.log(`🎭 Getting books by genre: ${genre}`);
    return this.books.filter(book => 
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  findByAuthor(author: string): BookResponseDto[] {
    console.log(`👤 Getting books by author: ${author}`);
    return this.books.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  create(createBookDto: CreateBookDto): BookResponseDto {
    console.log('➕ Creating new book:', createBookDto.title);
    
    const newBook: BookResponseDto = {
      id: (this.books.length + 1).toString(),
      ...createBookDto,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateBookDto: UpdateBookDto): BookResponseDto | null {
    console.log(`📝 Updating book with ID: ${id}`);
    
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return null;
    
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBookDto,
      updatedAt: new Date()
    };
    
    return this.books[bookIndex];
  }

  delete(id: string): boolean {
    console.log(`🗑️ Deleting book with ID: ${id}`);
    
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return false;
    
    this.books.splice(bookIndex, 1);
    return true;
  }

  getStats() {
    console.log('📊 Getting book statistics...');
    
    const genres = this.books.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averageRating = this.books.reduce((sum, book) => sum + (book.rating || 0), 0) / this.books.length;
    const totalPages = this.books.reduce((sum, book) => sum + book.pages, 0);
    
    return {
      totalBooks: this.books.length,
      genres,
      averageRating: Math.round(averageRating * 100) / 100,
      totalPages,
      oldestBook: Math.min(...this.books.map(book => book.publishedYear)),
      newestBook: Math.max(...this.books.map(book => book.publishedYear))
    };
  }

  searchBooks(query: string): BookResponseDto[] {
    console.log(`🔍 Searching books with query: ${query}`);
    
    const lowercaseQuery = query.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery) ||
      book.description?.toLowerCase().includes(lowercaseQuery)
    );
  }
}
