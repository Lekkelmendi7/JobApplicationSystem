const mongoose = require('mongoose');

class Database {
  static instance;

  constructor() {
    if (!Database.instance) {
      this.connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  connect() {
    mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log('DB connected'))
      .catch((err) => console.log(err));
  }
}

module.exports = Database;
/*In this example, we add a static instance property to the Database class. This property will hold the single instance of the Database class that we create.

In the connect method, we connect to the database using Mongoose. If the connection is successful, we log a message to the console. If there is an error, we log the error.

In the constructor, we check if the Database.instance property is already set. If it is, we return the existing instance. If it's not, we create a new instance and set the Database.instance property to it.
By using the singleton pattern, we ensure that there is only ever one instance of the Database class, which helps to prevent issues with multiple connections to the database.
*/