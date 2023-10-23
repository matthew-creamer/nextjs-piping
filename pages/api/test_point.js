const test_point = require('../../models/test_point');
const { Op } = require('sequelize');

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { param1, param2 } = req.query;
        const test_pointData = await test_point.findAll({
            where: {
                [Op.and]: [
                    { line_number: param1 },
                    { cml_number: param2 },
                ]
            },
        });
        res.status(200).json(test_pointData);
    } else if (req.method === "POST") {
        const {
            line_number,
            cml_number,
            tp_number,
            tp_description,
            note,
        } = req.body;
        test_point.findOrCreate({
            where: {
                [Op.and]: [
                    { line_number: line_number },
                    { cml_number: cml_number },
                    { tp_number: tp_number },
                ],
            },
            defaults: {
                line_number: line_number,
                cml_number: cml_number,
                tp_number: tp_number,
                tp_description: tp_description,
                note: note
            },
        }).then(async ([row, created]) => {
            if (!created) {
                console.log('Existing row updated:', row.get());
                res.status(200).json({ message: 'Existing row updated', row: row.get() });

                await row.update({
                    line_number: line_number,
                    cml_number: cml_number,
                    tp_number: tp_number,
                    tp_description: tp_description,
                    note: note
                });
            } else {
                console.log('New row created:', row.get());
                res.status(201).json({ message: 'New row created', row: row.get() });
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else if (req.method === "DELETE") {
        const { id } = req.body;

        test_point.destroy({
            where: { id: id },
        }).then(async (deletedRow) => {
            console.log(`Deleted ${deletedRow} rows.`);
            if (deletedRow > 0) {
                res.status(204).end();
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
}