import { readAcademicYears } from '../services/academic_years.services.js';

export async function getAcademicYears(req, res) {
  try {
    const academicYears = await readAcademicYears();
    res.status(200).json({
      success: true,
      message: 'academic years fetched',
      academicYears,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'failed to fetch academic years',
    });
  }
}
