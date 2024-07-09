CREATE SCHEMA kanban;

drop table if exists kanban.card;
drop table if exists kanban.column;
drop table if exists kanban.board;

CREATE TABLE kanban.board (
    id_board serial PRIMARY KEY,
    name text
);

CREATE TABLE kanban.column (
    id_column serial PRIMARY KEY,
    id_board integer REFERENCES kanban.board (id_board),
    name text,
    has_estimative boolean
);

CREATE TABLE kanban.card (
    id_card serial PRIMARY KEY,
    id_column integer REFERENCES kanban.column (id_column),
    title text,
    estimative integer
);

insert into kanban.board (id_board, name) values (1, 'Projeto 1');
insert into kanban.column (id_column, id_board, name, has_estimative) values (1, 1, 'Coluna A', true);
insert into kanban.column (id_column, id_board, name, has_estimative) values (2, 1, 'Coluna B', true);
insert into kanban.column (id_column, id_board, name, has_estimative) values (3, 1, 'Coluna C', true);
insert into kanban.card(id_card, id_column, title, estimative) values (1, 1, 'Atividade 1', 3);
insert into kanban.card(id_card, id_column, title, estimative) values (2, 1, 'Atividade 1', 2);
insert into kanban.card(id_card, id_column, title, estimative) values (3, 1, 'Atividade 1', 1);