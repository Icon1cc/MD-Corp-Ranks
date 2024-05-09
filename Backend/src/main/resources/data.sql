CREATE EXTENSION IF NOT EXISTS pgcrypto;


/* INSERT INTO client ("UserID", "RegistrationTime") VALUES
(gen_random_uuid(), NOW());

INSERT INTO client ("UserID", "RegistrationTime") VALUES
(gen_random_uuid(), NOW());

INSERT INTO client ("UserID", "RegistrationTime") VALUES
(gen_random_uuid(), NOW());

INSERT INTO client ("UserID", "RegistrationTime") VALUES
(gen_random_uuid(), NOW());

INSERT INTO client ("UserID", "RegistrationTime") VALUES
(gen_random_uuid(), NOW());
 */

/*  INSERT INTO question ("Title", "Subtitle", "Weight") VALUES
('Company goals', 'The company has clear long-term objectives', 1.0),
('Work environment', 'The workplace promotes a healthy work-life balance', 1.5),
('Team collaboration', 'The team effectively collaborates on projects', 2.0),
('Leadership', 'Leadership provides clear direction and support', 1.75);
 */

/*  INSERT INTO question_rating ("UserID", "QuestionID", "Rating", "Timestamp") VALUES
('b456bbc1-ddfd-49dd-8133-92c0611a9272', 1, 5, NOW()),
('6379088f-9a8e-4bd6-b7ac-4b84b02372e8', 2, 4, NOW()),
('80fa8ccf-9deb-4af9-82a5-637de8e35c30', 3, 3, NOW()),
('439db0d3-f30f-46b6-b0d2-3c114fab1b6d', 4, 5, NOW());
 */

/*  INSERT INTO question_rating ("UserID", "QuestionID", "Rating", "Timestamp") VALUES
('b456bbc1-ddfd-49dd-8133-92c0611a9272', 3, 2, NOW());

 INSERT INTO question_rating ("UserID", "QuestionID", "Rating", "Timestamp") VALUES
('b456bbc1-ddfd-49dd-8133-92c0611a9272', 2, 8, NOW());

 INSERT INTO question_rating ("UserID", "QuestionID", "Rating", "Timestamp") VALUES
('b456bbc1-ddfd-49dd-8133-92c0611a9272', 4, 6, NOW()); */

 SELECT 
    "UserID",
    SUM("Rating" * "Weight") / SUM("Weight") AS WeightedAverage
FROM 
    LatestRating
WHERE 
    "UserID" = 'b456bbc1-ddfd-49dd-8133-92c0611a9272'  
GROUP BY 
    "UserID";

