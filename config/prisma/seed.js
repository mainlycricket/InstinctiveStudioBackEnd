import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      $allOperations({ operation, args, query }) {
        if (['create', 'update'].includes(operation) && args.data['password']) {
          args.data['password'] = bcrypt.hashSync(args.data['password'], 10);
        }
        return query(args);
      },
    },
  },
});

async function main() {
  // Insert Academic Year
  const academicYear = await prisma.academicYear.create({
    data: {
      name: '2023-24',
    },
  });

  // Insert Class
  const classCBSE8 = await prisma.class.create({
    data: {
      name: 'CBSE 8',
    },
  });

  // Insert Courses
  const courseEnglish = await prisma.course.create({
    data: {
      name: 'CBSE English',
    },
  });

  const courseHindi = await prisma.course.create({
    data: {
      name: 'CBSE Hindi',
    },
  });

  // Insert 15 Students
  for (let i = 16; i <= 30; i++) {
    const student = await prisma.user.create({
      data: {
        name: `Student ${i}`,
        email: `student${i}@example.com`,
        password: process.env.TEMP_PASS,
        role: 'student',
        Student: {
          create: {
            AcademicYearId: academicYear.id,
            ClassId: classCBSE8.id,
            StudentCourse: {
              create: [
                {
                  courseId: courseHindi.id,
                },
                {
                  courseId: courseEnglish.id,
                },
              ],
            },
          },
        },
      },
    });
  }

  console.log('Seed data created successfully!');
}

// main()
//   .then(() => {
//     console.log('data seeded successfully!');
//   })
//   .catch((err) => {
//     console.log('data seeding failed, ', err);
//   });
