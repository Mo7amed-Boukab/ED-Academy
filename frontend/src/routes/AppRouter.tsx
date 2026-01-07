import { AdminOverview } from '../features/admin/dashboard/pages/DashboardOverview';
import { TeachersManagement } from '../features/admin/dashboard/pages/TeachersManagement';
import { StudentsManagement } from '../features/admin/dashboard/pages/StudentsManagement';
import { ClassesManagement } from '../features/admin/dashboard/pages/ClassesManagement';
import { SubjectsManagement } from '../features/admin/dashboard/pages/SubjectsManagement';
import { GlobalAttendance } from '../features/admin/dashboard/pages/GlobalAttendance';

// Teacher Pages
import { TeacherDashboard } from '../features/teacher/dashboard/pages/TeacherDashboard';
import { MyClasses } from '../features/teacher/dashboard/pages/MyClasses';
import { TeacherSessions } from '../features/teacher/dashboard/pages/TeacherSessions';
import { TeacherSubjects } from '../features/teacher/dashboard/pages/TeacherSubjects';
import { TeacherStudents } from '../features/teacher/dashboard/pages/TeacherStudents';
import { TeacherAttendance } from '../features/teacher/dashboard/pages/TeacherAttendance';

// Student Pages
import { StudentOverview } from '../features/student/dashboard/pages/StudentDashboard';
import { StudentSchedule } from '../features/student/dashboard/pages/StudentSchedule';
import { StudentAttendance } from '../features/student/dashboard/pages/StudentAttendance';

import { LoginPage } from '../features/auth/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const AppRouter = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Admin Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/admin" element={<AdminOverview />} />
                            <Route path="/admin/teachers" element={<TeachersManagement />} />
                            <Route path="/admin/students" element={<StudentsManagement />} />
                            <Route path="/admin/classes" element={<ClassesManagement />} />
                            <Route path="/admin/subjects" element={<SubjectsManagement />} />
                            <Route path="/admin/attendance" element={<GlobalAttendance />} />
                            {/* Fallback */}
                            <Route path="/admin/users" element={<Navigate to="/admin/students" replace />} />
                        </Route>
                    </Route>

                    {/* Teacher Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/teacher" element={<TeacherDashboard />} />
                            <Route path="/teacher/classes" element={<MyClasses />} />
                            <Route path="/teacher/sessions" element={<TeacherSessions />} />
                            <Route path="/teacher/subjects" element={<TeacherSubjects />} />
                            <Route path="/teacher/students" element={<TeacherStudents />} />
                            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
                            {/* Fallback */}
                            <Route path="/teacher/schedule" element={<Navigate to="/teacher/sessions" replace />} />
                        </Route>
                    </Route>

                    {/* Student Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/student" element={<StudentOverview />} />
                            <Route path="/student/schedule" element={<StudentSchedule />} />
                            <Route path="/student/attendance" element={<StudentAttendance />} />
                        </Route>
                    </Route>

                    {/* Default Redirect: To Login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};
