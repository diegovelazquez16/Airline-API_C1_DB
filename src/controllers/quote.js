const db = require('../dataBase/connection');

exports.getQuote = (req, res) => {
    const bookId = req.params.bookId;  
    const flightId = req.params.flightId;  
  
    db.query('SELECT numPassengers FROM book WHERE idbook = ?', [bookId], (err, bookResult) => {
        if (err) {
            return res.status(500).send('Error fetching booking');
        }
        if (bookResult.length === 0) {
            return res.status(404).send('Booking not found');
        }

        const numPassengers = bookResult[0].numPassengers;

        db.query('INSERT INTO quote (idbook) VALUES (?)', [bookId], (err, insertResult) => {
            if (err) {
                return res.status(500).send('Error inserting idbook into quote');
            }

            db.query('SELECT price FROM flights WHERE idflight = ?', [flightId], (err, flightResult) => {
                if (err) {
                    return res.status(500).send('Error fetching flight');
                }
                if (flightResult.length === 0) {
                    return res.status(404).send('Flight not found');
                }

                const price = flightResult[0].price;
                const total = price * numPassengers; 
                db.query('UPDATE quote SET idflight = ?, total = ? WHERE idbook = ?', [flightId, total, bookId], (err, updateResult) => {
                    if (err) {
                        return res.status(500).send('Error updating quote with flightId and total');
                    }

                    res.json({ total, message: 'Total successfully saved in the quote' });
                });
            });
        });
    });
};

exports.getAllquotes = (req, res) => {
    db.query('SELECT * FROM quote', (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching quote');
        }
        res.json(result);
    });
};

exports.deleteQuote = (req, res) => {
    const quoteId = req.params.id;

    db.query('DELETE FROM quote WHERE idquote = ?', [quoteId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting quote');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Quote not found');
        }
        res.send('Quote deleted successfully');
    });
};

