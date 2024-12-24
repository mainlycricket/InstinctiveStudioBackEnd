import prisma from '../config/prisma/client.js';

export async function readStudents({ yearId, classId }) {
  const filters = {};

  if (yearId) {
    filters.AcademicYearId = parseInt(yearId);
  }

  if (classId) {
    filters.ClassId = parseInt(classId);
  }

  const students = await prisma.student.findMany({
    where: filters,
    include: {
      User: {
        select: {
          id: true,
          name: true,
          lastLoginTimestamp: true,
          createdAt: true,
          isActive: true,
        },
      },
      AcademicYear: {
        select: {
          id: true,
          name: true,
        },
      },
      Class: {
        select: {
          id: true,
          name: true,
        },
      },
      StudentCourse: {
        include: {
          course: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return students.map((student) => ({
    id: student.User.id,
    name: student.User.name,
    lastLoginDate: student.User.lastLoginTimestamp,
    isActive: student.User.isActive,
    createdAt: student.User?.createdAt,
    academicYear: {
      id: student.AcademicYear.id,
      name: student.AcademicYear.name,
    },
    class: {
      id: student.Class.id,
      name: student.Class.name,
    },
    courses: student.StudentCourse.map((sc) => ({
      id: sc.course.id,
      name: sc.course.name,
      image: sc.course?.image,
    })),
  }));
}
