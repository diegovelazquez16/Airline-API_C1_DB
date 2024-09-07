const db = require('../dataBase/connection');

exports.getAllFlights = (req, res) => {
    db.query('SELECT * FROM flights', (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching flights');
        }
        res.json(result);
    });
};

exports.getFlightById = (req, res) => {
    const flightId = req.params.id;
    db.query('SELECT * FROM flights WHERE idflight = ?', [flightId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching flight');
        }
        if (result.length === 0) {
            return res.status(404).send('Flight not found');
        }
        res.json(result[0]);
    });
};

exports.addFlight = (req, res) => {
    const newFlight = req.body;
    if (!newFlight.destinity || !newFlight.origin || !newFlight.departureTime || !newFlight.arrivalTime || !newFlight.date || !newFlight.passangers_number || !newFlight.idairplane) {
        return res.status(400).send('All fields are required');
    }

    db.query('INSERT INTO flights (destinity, origin, departureTime, arrivalTime, date, passangers_number, idairplane) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [newFlight.destinity, newFlight.origin, newFlight.departureTime, newFlight.arrivalTime, newFlight.date, newFlight.passangers_number, newFlight.idairplane],
        (err, result) => {
            if (err) {
                return res.status(500).send('Error adding flight');
            }
            res.status(201).send('Flight added successfully');
        }
    );
};

exports.updateFlight = (req, res) => {
    const flightId = req.params.id;
    const updatedFlight = req.body;

    db.query('UPDATE flights SET ? WHERE idflight = ?', [updatedFlight, flightId], (err, result) => {
        if (err) {
            return res.status(500).send('Error updating flight');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Flight not found');
        }
        res.send('Flight updated successfully');
    });
};

exports.deleteFlight = (req, res) => {
    const flightId = req.params.id;

    db.query('DELETE FROM flights WHERE idflight = ?', [flightId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting flight');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Flight not found');
        }
        res.send('Flight deleted successfully');
    });
};

