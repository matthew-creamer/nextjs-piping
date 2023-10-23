const info = require('../../models/info');
const cml = require('../../models/cml');
import { GetActualOutsideDiameter, GetDesignThickness, GetStructuralThickness, GetRequiredThickness } from '../../util/calc';

export default async function handler(req, res) {
  if (req.method === "GET") {
    const infoData = await info.findAll();
    res.status(200).json(infoData);
  } else if (req.method === "POST") {
    const {
      line_number,
      location,
      from,
      to,
      drawing_number,
      service,
      material,
      inservice_date,
      pipe_size,
      original_thickness,
      stress,
      joint_efficiency,
      ca,
      design_life,
      design_pressure,
      operating_pressure,
      design_temperature,
      operating_temperature
    } = req.body;
    info.findOrCreate({
      where: { line_number: line_number },
      defaults: {
        line_number: line_number,
        location: location,
        from: from,
        to: to,
        drawing_number: drawing_number,
        service: service,
        material: material,
        inservice_date: inservice_date,
        pipe_size: pipe_size,
        original_thickness: original_thickness,
        stress: stress,
        joint_efficiency: joint_efficiency,
        ca: ca,
        design_life: design_life,
        design_pressure: design_pressure,
        operating_pressure: operating_pressure,
        design_temperature: design_temperature,
        operating_temperature: operating_temperature
      },
    }).then(async ([row, created]) => {
      if (!created) {
        console.log('Existing row updated:', row.get());
        res.status(200).json({ message: 'Existing row updated', row: row.get() });

        await row.update({
          line_number: line_number,
          location: location,
          from: from,
          to: to,
          drawing_number: drawing_number,
          service: service,
          material: material,
          inservice_date: inservice_date,
          pipe_size: pipe_size,
          original_thickness: original_thickness,
          stress: stress,
          joint_efficiency: joint_efficiency,
          ca: ca,
          design_life: design_life,
          design_pressure: design_pressure,
          operating_pressure: operating_pressure,
          design_temperature: design_temperature,
          operating_temperature: operating_temperature
        });

        cml.findAll({
          where: {
            line_number: line_number,
          },
        })
          .then((rows) => {
            if (rows && rows.length > 0) {
              const updatePromises = rows.map((row) => {
                return row.update({
                  actual_outside_diameter: GetActualOutsideDiameter(pipe_size),
                  design_thickness: GetDesignThickness(design_pressure, GetActualOutsideDiameter(pipe_size), stress, joint_efficiency),
                  structural_thickness: GetStructuralThickness(pipe_size),
                  required_thickness: GetRequiredThickness(GetDesignThickness(design_pressure, GetActualOutsideDiameter(pipe_size), stress, joint_efficiency), GetStructuralThickness(pipe_size)),
                });
              });
        
              return Promise.all(updatePromises);
            } else {
              return null;
            }
          })
          .then((updatedRows) => {
            if (updatedRows) {
              res.status(200).json({ message: 'Rows updated', rows: updatedRows.map((row) => row.get()) });
            } else {
              res.status(404).json({ message: 'No matching rows found' });
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error' });
          });
        /*
        cml.findAll({
          where: {
            line_number: line_number,
          },
        })
          .then((row) => {
            if (row) {
              return row.update({
                actual_outside_diameter: GetActualOutsideDiameter(pipe_size),
                design_thickness: GetDesignThickness(design_pressure, GetActualOutsideDiameter(pipe_size), stress, joint_efficiency),
                structural_thickness: GetStructuralThickness(pipe_size),
                required_thickness: GetRequiredThickness(GetDesignThickness(design_pressure, GetActualOutsideDiameter(pipe_size), stress, joint_efficiency), GetStructuralThickness(pipe_size))
              });
            } 
          })
          .then((updatedRow) => {
            res.status(200).json({ message: 'Row updated', row: updatedRow.get() });
          })
          .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error' });
          });
          */
      } else {
        res.status(201).json({ message: 'New row created', row: row.get() });
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    info.destroy({
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