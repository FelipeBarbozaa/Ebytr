DROP DATABASE IF EXISTS blitz_carreira;

CREATE DATABASE blitz_carreira;

USE blitz_carreira;

CREATE TABLE task(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  status INT NOT NULL,
  createdAt DATETIME NOT NULL
);

INSERT INTO task (name, status, createdAt)
VALUES
  ('Mudar a cor do botão', 0, NOW()),
  ('Alterar a logo da página principal', 0, NOW()),
  ('Centralizar a div da página de cadastro', 0, NOW());
