-- Create the Users table (Referenced by other tables)
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  lives INT DEFAULT 3,
  highest_level_completed INT DEFAULT 0,
  account_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  display_width INT DEFAULT 1200,
  display_height INT DEFAULT 600
);

DROP TABLE IF EXISTS Scores CASCADE;
CREATE TABLE Scores (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id) ON DELETE CASCADE,
  score BIGINT
);

-- Create the Levels table

DROP TABLE IF EXISTS Levels CASCADE;
CREATE TABLE Levels (
  level_id SERIAL PRIMARY KEY,
  level_name VARCHAR(255) NOT NULL
);

-- Create the Difficulty table
DROP TABLE IF EXISTS Difficulty CASCADE;
CREATE TABLE Difficulty (
  difficulty_id SERIAL PRIMARY KEY,
  difficulty_level VARCHAR(50) DEFAULT 'Normal',
  score_multiplier FLOAT NOT NULL DEFAULT 1,
  acceleration_modifier FLOAT NOT NULL DEFAULT 150
);

-- Create the User_Level_Attempts table
DROP TABLE IF EXISTS User_Level_Attempts CASCADE;
CREATE TABLE User_Level_Attempts (
  attempt_id SERIAL PRIMARY KEY,
  level_id INT NOT NULL,
  number_of_attempts INT DEFAULT 0,
  user_id INT REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (level_id) REFERENCES Levels(level_id) ON DELETE CASCADE
);
