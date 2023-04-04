import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const books = [
  { id: 1, title: 'Book 1', author: 'Author 1', description: 'Description of Book 1', image: 'https://img2.doubanio.com/view/subject/s/public/s34367451.jpg' },
  { id: 2, title: 'Book 2', author: 'Author 2', description: 'Description of Book 2', image: 'https://img2.doubanio.com/view/subject/s/public/s34398382.jpg' },
  { id: 3, title: 'Book 3', author: 'Author 3', description: 'Description of Book 3', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTd6GaH4YPl0plsgKxzorZM7iM8AzMtNxI1D2T0obho7lmticJResfZ-z1Ku17yNvGDJ2BimacCZdd9r6yc3aolWMjPh5VyxIMvkr2ey7OO&usqp=CAc' },
];

const Bookshelf = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {books.map((book) => (
        <Card key={book.id} sx={{ width: 300 }}>
          <CardActionArea component={Link} to={`/books/${book.id}`}>
            <CardMedia component="img" height="400" image={book.image} alt={book.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default Bookshelf;
