const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dataBase/connection');


exports.login = (req, res) => {
  const { firstName, pass } = req.body;

  if (!firstName || !pass) {
    return res.status(400).send('First name and password are required');
  }

  db.query('SELECT * FROM users WHERE firstName = ?', [firstName], (err, result) => {
    if (err) {
      return res.status(500).send('Error during login');
    }

    if (result.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = result[0];

    bcrypt.compare(pass, user.pass, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }

      if (!isMatch) {
        return res.status(400).send('Invalid password');
      }

      const token = jwt.sign({ iduser: user.iduser, firstName: user.firstName }, process.env.JWT_SECRET, { expiresIn: '72h' });
      res.json({ token });
    });
  });
};
