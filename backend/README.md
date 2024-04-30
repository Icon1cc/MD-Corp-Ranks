MULTIDISCIPLINARY PROJECT


# MD-CORP-BACKEND
Welcome to MD-CORP-BACKEND. This setup provides a foundation for building RESTful APIs, incorporating Spring Security, connecting to databases, and more.

# Important Links
Spring Initializr: https://start.spring.io/
Spring Boot Documentation: https://docs.spring.io/spring-boot/docs/current/reference/html/
Maven Repository: https://mvnrepository.com/
Postman for testing APIs: https://www.postman.com/
Getting Started
Follow these steps to set up and run your backend project.

# Step 1: Clone the Repository
git clone https://github.com/Politecnico-Di-Milano-CSE/MD-Corp-Backend.git

# Step 2: Navigate into Your Project
cd Backend

# Step 3: Verify Dependencies
Verify the Maven Wrapper:
./mvnw verify
Or if Maven is installed globally:
mvn verify

# Step 4: Configure Your Application
Set up application properties in src/main/resources/application.properties.
Configure your database connection (if applicable).
Set up Spring Security (if needed).

# Step 5: Start up the database locally
docker-compose up

# Step 6: Run Your Spring Boot Application
./mvnw clean spring-boot:run
Or if Maven is installed globally:
mvn clean spring-boot:run
Your application will start.
