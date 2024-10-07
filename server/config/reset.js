import { pool } from './connections.js';
import './dotenv.js';

const executeQuery = async (query, successMessage) => {
    try {
        await pool.query(query);
        console.log(successMessage);
    } catch (err) {
        console.error(`Error executing query: ${err.message}`);
    }
};

const createTables = async () => {
    const createSchoolsTable = `CREATE TABLE IF NOT EXISTS schools (
        school_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        school_name VARCHAR(50) NOT NULL,
        address VARCHAR(50) NOT NULL,
        contact_email VARCHAR(50) UNIQUE NOT NULL,
        contact_phone VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    const createAdministratorsTable = `CREATE TABLE IF NOT EXISTS administrators (
        admin_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        phone_number VARCHAR(50),
        role VARCHAR(50),
        school_id uuid REFERENCES schools(school_id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    const createEducatorsTable = `CREATE TABLE IF NOT EXISTS educators (
        educator_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        department VARCHAR(50) NOT NULL,
        title VARCHAR(50) NOT NULL,
        school_id uuid REFERENCES schools(school_id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    const createStudentsTable = `CREATE TABLE IF NOT EXISTS students (
        student_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        phone_number VARCHAR(50),
        enrollment_date DATE NOT NULL,
        graduation_date DATE,
        school_id uuid REFERENCES schools(school_id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    const createCoursesTable = `CREATE TABLE IF NOT EXISTS courses (
        course_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        course_name VARCHAR(50) NOT NULL,
        description TEXT,
        course_code uuid DEFAULT gen_random_uuid(),
        credits VARCHAR(50) NOT NULL,
        school_id uuid REFERENCES schools(school_id) ON DELETE CASCADE NOT NULL,
        educator_id uuid REFERENCES educators(educator_id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    // Enrollments Table
    const createEnrollmentsTable = `CREATE TABLE IF NOT EXISTS enrollments (
        enrollment_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        student_id uuid REFERENCES students(student_id) ON DELETE CASCADE NOT NULL,
        course_id uuid REFERENCES courses(course_id) ON DELETE CASCADE NOT NULL,
        enrollment_date DATE NOT NULL,
        grade VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    // Assignments Table
    const createAssignmentsTable = `CREATE TABLE IF NOT EXISTS assignments (
        assignment_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        course_id uuid REFERENCES courses(course_id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(50) NOT NULL,
        description TEXT,
        due_date DATE NOT NULL,
        max_points VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    // Submissions Table
    const createSubmissionsTable = `CREATE TABLE IF NOT EXISTS submissions (
        submission_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        assignment_id uuid REFERENCES assignments(assignment_id) ON DELETE CASCADE NOT NULL,
        student_id uuid REFERENCES students(student_id) ON DELETE CASCADE NOT NULL,
        submission_date DATE NOT NULL,
        grade VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    // Discussions Table
    const createDiscussionsTable = `CREATE TABLE IF NOT EXISTS discussions (
        discussion_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        course_id uuid REFERENCES courses(course_id) ON DELETE CASCADE NOT NULL,
        author_id uuid REFERENCES educators(educator_id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(50) NOT NULL,
        content TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    // Comments Table
    const createCommentsTable = `CREATE TABLE IF NOT EXISTS comments (
        comment_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        discussion_id uuid REFERENCES discussions(discussion_id) ON DELETE CASCADE NOT NULL,
        author_id uuid REFERENCES students(student_id) ON DELETE CASCADE NOT NULL,
        content TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
    )`;

    // Create tables in proper order
    await executeQuery(createSchoolsTable, 'Schools table created successfully');
    await executeQuery(createAdministratorsTable, 'Administrators table created successfully');
    await executeQuery(createEducatorsTable, 'Educators table created successfully');
    await executeQuery(createStudentsTable, 'Students table created successfully');
    await executeQuery(createCoursesTable, 'Courses table created successfully');
    await executeQuery(createEnrollmentsTable, 'Enrollments table created successfully');
    await executeQuery(createAssignmentsTable, 'Assignments table created successfully');
    await executeQuery(createSubmissionsTable, 'Submissions table created successfully');
    await executeQuery(createDiscussionsTable, 'Discussions table created successfully');
    await executeQuery(createCommentsTable, 'Comments table created successfully');
};

const resetTables = async () => {
    const dropSchoolsTable = 'DROP TABLE IF EXISTS schools CASCADE';
    const dropAdministratorsTable = 'DROP TABLE IF EXISTS administrators CASCADE';
    const dropEducatorsTable = 'DROP TABLE IF EXISTS educators CASCADE';
    const dropStudentsTable = 'DROP TABLE IF EXISTS students CASCADE';
    const dropCoursesTable = 'DROP TABLE IF EXISTS courses CASCADE';
    const dropEnrollmentsTable = 'DROP TABLE IF EXISTS enrollments CASCADE';
    const dropAssignmentsTable = 'DROP TABLE IF EXISTS assignments CASCADE';
    const dropSubmissionsTable = 'DROP TABLE IF EXISTS submissions CASCADE';
    const dropDiscussionsTable = 'DROP TABLE IF EXISTS discussions CASCADE';
    const dropCommentsTable = 'DROP TABLE IF EXISTS comments CASCADE';

    await executeQuery(dropSchoolsTable, 'Schools table dropped successfully');
    await executeQuery(dropAdministratorsTable, 'Administrators table dropped successfully');
    await executeQuery(dropEducatorsTable, 'Educators table dropped successfully');
    await executeQuery(dropStudentsTable, 'Students table dropped successfully');
    await executeQuery(dropCoursesTable, 'Courses table dropped successfully');
    await executeQuery(dropEnrollmentsTable, 'Enrollments table dropped successfully');
    await executeQuery(dropAssignmentsTable, 'Assignments table dropped successfully');
    await executeQuery(dropSubmissionsTable, 'Submissions table dropped successfully');
    await executeQuery(dropDiscussionsTable, 'Discussions table dropped successfully');
    await executeQuery(dropCommentsTable, 'Comments table dropped successfully');
};

const seedTables = async () => {
    try {
        // seed schools
        const seedSchools = `
            INSERT INTO schools (school_name, address, contact_email, contact_phone, created_at, updated_at)
            VALUES ('Horizon Ridge Academy', '456 Horizon Lane, Rivertown, AC 12345', 'contact@horizonridge.edu', '(555) 000-1234', NOW(), NOW())
            RETURNING school_id
        `;
        const schoolResult = await pool.query(seedSchools);
        const schoolId = schoolResult.rows[0].school_id;
        console.log(`Schools seeded successfully with school_id: ${schoolId}`);

        // seed administrators
        const seedAdministrator = `
            INSERT INTO administrators (first_name, last_name, email, password, phone_number, role, school_id, created_at, updated_at)
            VALUES ('Laura', 'Adams', 'laura.adams@horizonridge.edu', 'password', '(555) 000-5678', 'Principal', '${schoolId}', NOW(), NOW())
            RETURNING admin_id
        `;
        const adminResult = await pool.query(seedAdministrator);
        const adminId = adminResult.rows[0].admin_id;
        console.log(`Administrators seeded successfully with admin_id: ${adminId}`);

        // seed educators
        const seedEducator = `
            INSERT INTO educators (first_name, last_name, email, password, phone_number, department, title, school_id, created_at, updated_at)
            VALUES ('James', 'Miller', 'james.miller@horizonridge.edu', 'password', '(555) 000-9876', 'Mathematics', 'Algebra Teacher', '${schoolId}', NOW(), NOW())
            RETURNING educator_id
        `
        const educatorResult = await pool.query(seedEducator);
        const educatorId = educatorResult.rows[0].educator_id;
        console.log(`Educators seeded successfully with educator_id: ${educatorId}`);

        // seed students
        const seedStudent = `
            INSERT INTO students (first_name, last_name, email, password, phone_number, enrollment_date, graduation_date, school_id, created_at, updated_at)
            VALUES ('Alex', 'Thompson', 'alex.thompson@student.horizonridge.edu', 'password', '(555) 000-1122', '2023-09-01', NULL, '${schoolId}', NOW(), NOW())
            RETURNING student_id
        `
        const studentResult = await pool.query(seedStudent);
        const studentId = studentResult.rows[0].student_id;
        console.log(`Students seeded successfully with student_id: ${studentId}`);

        // seed courses
        const seedCourse = `
            INSERT INTO courses (course_name, description, credits, school_id, educator_id, created_at, updated_at)
            VALUES ('Introduction to Algebra', 'A beginners course covering fundamental algebraic principles including variables, equations, and functions.', '3', '${schoolId}', '${educatorId}', NOW(), NOW())
            RETURNING course_id
        `
        const courseResult = await pool.query(seedCourse);
        const courseId = courseResult.rows[0].course_id;
        console.log(`Courses seeded successfully with course_id: ${courseId}`);

        // seed enrollments
        const seedEnrollment = `
            INSERT INTO enrollments (student_id, course_id, enrollment_date, grade, created_at, updated_at)
            VALUES ('${studentId}', '${courseId}', '2023-09-01', '', NOW(), NOW())
        `
        await executeQuery(seedEnrollment, 'Enrollments seeded successfully');

        // seed assignments
        const seedAssignment = `
            INSERT INTO assignments (course_id, title, description, due_date, max_points, created_at, updated_at)
            VALUES ('${courseId}', 'Algebraic Equations', 'Solve the following algebraic equations.', '2023-09-15', '100', NOW(), NOW())
            RETURNING assignment_id
        `
        const assignmentResult = await pool.query(seedAssignment);
        const assignmentId = assignmentResult.rows[0].assignment_id;
        console.log(`Assignments seeded successfully with assignment_id: ${assignmentId}`);

        // seed submissions
        const seedSubmission = `
            INSERT INTO submissions (assignment_id, student_id, submission_date, grade, created_at, updated_at)
            VALUES ('${assignmentId}', '${studentId}', '2023-09-14', '95', NOW(), NOW())
        `
        await executeQuery(seedSubmission, 'Submissions seeded successfully');

        // seed discussions
        const seedDiscussion = `
            INSERT INTO discussions (course_id, author_id, title, content, created_at, updated_at)
            VALUES ('${courseId}', '${educatorId}', 'Algebra and Real-Life Problems', 'How do you think algebra is used in real-life scenarios? Share your examples.', NOW(), NOW())
            RETURNING discussion_id
        `
        const discussionResult = await pool.query(seedDiscussion);
        const discussionId = discussionResult.rows[0].discussion_id;

        // seed comments
        const seedComment = `
            INSERT INTO comments (discussion_id, author_id, content, created_at, updated_at)
            VALUES ('${discussionId}', '${studentId}', 'I think algebra is used in calculating the cost of groceries.', NOW(), NOW())
        `
        await executeQuery(seedComment, 'Comments seeded successfully');
    } catch (error) {
        console.error('Error seeding tables:', error.message);
    }
};

const reset = async () => {
    await resetTables();
    await createTables();
    await seedTables();
};

reset();