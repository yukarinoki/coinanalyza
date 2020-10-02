psql -U admin -c "create database db;"
psql -U admin -d db <<-EOSQL
CREATE TABLE Staff (
id    CHAR(4)    NOT NULL,
name   TEXT       NOT NULL,
age    INTEGER    ,
PRIMARY KEY (id));
EOSQL
psql -U admin -d db <<-EOSQL
INSERT INTO staff VALUES (1, 'taro', 21), (2, 'Jiro', 20), (3, 'Saburo', 18);
EOSQL