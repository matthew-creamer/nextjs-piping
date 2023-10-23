const cml = require('../../models/cml');
const { Op } = require('sequelize');
const info = require('../../models/info');
import { GetActualOutsideDiameter, GetDesignThickness, GetStructuralThickness, GetRequiredThickness } from '../../util/calc';

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { param1 } = req.query;
        const cmlData = await cml.findAll({
            where: {
                line_number: param1
            },
        });
        res.status(200).json(cmlData);
    } else if (req.method === "POST") {
        const {
            line_number,
            cml_number,
            cml_description,
        } = req.body;

        info.findOne({
            where: {
                line_number: line_number,
            },
        })
            .then((infoRow) => {
                if (infoRow) {
                    cml.findOrCreate({
                        where: {
                            [Op.and]: [
                                { line_number: line_number },
                                { cml_number: cml_number },
                            ],
                        },
                        defaults: {
                            line_number: line_number,
                            cml_number: cml_number,
                            cml_description: cml_description,
                            actual_outside_diameter: GetActualOutsideDiameter(infoRow.pipe_size),
                            design_thickness: GetDesignThickness(infoRow.design_pressure, GetActualOutsideDiameter(infoRow.pipe_size), infoRow.stress, infoRow.joint_efficiency),
                            structural_thickness: GetStructuralThickness(infoRow.pipe_size),
                            required_thickness: GetRequiredThickness(GetDesignThickness(infoRow.design_pressure, GetActualOutsideDiameter(infoRow.pipe_size), infoRow.stress, infoRow.joint_efficiency), GetStructuralThickness(infoRow.pipe_size))
                        },
                    }).then(async ([row, created]) => {
                        if (!created) {
                            console.log('Existing row updated:', row.get());
                            res.status(200).json({ message: 'Existing row updated', row: row.get() });

                            await row.update({
                                line_number: line_number,
                                cml_number: cml_number,
                                cml_description: cml_description,
                            });
                        } else {
                            console.log('New row created:', row.get());
                            res.status(201).json({ message: 'New row created', row: row.get() });
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                } else {
                    console.log('No matching row found');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });;
    } else if (req.method === "DELETE") {
        const { id } = req.body;

        cml.destroy({
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