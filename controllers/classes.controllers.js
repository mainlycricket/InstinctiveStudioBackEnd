import { readClasses } from '../services/classes.services.js';

export async function getClasses(req, res) {
  try {
    const classes = await readClasses();
    res.status(200).json({
      success: true,
      message: 'classes fetched',
      classes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'failed to fetch classes',
    });
  }
}
