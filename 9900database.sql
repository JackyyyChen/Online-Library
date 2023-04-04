CREATE TABLE People (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(100) NOT NULL UNIQUE,
    givenName   VARCHAR(50) NOT NULL,
    familyName  VARCHAR(50),
    password    VARCHAR(40) NOT NULL
);

CREATE TABLE Places (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    address         VARCHAR(100) NOT NULL,
    city            VARCHAR(50) NOT NULL,
    state           VARCHAR(50) NOT NULL,
    country         VARCHAR(50) NOT NULL,
    postalCode      VARCHAR(20) NOT NULL,
    gpsCoords       VARCHAR(40) UNIQUE
);

CREATE TABLE Books (
    id                  SERIAL PRIMARY KEY,
    author              VARCHAR(50) NOT NULL,
    title               VARCHAR(100) NOT NULL,
    description         VARCHAR(1000),
    publisher           VARCHAR(50) NOT NULL,
    publicationDate     DATE,
    category            VARCHAR(50) NOT NULL,
    avgRating           FLOAT NOT NULL,
    totalNumberReader   INT NOT NULL,
    totalNumberSale     INT NOT NULL,
    price               FLOAT NOT NULL
);

-- COLLECTIONS: users collect books
create table Collections (
    userId      integer references Users(id),
    bookId      integer references Books(id),
    primary key (userId, bookId)
);

-- REVIEWS: users review some books, book has some reviews
create table Reviews (
    rating      int,
    description text,
    userId      integer references Users(id),
    bookId      integer references Books(id),
    primary key (userId, bookId)
);






