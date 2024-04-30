CREATE TABLE IF NOT EXISTS user (
    "UserID" UUID PRIMARY KEY,
    "RegistrationTime" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS user_company (
    "UserID" UUID NOT NULL,
    "RegistrationTime" TIMESTAMP NOT NULL,
    "CompanyName" VARCHAR(100) NOT NULL,
    PRIMARY KEY ("UserID", "RegistrationTime"),
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);

CREATE TABLE IF NOT EXISTS question (
    "ID" SERIAL PRIMARY KEY,
    "Title" VARCHAR(255) NOT NULL,
    "Subtitle" VARCHAR(255) NOT NULL,
    "Weight" DECIMAL NOT NULL
);

-- Currently using UserID and timestamp to be 
-- able to save multiple answers of the same question by the same user.
CREATE TABLE IF NOT EXISTS question_rating (
    "UserID" UUID NOT NULL,
    "QuestionID" INT NOT NULL,
    "Rating" INT NOT NULL,
    "Timestamp" TIMESTAMP NOT NULL,
    PRIMARY KEY ("UserID", "Timestamp"),
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID"),
    FOREIGN KEY ("QuestionID") REFERENCES "question"("ID")
);

CREATE TABLE IF NOT EXISTS user_farewell (
    "UserID" UUID NOT NULL,
    "Timestamp" TIMESTAMP NOT NULL,
    PRIMARY KEY ("UserID", "Timestamp"),
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);

CREATE TABLE IF NOT EXISTS email_subscription (
    "UserID" UUID PRIMARY KEY,
    "Email" VARCHAR(255) NOT NULL,
    "SubscribedOn" TIMESTAMP NOT NULL,
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);