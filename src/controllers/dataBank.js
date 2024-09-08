const db = require('../dataBase/connection');

exports.getAllDataBanks = (req, res) => {
  db.query('SELECT * FROM databank', (err, result) => {
    if (err) {
      res.status(500).send('Error fetching databank entries');
      throw err;
    }
    res.json(result);
  });
};

exports.getDataBankById = (req, res) => {
  const dataBankId = req.params.id;
  db.query('SELECT * FROM databank WHERE idDataBank = ?', [dataBankId], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching databank entry');
      throw err;
    }
    res.json(result);
  });
};

exports.addDataBank = (req, res) => {
  const { bankName, accountNumber, ownerAccount, idUser } = req.body;

  if (!bankName || !accountNumber || !ownerAccount || !idUser) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO databank (bankName, accountNumber, ownerAccount, idUser) VALUES (?, ?, ?, ?)';
  db.query(query, [bankName, accountNumber, ownerAccount, idUser], (err, result) => {
    if (err) {
      res.status(500).send('Error adding databank entry');
      throw err;
    }
    res.status(201).send('DataBank entry added successfully');
  });
};

exports.updateDataBank = (req, res) => {
  const dataBankId = req.params.id;
  db.query('UPDATE databank SET ? WHERE idDataBank = ?', [req.body, dataBankId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating databank entry');
      throw err;
    }
    res.send('DataBank entry updated successfully');
  });
};

exports.deleteDataBank = (req, res) => {
  const dataBankId = req.params.id;
  db.query('DELETE FROM databank WHERE idDataBank = ?', [dataBankId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting databank entry');
      throw err;
    }
    res.send('DataBank entry deleted successfully');
  });
};
