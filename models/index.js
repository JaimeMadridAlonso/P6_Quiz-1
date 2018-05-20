const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'quiz'));

// Session
sequelize.import(path.join(__dirname,'session'));

// Create tables
sequelize.sync().then(() => sequelize.models.quiz.count()).then((count) => {	//sincronizo, en la base de datos existen datos? sino los creo
	if (!count){
		return sequelize.models.quiz.bulkCreate([
					{ question: 'Capital de España', answer: 'Madrid'},
					{ question: 'Capital de Francia', answer: 'Paris'},
					{ question: 'Capital de Italia', answer: 'Roma'},
					{ question: 'Capital de Rusia', answer: 'Moscu'}
				]);
			}
})
.catch( err => {
	console.log(err);
});
/*
sequelize.sync()
.then(() => console.log('Data Bases created successfully'))
.catch(error => {
    console.log("Error creating the data base tables:", error);
    process.exit(1);
});*/


module.exports = sequelize;
