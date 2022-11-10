
-- (Re)create the table

DROP TABLE IF EXISTS ducks;
CREATE TABLE ducks (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT NOT NULL
);

-- Insert some sample data

INSERT INTO ducks (name, age)
VALUES
    ('Bono', 2),
    ('Bjork', 4);