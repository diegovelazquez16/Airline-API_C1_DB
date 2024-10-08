const db = require('../dataBase/connection');

exports.getTicket = (req, res) => {
    const bookId = req.params.bookId;
    db.query('SELECT idflight FROM book WHERE idbook = ?', [bookId], (err, bookResult) => {
        if (err) {
            return res.status(500).send('Error fetching booking');
        }
        if (bookResult.length === 0) {
            return res.status(404).send('Booking not found');
        }

        const idflight = bookResult[0].idflight;
        db.query('SELECT idairplane FROM flights WHERE idflight = ?', [idflight], (err, flightResult) => {
            if (err) {
                return res.status(500).send('Error fetching flight');
            }
            if (flightResult.length === 0) {
                return res.status(404).send('Flight not found');
            }

            const idairplane = flightResult[0].idairplane;
            db.query('SELECT idpassenger FROM passengers WHERE idbook = ?', [bookId], (err, passengerResult) => {
                if (err) {
                    return res.status(500).send('Error fetching passenger');
                }
                if (passengerResult.length === 0) {
                    return res.status(404).send('Passenger not found');
                }

                const idpassenger = passengerResult[0].idpassenger;
                const insertQuery = 'INSERT INTO ticket (idbook, idflight, idairplane, idpasanger) VALUES (?, ?, ?, ?)';
                db.query(insertQuery, [bookId, idflight, idairplane, idpassenger], (err, insertResult) => {
                    if (err) {
                        return res.status(500).send('Error inserting ticket');
                    }

                    res.json({ message: 'Ticket successfully created', ticketId: insertResult.insertId });
                });
            });
        });
    });
};


exports.getAllTickets = (req, res) => {
    db.query('SELECT * FROM ticket', (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching ticket');
        }
        res.json(result);
    });
};

exports.getTicketByPassenger = (req, res) => {
    const passengerId = req.params.passengerId;
    db.query('SELECT * FROM ticket WHERE idpasanger = ?', [passengerId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching tickets');
        }
        if (result.length === 0) {
            return res.status(404).send('No tickets found for this passenger');
        }
        res.json(result);
    });
};

exports.addTicket = (req, res) => {
    const { bookId, flightId, airplaneId, passengerId } = req.body;

    if (!bookId || !flightId || !airplaneId || !passengerId) {
        return res.status(400).send('Missing required fields');
    }

    const insertQuery = 'INSERT INTO ticket (idbook, idflight, idairplane, idpasanger) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [bookId, flightId, airplaneId, passengerId], (err, result) => {
        if (err) {
            return res.status(500).send('Error creating ticket');
        }
        res.status(201).json({ message: 'Ticket successfully created', ticketId: result.insertId });
    });
};

/* Borrar un ticket por idticket
exports.deleteTicket = (req, res) => {
    const ticketId = req.params.ticketId;

    // Verificar si el ticket existe antes de intentar borrarlo
    db.query('SELECT * FROM ticket WHERE idticket = ?', [ticketId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching ticket');
        }
        if (result.length === 0) {
            return res.status(404).send('Ticket not found');
        }

        // Si existe, procedemos a eliminar el ticket
        db.query('DELETE FROM ticket WHERE idticket = ?', [ticketId], (err, deleteResult) => {
            if (err) {
                return res.status(500).send('Error deleting ticket');
            }

            res.json({ message: 'Ticket successfully deleted' });
        });
    });
}; */
