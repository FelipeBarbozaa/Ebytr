DROP DATABASE IF EXISTS blitz_carreira;

CREATE DATABASE blitz_carreira;

USE blitz_carreira;

CREATE TABLE employee(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL
);

CREATE TABLE task(
  id INT PRIMARY KEY AUTO_INCREMENT,
  ownerId INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  status INT NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES employee(id)
);

CREATE TABLE shared(
  employeeId INT NOT NULL,
  taskId INT NOT NULL,
  FOREIGN KEY (employeeId) REFERENCES employee(id),
  FOREIGN KEY (taskId) REFERENCES task(id)
);

INSERT INTO employee (name, email, password)
VALUES
  ('Felipe', 'felipe@ebytr.com', '12345678'),
  ('Gabriel', 'gabriel@ebytr.com', '12345678'),
  ('Nathaly', 'nathaly@ebytr.com', '12345678');

INSERT INTO task (ownerId, name, status)
VALUES
  (1, 'Mudar a cor do botão', 0),
  (1, 'Alterar a logo da página principal', 0),
  (2, 'Centralizar a div da página de cadastro', 0);

INSERT INTO shared
VALUES
  (1, 1),
  (1, 2),
  (2, 3);