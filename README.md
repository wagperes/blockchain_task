
# Blockchain app task

This is an application to get blockchain details from **blockchain data API** and displays the result.
The application is composed of two main parts:
### Backend API
The main URL is `http://localhost:9000` and there are two endpoints to retrieve data from blockchain API:
 - `/blocks`: will query and return the list of latest blockchain blocks;
 - `/blocks/<hash>`: will query and return the block details for the hash informed in he URL.
### Frontend
The frontend was built using REACT functional components and can be accessed in the URL `http://localhost:3000/` after starting the servers.

## How to run this app:
#### Backend:
1. Clone or download the project and go to the main folder `blockchain_task`
2. Install dependencies: `npm install`
3. Run the command `npm run start`

#### Frontend:
1. Go to folder `blockchain_task/src/frontend`
2. Install dependencies: `npm install`
3. Run the command `npm start`

### Possible improvements:
#### Tests:
There are no tests here right now :(
But is highly recommended use tests, especially in the API side.
Good tests would verify if the application is failling gracefully and also make sure that any mutation are working as expected.
On the frontend, is good to test if the components are returning properly.
In my current project we are use to use **Mocha**, **Chai** and **Sinon** to perform the tests. But I also know that **Jest** is really great.
#### Hosting:
I would host using AWS either using a container for the app or perhaps a lambda function for the APIs.
#### Performance:
The API endpoint to get the block details is really slow. To improve the performance here I have put a simple cache using a Map where the ID is the hash and the content is the object.
A similar approach can be used using a Redis, or Dynamo DB or any other **memoization** method. 
