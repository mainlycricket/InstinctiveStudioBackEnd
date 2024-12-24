import { readStudents } from '../services/students.services.js';

export async function getStudents(req, res) {
  try {
    const { yearId, classId } = req.query;
    const students = await readStudents({ yearId, classId });
    res.status(200).json({
      success: true,
      message: 'students fetched',
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'failed to fetch students',
    });
  }
}
