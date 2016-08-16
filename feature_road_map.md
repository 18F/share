* auth through email 
	- verify .gov email address for top level domain (cloud.gov requires validation)

* web design standards integration

* content work
	- we need to frame the content of the page
	- What is this thing?
	- Am I authorized to use this?
	- designer should look at this
	- building trust should be the goal of the design and content
	- Should look like it took 1000 hrs to build
	- for content benchmark - transfers "10 GB from NYC to Chicago in N minutes"

* work flow:
	- unique rooms 
	- account creation -> create a room or it is created by default -> email a link -> new person is authorized -> download link

* down the line feature:
	- integration with login.gov
	- concurrency - https://github.com/18F/voyage/ uses this:
		- https://github.com/18F/voyage/blob/master/index.js on like 280 
			has this
	- view names / logins of other people in the room
	- optional s3 file caching (using s3’s object expiration feature). Allow users to choose 1 day, 1 week, or 1 month expiration for their data. on cloud.gov

Eric Todos:
	- uswds, minimal example: https://github.com/EricSchles/oneinamillion
	- Rooms by tuesday
	- authentication with cloud.gov after that


Business case:
	- Identify early adopters:
		- reach out to 18F folks
			- Justin Grevich (first person?)