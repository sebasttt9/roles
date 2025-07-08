import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of all books' })
  findAll() {
    console.log('📚 GET /books - Getting all books');
    return {
      message: 'Books retrieved successfully',
      data: this.booksService.findAll(),
      timestamp: new Date().toISOString()
    };
  }

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint for books' })
  test() {
    console.log('🧪 Books test endpoint called!');
    return { 
      message: 'Books controller is working!', 
      timestamp: new Date().toISOString(),
      availableEndpoints: [
        'GET /books',
        'GET /books/test',
        'GET /books/stats',
        'GET /books/search?q=query',
        'GET /books/genre/:genre',
        'GET /books/author/:author',
        'GET /books/:id',
        'POST /books',
        'PUT /books/:id',
        'DELETE /books/:id'
      ]
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get book statistics' })
  @ApiResponse({ status: 200, description: 'Book statistics' })
  getStats() {
    console.log('📊 GET /books/stats - Getting book statistics');
    return {
      message: 'Book statistics retrieved successfully',
      data: this.booksService.getStats(),
      timestamp: new Date().toISOString()
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search books by query' })
  @ApiQuery({ name: 'q', description: 'Search query', required: true })
  @ApiResponse({ status: 200, description: 'Search results' })
  searchBooks(@Query('q') query: string) {
    console.log(`🔍 GET /books/search?q=${query} - Searching books`);
    
    if (!query) {
      throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
    }
    
    const results = this.booksService.searchBooks(query);
    return {
      message: `Search results for "${query}"`,
      data: results,
      count: results.length,
      timestamp: new Date().toISOString()
    };
  }

  @Get('genre/:genre')
  @ApiOperation({ summary: 'Get books by genre' })
  @ApiParam({ name: 'genre', description: 'Book genre' })
  @ApiResponse({ status: 200, description: 'Books by genre' })
  findByGenre(@Param('genre') genre: string) {
    console.log(`🎭 GET /books/genre/${genre} - Getting books by genre`);
    
    const books = this.booksService.findByGenre(genre);
    return {
      message: `Books in genre "${genre}"`,
      data: books,
      count: books.length,
      timestamp: new Date().toISOString()
    };
  }

  @Get('author/:author')
  @ApiOperation({ summary: 'Get books by author' })
  @ApiParam({ name: 'author', description: 'Book author' })
  @ApiResponse({ status: 200, description: 'Books by author' })
  findByAuthor(@Param('author') author: string) {
    console.log(`👤 GET /books/author/${author} - Getting books by author`);
    
    const books = this.booksService.findByAuthor(author);
    return {
      message: `Books by author "${author}"`,
      data: books,
      count: books.length,
      timestamp: new Date().toISOString()
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book found' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id') id: string) {
    console.log(`📖 GET /books/${id} - Getting book by ID`);
    
    const book = this.booksService.findOne(id);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    
    return {
      message: 'Book retrieved successfully',
      data: book,
      timestamp: new Date().toISOString()
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createBookDto: CreateBookDto) {
    console.log('➕ POST /books - Creating new book:', createBookDto.title);
    
    // Basic validation
    if (!createBookDto.title || !createBookDto.author) {
      throw new HttpException('Title and author are required', HttpStatus.BAD_REQUEST);
    }
    
    const newBook = this.booksService.create(createBookDto);
    return {
      message: 'Book created successfully',
      data: newBook,
      timestamp: new Date().toISOString()
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    console.log(`📝 PUT /books/${id} - Updating book`);
    
    const updatedBook = this.booksService.update(id, updateBookDto);
    if (!updatedBook) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    
    return {
      message: 'Book updated successfully',
      data: updatedBook,
      timestamp: new Date().toISOString()
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  delete(@Param('id') id: string) {
    console.log(`🗑️ DELETE /books/${id} - Deleting book`);
    
    const deleted = this.booksService.delete(id);
    if (!deleted) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    
    return {
      message: 'Book deleted successfully',
      timestamp: new Date().toISOString()
    };
  }
}
