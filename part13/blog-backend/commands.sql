CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES 
    ('Miguel de Cervantes', 'amazon.com', 'Don Quixote');

INSERT INTO blogs (author, url, title, likes) VALUES 
    ('George Martin', 'asoif.com', 'A Game of Thrones', 10);