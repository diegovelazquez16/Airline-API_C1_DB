const db = require('../dataBase/connection');

exports.getAllPassengers = (req, res) => {
  db.query('SELECT * FROM passengers', (err, result) => {
    if (err) {
      res.status(500).send('Error fetching passengers');
      throw err;
    }
    res.json(result);
  });
};

exports.getPassengerById = (req, res) => {
  const passengerId = req.params.id;
  db.query('SELECT * FROM passengers WHERE idpassenger = ?', [passengerId], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching passenger');
      throw err;
    }
    res.json(result);
  });
};

exports.addPassenger = (req, res) => {
  const { Namepassengers, seats, typeFlight, idTicket } = req.body;

  if (!Namepassengers || !seats || !typeFlight || !idTicket) {
    return res.status(400).send('All fields are required');  // Uso de "return" para evitar múltiples respuestas
  }

  const query = 'INSERT INTO passengers (Namepassengers, seats, typeFlight, idTicket) VALUES (?, ?, ?, ?)';
  
  db.query(query, [Namepassengers, seats, typeFlight, idTicket], (err, result) => {
    if (err) {
      console.error('Error adding passenger:', err);
      return res.status(500).send('Error adding passenger');  // Uso de "return" para evitar múltiples respuestas
    }
    res.status(201).send('Passenger added successfully');
  });
};


exports.updatePassenger = (req, res) => {
  const passengerId = req.params.id;
  const { Namepassengers, seats, typeFlight, idTicket } = req.body;

  db.query('UPDATE passengers SET ? WHERE idpassenger = ?', [req.body, passengerId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating passenger');
      throw err;
    }
    res.send('Passenger updated successfully');
  });
};

exports.deletePassenger = (req, res) => {
  const passengerId = req.params.id;
  db.query('DELETE FROM passengers WHERE idpassenger = ?', [passengerId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting passenger');
      throw err;
    }
    res.send('Passenger deleted successfully');
  });
};
