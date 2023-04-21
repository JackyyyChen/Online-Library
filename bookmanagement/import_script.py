import csv
from bookapp.models import Book
from django.db import transaction

@transaction.atomic
def import_csv():
    with open('modified_Books.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            book = Book(
                isbn=row['isbn'],
                title=row['title'],
                author=row['author'],
                publication_date=row['publication_date'],
                publisher=row['publisher'],
                url=row['url'],
                category=row['category'],
                price=row['price'],
            )
            book.save()

