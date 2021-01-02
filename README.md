# social_network

This is a very basic blog type website using **no ORM** and has a simple UI. It is made to showcase functionality.




## How to install locally
1. Clone the repository
```
git clone https://github.com/mstanciu552/social_network
```
2. Change directory
```
cd social_network
```
3. Install the dependencies for the backend
```
npm install
```
4. Install the dependencies for the frontend
```
cd client && npm install
```
5. Run the server
```
npm start 
```
6. Run the client (in another terminal)
```
cd client && npm start
```

Now everything is ready to be used. :+1:


## API Endpoints

### Users
Operation | Route | Headers | Description
:---: | :---: | :---: | :---:
GET | http://localhost:3030/users | - | Get all users
GET | http://localhost:3030/users/:id |`authorization: Bearer <access token>`| Get specific users
POST | http://localhost:3030/users | - | Add new user
PUT | http://localhost:3030/users/:id | ` authorization: Bearer <access token> ` | Update specific user
DELETE | http://localhost:3030/users/:id | ` authorization: Bearer <access token> ` | Delete specific user
GET | http://localhost:3030/users/:id/articles | - | Get specific user's articles
GET | http://localhost:3030/users/:id/comments | - | Get specific user's comments
GET | http://localhost:3030/users/:id/comments/:comment | - | Get specific user's specific comment

### Articles
Operation | Route | Headers | Description
:---: | :---: | :---: | :---:
GET | http://localhost:3030/articles | - | Get all articles
GET | http://localhost:3030/articles/:id | - | Get specific article
POST | http://localhost:3030/articles | - | Add article
PUT | http://localhost:3030/articles/:id | ` authorization: Bearer <access token> ` | Update specific article
DELETE | http://localhost:3030/articles/:id | ` authorization: Bearer <access token> ` | Delete specific article
GET | http://localhost:3030/articles/user/:id | - | Get user's articles
GET | http://localhost:3030/articles/:id/comments | - | Get specific article's comments
POST | http://localhost:3030/articles/:id/comments | - | Add comment on article
DELETE | http://localhost:3030/articles/:id/comments/:comment | ` authorization: Bearer <access token> ` | Get specific article's specific comment

### Authentication
Operation | Route | Headers | Description
:---: | :---: | :---: | :---:
POST | http://localhost:3030/register | - | Registration endpoint
POST | http://localhost:3030/login | - | Login endpoint
