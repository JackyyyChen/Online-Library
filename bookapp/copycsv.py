import csv
from django.core.management.base import BaseCommand, CommandError
from bookapp.models import Book
import django
django.setup()
class Command(BaseCommand):
    help = 'Import data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('file_name', type=str)

    def handle(self, *args, **options):
        file_name = options['file_name']
        data = []
        try:
            with open(file_name) as f:
                reader = csv.reader(f)
                next(reader)  # 跳过标题行
                for row in reader:
                    # 处理每一行数据
                    # 存储到一个列表中
                    data.append(Book(field2=row[0], field3=row[1], field4=row[2],field5=row[3],field6=row[4], field7=row[5], field8=row[6],field9=row[7]))
        except FileNotFoundError:
            raise CommandError(f'File "{file_name}" does not exist')

        Book.objects.bulk_create(data)
        self.stdout.write(self.style.SUCCESS('Data imported successfully'))