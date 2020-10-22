// SERVER PORT
const PORT = 3001; 
// MONGODB URI
const URI = 'mongodb://Michelle:asdsucks@cluster0-shard-00-00.dviis.mongodb.net:27017,cluster0-shard-00-01.dviis.mongodb.net:27017,cluster0-shard-00-02.dviis.mongodb.net:27017/RealInfoState?ssl=true&replicaSet=atlas-5cj6tw-shard-0&authSource=admin&retryWrites=true&w=majority';

// MongoDB 3.6 or later credentials URI:
// "mongodb+srv://Michelle:asdsucks@cluster0.dviis.mongodb.net/RealInfoState?retryWrites=true&w=majority"

// HS256 JWT TOKEN
const TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
module.exports = {
  URI,
  PORT,
  TOKEN,
};
