const thickness = require('../../models/thickness');
const { Op } = require('sequelize');

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { param1, param2, param3 } = req.query;
        const thicknessData = await thickness.findAll({
            where: {
                [Op.and]: [
                    { line_number: param1 },
                    { cml_number: param2 },
                    { tp_number: param3 },
                ]
            },
        });
        res.status(200).json(thicknessData);
    } else if (req.method === "POST") {
        const {
            line_number,
            cml_number,
            tp_number,
            inspection_date,
            actual_thickness,
        } = req.body;
        const row = thickness.create({
            line_number: line_number,
            cml_number: cml_number,
            tp_number: tp_number,
            inspection_date: inspection_date,
            actual_thickness: actual_thickness
        });
        if (row)
            res.status(200).json(row);
    } else if (req.method === "DELETE") {
        const { id } = req.body;

        thickness.destroy({
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