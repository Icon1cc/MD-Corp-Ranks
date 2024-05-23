CREATE TABLE IF NOT EXISTS "user" (
    "UserID" UUID PRIMARY KEY,
    "RegistrationTime" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS email_subscription (
    "UserID" UUID PRIMARY KEY,
    "Email" VARCHAR(255) NOT NULL,
    "SubscribedOn" TIMESTAMP NOT NULL,
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);

CREATE TABLE IF NOT EXISTS preference (
    "UserID" UUID NOT NULL,
    "ExecutionTime" TIMESTAMP NOT NULL,
    "IdentityPreference" VARCHAR(255),
    "ReviewPreference" VARCHAR(255),
    PRIMARY KEY ("UserID", "ExecutionTime"),
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);

CREATE TABLE IF NOT EXISTS review (
    "UserID" UUID PRIMARY KEY,
    "ReviewTime" TIMESTAMP NOT NULL,
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);

CREATE TABLE IF NOT EXISTS certificate_access_log (
    "UserID" UUID NOT NULL,
    "AccessTime" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("UserID", "AccessTime"),
    FOREIGN KEY ("UserID") REFERENCES "user"("UserID")
);
