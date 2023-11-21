const fs = require('fs');
const csv = require('csv-parser');
const db = require('./models/connection');


fs.createReadStream('animals_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.animals.create({
      name: row.name,
      description: row.description,
      userId: row.userId
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });