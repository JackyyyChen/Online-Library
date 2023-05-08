import itertools
import string
import sys

import pymysql
import os



current_dir =os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
bookapp_book_file=os.path.join(current_dir, 'book_new.csv')
bookapp_book_file=bookapp_book_file.replace('\\','/').replace('-', '\-')
userapp_questions_file=os.path.join(current_dir, 'chat_bot_answer_4000.csv')
userapp_questions_file=userapp_questions_file.replace('\\','/').replace('-', '\-')
game_game_questions_file=os.path.join(current_dir, 'game_questions.csv')
game_game_questions_file=game_game_questions_file.replace('\\','/').replace('-', '\-')
game_count_file=os.path.join(current_dir, 'game_player.csv')
game_count_file=game_count_file.replace('\\','/').replace('-', '\-')
rating_rating_file=os.path.join(current_dir, 'rating_new.csv')
rating_rating_file=rating_rating_file.replace('\\','/').replace('-', '\-')
reviews_file=os.path.join(current_dir, 'user_books_review.csv')
reviews_file=reviews_file.replace('\\','/').replace('-', '\-')
def connect_to_mysql():
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="mysql",
        database="9900database",
        local_infile=True
    )
    return connection


query0 = "ALTER TABLE userapp_user AUTO_INCREMENT = 1;"


query_a="delete from rating_rating;"
query_b="delete from rating_reviews;"
query_c="delete from game_count_score;"
query_d="delete from game_game_questions;"
query_e="delete from Userapp_questions;"
query_f="delete from bookapp_book;"
query_g="delete from userapp_user;"

query1= "ALTER TABLE bookapp_book AUTO_INCREMENT = 1;"
query2 = f"LOAD DATA LOCAL INFILE '{bookapp_book_file}' INTO TABLE bookapp_book " \
        "CHARACTER SET latin1 FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\r\\n' IGNORE 1 ROWS (isbn,title,author,publication_date,publisher,url,category,price,description);"
query3= "ALTER TABLE Userapp_questions AUTO_INCREMENT = 1;"
query4 = f"LOAD DATA LOCAL INFILE '{userapp_questions_file}' INTO TABLE Userapp_questions " \
        "CHARACTER SET latin1 FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS (question,answer);"
query5= "ALTER TABLE game_game_questions AUTO_INCREMENT = 1;"
query6 = f"LOAD DATA LOCAL INFILE '{game_game_questions_file}' INTO TABLE game_game_questions " \
        "CHARACTER SET latin1 FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\r\\n' IGNORE 1 ROWS (title,opt1,opt2,opt3,opt4,question, answer);"
query7= "ALTER TABLE game_count_score AUTO_INCREMENT = 1;"
query8 = f"LOAD DATA LOCAL INFILE '{game_count_file}' INTO TABLE game_count_score " \
        "CHARACTER SET latin1 FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\r\\n' IGNORE 1 ROWS (username,score);"
query9= "ALTER TABLE rating_rating AUTO_INCREMENT = 1;"
query10 = f"LOAD DATA LOCAL INFILE '{rating_rating_file}' INTO TABLE rating_rating " \
        "CHARACTER SET latin1 FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\r\\n' IGNORE 1 ROWS (user_id,isbn_id,rating);"
query11= "ALTER TABLE rating_reviews AUTO_INCREMENT = 1;"
query12 = f"LOAD DATA LOCAL INFILE '{reviews_file}' INTO TABLE rating_reviews " \
        "CHARACTER SET latin1 FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS (user_id, book_id, reviews);"
# querylist=[query_a,query_b,query_c,query_d,query_e,query_f,query_g]
querylist=[query_a,query_b,query_c,query_d,query_e,query_f,query1,query2,query3,query4,query5,query6,query7,query8,query9,query10,query11,query12]
def loadfile(connection):
    cursor = connection.cursor()
    cursor.execute(query0)
    letters = string.ascii_uppercase
    ids = {}
    for a, b, c in itertools.product(letters, letters, letters):
        new_id = a + b + c
        if new_id not in ids:
            is_superuser = 0
            email = new_id + "@gmail.com"
            password = "123"
            value = f"('{is_superuser}','{new_id}', '{email}', '{password}')"
            ids[new_id] = value
        if len(ids) == 100:
            break

    connection.commit()

    for value in ids.values():
        query_user = f"INSERT IGNORE INTO userapp_user (is_superuser,username, email, password) VALUES {value};"
        cursor.execute(query_user)
        connection.commit()

    for query in querylist:
        print(query)
        cursor.execute(query)
        connection.commit()
    cursor.close()
connection = connect_to_mysql()
data = loadfile(connection)
connection.close()
