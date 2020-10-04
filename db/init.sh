psql -U admin -c "create database db;"
psql -U admin -d db <<-EOSQL
CREATE TABLE Staff (
id    CHAR(4)    NOT NULL,
name   TEXT       NOT NULL,
age    INTEGER    ,
PRIMARY KEY (id));
EOSQL
psql -U admin -d db <<-EOSQL
CREATE TABLE client (
id    CHAR(8)    NOT NULL,
timestamp timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY (id));
EOSQL
psql -U admin -d db <<-EOSQL
CREATE TABLE price (
id CHAR(8),
uid SERIAL,
date TIMESTAMP default CURRENT_TIMESTAMP,
first_ratio real,
first_1 CHAR(8),
first_2 CHAR(8),
first_3 CHAR(8),
second_ratio real,
second_1 CHAR(8),
second_2 CHAR(8),
second_3 CHAR(8),
third_ratio real,
third_1 CHAR(8),
third_2 CHAR(8),
third_3 CHAR(8),
PRIMARY KEY (uid));
EOSQL
psql -U admin -d db <<-EOSQL
INSERT INTO staff VALUES (1, 'taro', 21), (2, 'Jiro', 20), (3, 'Saburo', 18);
EOSQL