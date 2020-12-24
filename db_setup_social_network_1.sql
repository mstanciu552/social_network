drop table if exists comments;
drop table if exists articles;
drop table if exists users;


create table users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    pass VARCHAR(25) NOT NULL, 
    PRIMARY KEY (id)
);

create table articles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    body VARCHAR(300),
    author INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES users(id)
);

create table comments (
    id INT NOT NULL AUTO_INCREMENT,
    comment VARCHAR(300) NOT NULL,
    author INT NOT NULL,
    article INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES users(id),
    FOREIGN KEY (article) REFERENCES articles(id)
);

-- Test data
insert into users(first_name, last_name, pass) values
('Mihai', 'Stanciu', '1234');

insert into articles(title, body, author) values
('test 1', 'First article to test', 1);

insert into comments(comment, author, article) values 
('Comment test 1', 1, 1);