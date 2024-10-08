import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import "../../css/studentsStyles/studentsHomeStyles.css";

export default function StudentHome() {
    const studentId = localStorage.getItem('userId');
    const [student, setStudent] = useState([]);
    const [studentEnrollments, setStudentEnrollments] = useState([]);
    const [studentClasses, setStudentClasses] = useState([]);

    useEffect(() => {
        async function fetchStudentInformation() {
            try {
                const studentResults = await fetch(`/api/students/${studentId}`);
                const studentInfo = await studentResults.json();
                console.log(studentInfo);

                const courseId = studentInfo.enrollmentsRows[0].course_id;

                const studentClassesRes = await fetch(`/api/courses/${courseId}`);
                const studentClassesInfo = await studentClassesRes.json();
                console.log(studentClassesInfo);

                setStudentClasses(studentClassesInfo);

                setStudent(studentInfo.studentRows);
                setStudentEnrollments(studentInfo.enrollmentsRows);

                if (studentInfo.studentRows.length > 0) {
                    const firstName = studentInfo.studentRows[0].first_name;
                    document.getElementById('main-section-title').textContent = `Welcome, ${firstName}!`;
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchStudentInformation();
    }, [studentId]);

    return (
        <div className="home">
            <PageTitle title="Student | UniGo" />
            <section id="main-section">
                <h2 id="main-section-title"></h2>
                <p id="main-section-description">Here's an overview of your student information and classes:</p>
            </section>

            {student.length > 0 && (
                <section id="student-info">
                    <h2>Student Information</h2>
                    <p><strong>Name:</strong> {student[0].first_name} {student[0].last_name}</p>
                    <p><strong>Student ID:</strong> {student[0].general_student_id}</p>
                    <p><strong>Email:</strong> {student[0].email}</p>
                    <p><strong>Phone:</strong> {student[0].phone_number}</p>
                    <p><strong>Enrollment Date:</strong> {new Date(student[0].enrollment_date).toLocaleDateString()}</p>
                    <p><strong>Credits:</strong> {student[0].current_credits}</p>
                    <p><strong>Classification:</strong>
                        {
                            student[0].current_credits <= 30 ? " Freshman" :
                            student[0].current_credits <= 60 ? " Sophomore" :
                            student[0].current_credits <= 90 ? " Junior" : " Senior"
                        }
                    </p>
                </section>
            )}

            <section className="info-section">
                <h2>All Classes</h2>
                {/* need to set this up to work with the corresponding student's classes */}
                {studentEnrollments.length > 0 ? (
                    <ul className="info-list">
                        {studentEnrollments.map((enrollment, index) => (
                            <li key={index}>
                                <strong>Course ID:</strong> {enrollment.course_id}<br />
                                <strong>Enrollment Date:</strong> {new Date(enrollment.enrollment_date).toLocaleDateString()}<br />
                                <strong>Grade:</strong> {enrollment.grade || "N/A"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No classes yet! Enroll in a class to get started!</p>
                )}
            </section>

            <section className="info-section">
                <h2>Upcoming Assignments</h2>
                <ul className="info-list">
                    <li className="default-li">Nothing yet! You're in the clear!</li>
                </ul>
            </section>
        </div>
    );
}