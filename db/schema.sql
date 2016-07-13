-- Notice the order that the tables have to be dropped
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  user_id INT REFERENCES users (user_id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  user_id INT REFERENCES users (user_id),
  post_id INT REFERENCES posts (post_id),
  created_at TIMESTAMP DEFAULT now()
);