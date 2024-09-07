const db = require('../dataBase/connection');

exports.getAllAirplanes = (req, res) => {
    db.query('SELECT * FROM airplanes', (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching airplanes');
        }
        res.json(result);
    });
};

exports.getAirplaneById = (req, res) => {
    const airplaneId = req.params.id;
    db.query('SELECT * FROM airplanes WHERE idairplane = ?', [airplaneId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching airplane');
        }
        if (result.length === 0) {
            return res.status(404).send('Airplane not found');
        }
        res.json(result[0]);
    });
};

exports.addAirplane = (req, res) => {
    const newAirplane = req.body;
    if (!newAirplane.NameP || !newAirplane.registration || !newAirplane.airline || !newAirplane.capacity) {
        return res.status(400).send('Name, registration, airline, and capacity are required');
    }

    db.query('INSERT INTO airplanes (NameP, registration, airline, capacity) VALUES (?, ?, ?, ?)',
        [newAirplane.NameP, newAirplane.registration, newAirplane.airline, newAirplane.capacity],
        (err, result) => {
            if (err) {
                return res.status(500).send('Error adding airplane');
            }
            res.status(201).send('Airplane added successfully');
        }
    );
};

exports.updateAirplane = (req, res) => {
    const airplaneId = req.params.id;
    const updatedAirplane = req.body;

    db.query('UPDATE airplanes SET ? WHERE idairplane = ?', [updatedAirplane, airplaneId], (err, result) => {
        if (err) {
            return res.status(500).send('Error updating airplane');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Airplane not found');
        }
        res.send('Airplane updated successfully');
    });
};

exports.deleteAirplane = (req, res) => {
    const airplaneId = req.params.id;

    db.query('DELETE FROM airplanes WHERE idairplane = ?', [airplaneId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting airplane');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Airplane not found');
        }
        res.send('Airplane deleted successfully');
    });
};

