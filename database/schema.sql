-- Create the Users table (Referenced by other tables)
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  score INT DEFAULT 0,
  lives INT DEFAULT 3,
  highest_level_completed INT DEFAULT 0,
  account_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  display_width INT DEFAULT 1200,
  display_height INT DEFAULT 600
);

-- Create the Levels table
CREATE TABLE Levels (
  level_id SERIAL PRIMARY KEY,
  level_name VARCHAR(255) NOT NULL
);

-- Create the Difficulty table
CREATE TABLE Difficulty (
  difficulty_id SERIAL PRIMARY KEY,
  difficulty_level VARCHAR(50) DEFAULT 'Normal',
  score_multiplier FLOAT NOT NULL DEFAULT 1,
  acceleration_modifier FLOAT NOT NULL DEFAULT 150
);

-- Create the User_Level_Attempts table
CREATE TABLE User_Level_Attempts (
  attempt_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  level_id INT NOT NULL,
  number_of_attempts INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (level_id) REFERENCES Levels(level_id) ON DELETE CASCADE
);
