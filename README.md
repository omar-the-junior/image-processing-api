# image-processing-api
A Project for the EGFWD [Full stack web developer advanced track](https://egfwd.com/specializtion/web-development-advanced/) provided by [Udacity](https://www.udacity.com/). For image processing I used [Sharp](https://www.npmjs.com/package/sharp) as a module. 

# instructions
## Scripts

### Install node_modules
   `npm install`

### Running tests
   `npm test` or `npm run test`

### To compile TypeScript code and start the server
   `npm start` or `npm run start`

### Linting
   `npm run lint`

### Formatting with prettier
   `npm run prettier`

## Endpoints
   ### Origin endpoint which leads to home page 
   [http://localhost:3000/](http://localhost:3000/)
   
   ### Image resize endpoint 
   [http://localhost:3000/resize](http://localhost:3000/resize)

   ### Image resize endpoint Expected parameters
   http://localhost:3000/resize?imageName={imageName}.jpg&width={Width}&height={Height}

   ### Image valid resize endpoint Examples
   http://localhost:3000/resize?imageName=encenadaport.jpg&width=700&height=500

   http://localhost:3000/resize?imageName=fjord.jpg&width=400&height=300

# Features
   - [x] A front-end that allows the user to select a certain image and choose the size
   - [x] Caching is Implemented so that the resized image is accessed directly in case of subsequent access attempts
   - [x] An error massage that is provided to the user in case of incorrect input or when an image has failed to process

   
