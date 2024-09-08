const bcrypt = require('bcrypt');
const db = require('../dataBase/connection');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      res.status(500).send('Error fetching users');
      throw err;
    }
    res.json(result);
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE iduser = ?', [userId], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching user');
      throw err;
    }
    if (result.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result);
  });
};

exports.addUser = (req, res) => {
  const { firstName, secondName, lastName,  pass } = req.body;

  if (!firstName || !lastName || !secondName || !pass) {
    return res.status(400).send('All fields are required');
  }

  bcrypt.hash(pass, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing the password');
    }

    const query = 'INSERT INTO users (firstName, secondName, lastName,  pass) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName,  secondName, lastName, hashedPassword], (error, result) => {
      if (error) {
        return res.status(500).send('Error adding the new user');
      }
      res.status(201).send('User added successfully');
    });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { firstName, secondName, lastName,  pass } = req.body;

  if (pass) {
    bcrypt.hash(pass, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send('Error hashing password');
      }

      const query = 'UPDATE users SET firstName = ?, secondName = ?, LastName = ?, pass = ? WHERE iduser = ?';
      db.query(query, [firstName, lastName, secondName, hashedPassword, userId], (error, result) => {
        if (error) {
          return res.status(500).send('Error updating user');
        }
        res.send('User updated successfully');
      });
    });
  } else {
    
    const query = 'UPDATE users SET firstName = ?, secondName = ?, LastName = ? WHERE iduser = ?';
    db.query(query, [firstName, secondName, lastName, userId], (err, result) => {
      if (err) {
        res.status(500).send('Error updating user');
        throw err;
      }
      res.send('User updated successfully');
    });
  }
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE iduser = ?', [userId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting user');
      throw err;
    }
    res.send('User deleted successfully');
  });
};
