import prisma from "../config/prismaClient";
import bcrypt from "bcryptjs";

/**
 * SEEDER DATABASE
 * ==============
 * Mode 'admin' : Crée uniquement le compte administrateur
 * Mode 'full'  : Nettoie la base et crée l'intégralité des données de test 
 */

async function seedAdmin() {
  console.log("--- Mode ADMIN : Vérification/Création du compte Admin ---");
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@edacademy.com" },
    update: {},
    create: {
      fullName: "Admin Principal",
      email: "admin@edacademy.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin OK :", admin.email);
  return admin;
}

async function seedDummyData(admin: any) {
  console.log("\n--- Mode FULL : Création des données de test complètes ---");

  // Clean database (in reverse order of dependencies)
  console.log("Cleaning existing data...");
  await prisma.attendance.deleteMany();
  await prisma.session.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany({ where: { role: "STUDENT" } });
  await prisma.class.deleteMany();
  await prisma.user.deleteMany({
    where: {
      role: "TEACHER",
      email: { not: "admin@edacademy.com" }
    },
  });
  console.log("Database cleaned\n");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Teachers
  console.log("Creating teachers...");
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
  console.log("3 teachers created\n");

  // 2. Create Classes
  console.log("Creating classes...");
  const classPHPLaravel = await prisma.class.create({
    data: {
      name: "PHP/Laravel", level: "A1", academicYear: "2025-2026",
      createdById: admin.id, teacherId: teacherPHP.id,
    },
  });

  const classPython = await prisma.class.create({
    data: {
      name: "Python", level: "A1", academicYear: "2025-2026",
      createdById: admin.id, teacherId: null,
    },
  });

  const classJS = await prisma.class.create({
    data: {
      name: "JavaScript/MERN", level: "A2", academicYear: "2025-2026",
      createdById: admin.id, teacherId: teacherJS.id,
    },
  });

  const classJava = await prisma.class.create({
    data: {
      name: "Java/Spring", level: "A2", academicYear: "2025-2026",
      createdById: admin.id, teacherId: teacherJava.id,
    },
  });
  console.log("4 classes created\n");

  // 3. Create Students (5 per class = 20 total)
  console.log("Creating students...");
  const groups = [
    { names: ["Amine Kadiri", "Fatima Zahrae", "Omar Benjelloun", "Khadija Lahlou", "Rachid Tazi"], classId: classPHPLaravel.id },
    { names: ["Younes Idrissi", "Salma Bennani", "Hamza Chraibi", "Nadia Fassi", "Mehdi Ouazzani"], classId: classPython.id },
    { names: ["Karim Berrada", "Leila Amrani", "Yassine El Khattabi", "Imane Squalli", "Adil Benjelloun"], classId: classJS.id },
    { names: ["Soufiane Mohammadi", "Zineb Alaoui", "Reda Kettani", "Houda Benmoussa", "Tarik Senhaji"], classId: classJava.id },
  ];

  const students = [];
  for (const group of groups) {
    for (const name of group.names) {
      const email = name.toLowerCase().replace(/\s+/g, ".") + "@student.com";
      const s = await prisma.user.create({
        data: { fullName: name, email, password: hashedPassword, role: "STUDENT", classId: group.classId },
      });
      students.push(s);
    }
  }
  console.log("20 students created\n");

  // 4. Create Subjects
  console.log("Creating subjects...");
  const subjectMap = [
    { classId: classPHPLaravel.id, teacherId: teacherPHP.id, names: ["HTML", "CSS", "JavaScript Basics", "MySQL", "UML", "PHP", "Laravel", "React Basics"] },
    { classId: classPython.id, teacherId: null, names: ["Python Fundamentals", "Django", "Flask", "Data Science", "Machine Learning"] },
    { classId: classJS.id, teacherId: teacherJS.id, names: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Next.js", "Nest.js", "PostgreSQL"] },
    { classId: classJava.id, teacherId: teacherJava.id, names: ["Java SE", "JEE", "Spring Framework", "Spring Boot", "Spring Security", "Hibernate", "Microservices"] },
  ];

  const subjects = [];
  for (const item of subjectMap) {
    for (const name of item.names) {
      subjects.push(await prisma.subject.create({
        data: { name, classId: item.classId, teacherId: item.teacherId },
      }));
    }
  }
  console.log(`${subjects.length} subjects created\n`);

  // 5. Create Sessions
  console.log("Creating sessions...");
  const timeSlots = [
    { start: "09:00", end: "10:30" }, { start: "10:45", end: "12:30" },
    { start: "14:00", end: "15:30" }, { start: "15:45", end: "17:30" },
  ];
  const sessionDates = [new Date("2026-01-12"), new Date("2026-01-13"), new Date("2026-01-15"), new Date("2026-01-16")];
  const today = new Date("2026-01-14");

  const rooms: Record<string, string> = {
    [classPHPLaravel.id]: "Salle PHP-101",
    [classPython.id]: "Salle Python-102",
    [classJS.id]: "Salle JS-201",
    [classJava.id]: "Salle Java-202",
  };

  const sessions = [];
  for (const date of sessionDates) {
    for (const classItem of [classPHPLaravel, classPython, classJS, classJava]) {
      const classSubjs = subjects.filter(s => s.classId === classItem.id);
      for (let i = 0; i < timeSlots.length; i++) {
        const sub = classSubjs[i % classSubjs.length];
        sessions.push(await prisma.session.create({
          data: {
            date, startTime: timeSlots[i].start, endTime: timeSlots[i].end,
            room: rooms[classItem.id],
            classId: classItem.id, subjectId: sub.id,
            teacherId: sub.teacherId ?? teacherJS.id,
          },
        }));
      }
    }
  }
  console.log(`${sessions.length} sessions created\n`);

  // 6. Attendance
  console.log("Creating attendance records for past sessions...");
  const pastSessions = sessions.filter(s => s.date < today);
  for (const session of pastSessions) {
    const classStudents = students.filter(s => s.classId === session.classId);
    for (const student of classStudents) {
      const random = Math.random();
      let status: "PRESENT" | "ABSENT" | "LATE";
      let justification: "JUSTIFIED" | "NOT_JUSTIFIED" | null = null;

      if (random < 0.8) status = "PRESENT";
      else if (random < 0.95) {
        status = "ABSENT";
        justification = random < 0.9 ? "NOT_JUSTIFIED" : "JUSTIFIED";
      } else status = "LATE";

      await prisma.attendance.create({
        data: { sessionId: session.id, studentId: student.id, status, justification },
      });
    }
  }
  console.log("Attendance records created\n");
}

async function main() {
  const mode = process.env.SEED_MODE || "full";

  try {
    const admin = await seedAdmin();

    if (mode === "full") {
      await seedDummyData(admin);
      console.log("==========================================");
      console.log("FULL SEEDING COMPLETED SUCCESSFULLY!");
      console.log("==========================================\n");
    } else {
      console.log("==========================================");
      console.log("ADMIN ONLY SEEDING COMPLETED!");
      console.log("==========================================\n");
    }
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
