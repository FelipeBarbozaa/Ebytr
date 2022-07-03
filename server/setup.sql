DROP DATABASE IF EXISTS blitz_carreira;

CREATE DATABASE blitz_carreira;

USE blitz_carreira;

CREATE TABLE task(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  status INT NOT NULL
);

INSERT INTO task (name, status)
VALUES
  ('Mudar a cor do botão', 0),
  ('Alterar a logo da página principal', 0),
  ('Centralizar a div da página de cadastro', 0);
