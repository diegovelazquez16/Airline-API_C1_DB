const db = require('../dataBase/connection');

exports.getAllQuotes = (req, res) => {
    db.query('SELECT * FROM quote', (err, result) => {
      if (err) {
        console.error('Error fetching quotes:', err);
        return res.status(500).send('Error fetching quotes');
      }
      res.json(result);
    });
  };
  
  exports.getQuoteById = (req, res) => {
    const quoteId = req.params.id;
  
    db.query('SELECT * FROM quote WHERE idquote = ?', [quoteId], (err, result) => {
      if (err) {
        console.error('Error fetching quote:', err);
        return res.status(500).send('Error fetching quote');
      }
      if (result.length === 0) {
        return res.status(404).send('Quote not found');
      }
      res.json(result[0]);
    });
  };

  exports.addQuote = (req, res) => {
    const { idflight, idbook } = req.body;
  
    if (!idflight || !idbook) {
      return res.status(400).send('All fields are required');
    }
  
    const query = 'INSERT INTO quote (idflight, idbook) VALUES (?, ?)';
  
    db.query(query, [idflight, idbook], (err, result) => {
      if (err) {
        console.error('Error adding quote:', err);
        return res.status(500).send('Error adding quote');
      }
      res.status(201).send('Quote added successfully');
    });
  };
  
  exports.updateQuote = (req, res) => {
    const quoteId = req.params.id;
    const { idflight, idbook } = req.body;
  
    if (!idflight || !idbook) {
      return res.status(400).send('All fields are required');
    }
  
    const query = 'UPDATE quote SET idflight = ?, idbook = ? WHERE idquote = ?';
  
    db.query(query, [idflight, idbook, quoteId], (err, result) => {
      if (err) {
        console.error('Error updating quote:', err);
        return res.status(500).send('Error updating quote');
      }
      res.send('Quote updated successfully');
    });
  };
  
  exports.deleteQuote = (req, res) => {
    const quoteId = req.params.id;
  
    db.query('DELETE FROM quote WHERE idquote = ?', [quoteId], (err, result) => {
      if (err) {
        console.error('Error deleting quote:', err);
        return res.status(500).send('Error deleting quote');
      }
      res.send('Quote deleted successfully');
    });
  };