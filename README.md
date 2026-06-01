# Assignment for Frontend Engineer job applicants
How to run the project
Clone the repository:
git clone https://github.com/levelMalakhovSergey/job-assignment-frontend-engineer.git

Build the Docker image:
"docker build -t job-assignment-frontend-engineer ."

Start the backend (in a separate terminal):
"docker-compose up"

Start the frontend:
"docker run --rm -p 8080:80 job-assignment-frontend-engineer"

Access the application:
Open http://localhost:8080 in your browser.
