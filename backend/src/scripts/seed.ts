import prisma from "../config/prismaClient";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Starting database seeding...\n");

  // Clean database (in reverse order of dependencies)
  console.log("Cleaning existing data...");
  await prisma.attendance.deleteMany();
  await prisma.session.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany({ where: { role: "STUDENT" } });
  await prisma.class.deleteMany();
  await prisma.user.deleteMany({
    where: { role: { in: ["ADMIN", "TEACHER"] } },
  });
  console.log("Database cleaned\n");

  // ============================================
  // 1. Create Users (Admin, Teachers)
  // ============================================
  console.log("Creating users...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Admin
  const admin = await prisma.user.create({
    data: {
      fullName: "Admin Principal",
      email: "admin@test.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // 3 Teachers
  const teacherJS = await prisma.user.create({
    data: {
      fullName: "Prof. Ahmed Benali",
      email: "ahmed.benali@teacher.com",
      password: hashedPassword,
      role: "TEACHER",
    },
  });

  const teacherJava = await prisma.user.create({
    data: {
      fullName: "Prof. Sarah Mansouri",
      email: "sarah.mansouri@teacher.com",
      password: hashedPassword,
      role: "TEACHER",
    },
  });

  const teacherPHP = await prisma.user.create({
    data: {
      fullName: "Prof. Youssef Alami",
      email: "youssef.alami@teacher.com",
      password: hashedPassword,
      role: "TEACHER",
    },
  });

  const teachers = [teacherJS, teacherJava, teacherPHP];
  console.log(`${teachers.length} teachers created\n`);

  // ============================================
  // 2. Create Classes (4 classes: 2 A1, 2 A2)
  // ============================================
  console.log("Creating classes...");

  // Level A1 - 2 classes
  const classPHPLaravel = await prisma.class.create({
    data: {
      name: "PHP/Laravel",
      level: "A1",
      academicYear: "2025-2026",
      createdById: admin.id,
      teacherId: teacherPHP.id,
    },
  });

  const classPython = await prisma.class.create({
    data: {
      name: "Python",
      level: "A1",
      academicYear: "2025-2026",
      createdById: admin.id,
      teacherId: null,
    },
  });

  // Level A2 - 2 classes
  const classJS = await prisma.class.create({
    data: {
      name: "JavaScript/MERN",
      level: "A2",
      academicYear: "2025-2026",
      createdById: admin.id,
      teacherId: teacherJS.id,
    },
  });

  const classJava = await prisma.class.create({
    data: {
      name: "Java/Spring",
      level: "A2",
      academicYear: "2025-2026",
      createdById: admin.id,
      teacherId: teacherJava.id,
    },
  });

  const classes = [classPHPLaravel, classPython, classJS, classJava];
  console.log(`${classes.length} classes created:`);
  console.log("   - A1: PHP/Laravel (Prof. Youssef), Python (sans prof)");
  console.log(
    "   - A2: JavaScript/MERN (Prof. Ahmed), Java/Spring (Prof. Sarah)\n"
  );

  // ============================================
  // 3. Create Students (5 per class = 20 total)
  // ============================================
  console.log("Creating students...");

  const studentsPHP = [
    "Amine Kadiri",
    "Fatima Zahrae",
    "Omar Benjelloun",
    "Khadija Lahlou",
    "Rachid Tazi",
  ];
  const studentsPython = [
    "Younes Idrissi",
    "Salma Bennani",
    "Hamza Chraibi",
    "Nadia Fassi",
    "Mehdi Ouazzani",
  ];
  const studentsJS = [
    "Karim Berrada",
    "Leila Amrani",
    "Yassine El Khattabi",
    "Imane Squalli",
    "Adil Benjelloun",
  ];
  const studentsJava = [
    "Soufiane Mohammadi",
    "Zineb Alaoui",
    "Reda Kettani",
    "Houda Benmoussa",
    "Tarik Senhaji",
  ];

  const allStudentNames = [
    { names: studentsPHP, classId: classPHPLaravel.id },
    { names: studentsPython, classId: classPython.id },
    { names: studentsJS, classId: classJS.id },
    { names: studentsJava, classId: classJava.id },
  ];

  const students = [];
  for (const group of allStudentNames) {
    for (const name of group.names) {
      const email = name.toLowerCase().replace(" ", ".") + "@student.com";
      const student = await prisma.user.create({
        data: {
          fullName: name,
          email,
          password: hashedPassword,
          role: "STUDENT",
          classId: group.classId,
        },
      });
      students.push(student);
    }
  }
  console.log(`${students.length} students created (5 per class)\n`);

  // ============================================
  // 4. Create Subjects (IT specializations)
  // ============================================
  console.log("Creating subjects...");

  const subjectsPHPData = [
    "HTML",
    "CSS",
    "JavaScript Basics",
    "MySQL",
    "UML",
    "PHP",
    "Laravel",
    "React Basics",
  ];
  const subjectsPythonData = [
    "Python Fundamentals",
    "Django",
    "Flask",
    "Data Science",
    "Machine Learning",
  ];
  const subjectsJSData = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
    "Next.js",
    "Nest.js",
    "PostgreSQL",
  ];
  const subjectsJavaData = [
    "Java SE",
    "JEE",
    "Spring Framework",
    "Spring Boot",
    "Spring Security",
    "Hibernate",
    "Microservices",
  ];

  const subjects = [];

  for (const name of subjectsPHPData) {
    subjects.push(
      await prisma.subject.create({
        data: { name, classId: classPHPLaravel.id, teacherId: teacherPHP.id },
      })
    );
  }

  for (const name of subjectsPythonData) {
    subjects.push(
      await prisma.subject.create({
        data: { name, classId: classPython.id, teacherId: null },
      })
    );
  }

  for (const name of subjectsJSData) {
    subjects.push(
      await prisma.subject.create({
        data: { name, classId: classJS.id, teacherId: teacherJS.id },
      })
    );
  }

  for (const name of subjectsJavaData) {
    subjects.push(
      await prisma.subject.create({
        data: { name, classId: classJava.id, teacherId: teacherJava.id },
      })
    );
  }

  console.log(`${subjects.length} subjects created\n`);

  // ============================================
  // 5. Create Sessions (12-16 Jan 2026, except 14)
  // ============================================
  console.log("Creating sessions...");

  const timeSlots = [
    { start: "09:00", end: "10:30" },
    { start: "10:45", end: "12:30" },
    { start: "14:00", end: "15:30" },
    { start: "15:45", end: "17:30" },
  ];

  const sessionDates = [
    new Date("2026-01-12"),
    new Date("2026-01-13"),
    // 14/01/2026: FREE (no sessions)
    new Date("2026-01-15"),
    new Date("2026-01-16"),
  ];

  const today = new Date("2026-01-14");

  const rooms: Record<string, string> = {
    [classPHPLaravel.id]: "Salle PHP-101",
    [classPython.id]: "Salle Python-102",
    [classJS.id]: "Salle JS-201",
    [classJava.id]: "Salle Java-202",
  };

  const classSubjects: Record<string, any[]> = {
    [classPHPLaravel.id]: subjects.filter(
      (s) => s.classId === classPHPLaravel.id
    ),
    [classPython.id]: subjects.filter((s) => s.classId === classPython.id),
    [classJS.id]: subjects.filter((s) => s.classId === classJS.id),
    [classJava.id]: subjects.filter((s) => s.classId === classJava.id),
  };

  const sessions = [];

  for (const date of sessionDates) {
    for (const classItem of classes) {
      const classSubjectList = classSubjects[classItem.id];

      for (let slotIndex = 0; slotIndex < timeSlots.length; slotIndex++) {
        const slot = timeSlots[slotIndex];
        const subjectIndex = slotIndex % classSubjectList.length;
        const subject = classSubjectList[subjectIndex];

        sessions.push(
          await prisma.session.create({
            data: {
              date,
              startTime: slot.start,
              endTime: slot.end,
              room: rooms[classItem.id],
              classId: classItem.id,
              subjectId: subject.id,
              teacherId: subject.teacherId ?? teacherPHP.id,
            },
          })
        );
      }
    }
  }

  console.log(`${sessions.length} sessions created`);
  console.log("   - 12/01/2026 (Lundi): 16 sessions (4 per class)");
  console.log("   - 13/01/2026 (Mardi): 16 sessions (4 per class)");
  console.log("   - 14/01/2026 (Mercredi): FREE - No sessions");
  console.log("   - 15/01/2026 (Jeudi): 16 sessions (4 per class)");
  console.log("   - 16/01/2026 (Vendredi): 16 sessions (4 per class)\n");

  // ============================================
  // 6. Create Attendance Records (only 12 & 13 Jan)
  // ============================================
  console.log("Creating attendance records...");
  console.log("Only for past sessions (12/01 and 13/01/2026)...");

  const pastSessions = sessions.filter((s) => s.date < today);
  let attendanceCount = 0;

  for (const session of pastSessions) {
    const classStudents = students.filter((s) => s.classId === session.classId);

    for (const student of classStudents) {
      const random = Math.random();
      let status: "PRESENT" | "ABSENT" | "LATE";
      let justification: "JUSTIFIED" | "NOT_JUSTIFIED" | null = null;

      if (random < 0.8) {
        status = "PRESENT";
      } else if (random < 0.95) {
        status = "ABSENT";
        justification = random < 0.9 ? "NOT_JUSTIFIED" : "JUSTIFIED";
      } else {
        status = "LATE";
      }

      await prisma.attendance.create({
        data: {
          sessionId: session.id,
          studentId: student.id,
          status,
          justification,
        },
      });
      attendanceCount++;
    }
  }

  console.log(`${attendanceCount} attendance records created\n`);

  console.log("==========================================");
  console.log("SEEDING COMPLETED SUCCESSFULLY!");
  console.log("==========================================\n");

  console.log("Default Credentials:");
  console.log("   Admin:    admin@test.com / password123");
  console.log("   Teacher:  ahmed.benali@teacher.com / password123");
  console.log("   Teacher:  sarah.mansouri@teacher.com / password123");
  console.log("   Teacher:  youssef.alami@teacher.com / password123");
  console.log("   Student:  karim.berrada@student.com / password123\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
