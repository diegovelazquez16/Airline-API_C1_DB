const db = require('../dataBase/connection');

exports.getAllPay = (req, res) => {
  db.query('SELECT * FROM pay', (err, result) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).send('Error fetching payments');
    }
    res.json(result);
  });
};

exports.getPayById = (req, res) => {
  const payId = req.params.id;

  db.query('SELECT * FROM pay WHERE idpay = ?', [payId], (err, result) => {
    if (err) {
      console.error('Error fetching payment:', err);
      return res.status(500).send('Error fetching payment');
    }
    if (result.length === 0) {
      return res.status(404).send('Payment not found');
    }
    res.json(result[0]);
  });
};

exports.addPay = (req, res) => {
  const { idflight, totalPay, iddatabank } = req.body;

  if (!idflight || !totalPay || !iddatabank) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO pay (idflight, totalPay, iddatabank) VALUES (?, ?, ?)';

  db.query(query, [idflight, totalPay, iddatabank], (err, result) => {
    if (err) {
      console.error('Error adding payment:', err);
      return res.status(500).send('Error adding payment');
    }
    res.status(201).send('Payment added successfully');
  });
};