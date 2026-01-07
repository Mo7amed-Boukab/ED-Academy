import { useState } from "react";
import { Check, X, Clock, Search } from "lucide-react";
import { CustomSelect } from "../../../../components/CustomSelect";

// Types
interface Student {
  id: number;
  name: string;
  status: "PRESENT" | "ABSENT" | "LATE";
  justification: "justified" | "not_justified" | null;
}

interface Session {
  id: number;
  time: string;
  subject: string;
  class: string;
  level: string;
  students: Student[];
}

// Mock Data - Sessions with attendance records (Teacher's sessions only)
const MOCK_SESSIONS: Session[] = [
  {
    id: 1,
    time: "08:00 – 10:00",
    subject: "Mathématiques",
    class: "Terminale S1",
    level: "Terminal",
    students: [
      { id: 1, name: "Alice Martin", status: "PRESENT", justification: null },
      { id: 2, name: "Bob Colin", status: "PRESENT", justification: null },
      {
        id: 3,
        name: "Charlie Durand",
        status: "ABSENT",
        justification: "not_justified",
      },
    ],
  },
  {
    id: 2,
    time: "10:15 – 12:00",
    subject: "Mathématiques",
    class: "1ère S2",
    level: "1ère",
    students: [
      { id: 4, name: "Diane Lo", status: "LATE", justification: "justified" },
      { id: 5, name: "Eve Peron", status: "PRESENT", justification: null },
      { id: 6, name: "Fabien Roux", status: "PRESENT", justification: null },
    ],
  },
  {
    id: 3,
    time: "14:00 – 15:30",
    subject: "Spécialité Maths",
    class: "Terminale S2",
    level: "Terminal",
    students: [
      {
        id: 7,
        name: "Georges Blanc",
        status: "ABSENT",
        justification: "justified",
      },
      { id: 8, name: "Hélène Petit", status: "PRESENT", justification: null },
      { id: 9, name: "Ivan Dubois", status: "PRESENT", justification: null },
    ],
  },
  {
    id: 4,
    time: "15:45 – 17:30",
    subject: "Mathématiques",
    class: "2nde 3",
    level: "2nde",
    students: [
      { id: 10, name: "Julie Martin", status: "PRESENT", justification: null },
      {
        id: 11,
        name: "Kevin Durand",
        status: "LATE",
        justification: "not_justified",
      },
      { id: 12, name: "Léa Bernard", status: "PRESENT", justification: null },
    ],
  },
];

// Extract unique values for filters
const CLASSES = [...new Set(MOCK_SESSIONS.map((s) => s.class))];
const SUBJECTS = [...new Set(MOCK_SESSIONS.map((s) => s.subject))];
const STATUSES = ["All", "PRESENT", "ABSENT", "LATE"];

export const TeacherAttendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sessions, setSessions] = useState(MOCK_SESSIONS);

  // Update student status
  const updateStudentStatus = (
    sessionId: number,
    studentId: number,
    status: "PRESENT" | "ABSENT" | "LATE"
  ) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            students: session.students.map((student) =>
              student.id === studentId
                ? {
                    ...student,
                    status,
                    // Reset justification when status changes to PRESENT
                    justification:
                      status === "PRESENT" ? null : student.justification,
                  }
                : student
            ),
          };
        }
        return session;
      })
    );
  };

  // Update justification
  const updateJustification = (
    sessionId: number,
    studentId: number,
    justification: "justified" | "not_justified"
  ) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            students: session.students.map((student) =>
              student.id === studentId ? { ...student, justification } : student
            ),
          };
        }
        return session;
      })
    );
    // TODO: API call to save justification
    // await api.updateAttendance(sessionId, studentId, { justification });
  };

  // Filter sessions and students
  const filteredSessions = sessions
    .filter((session) => {
      if (classFilter && session.class !== classFilter) return false;
      if (subjectFilter && session.subject !== subjectFilter) return false;
      return true;
    })
    .map((session) => ({
      ...session,
      students: session.students.filter((student) => {
        if (
          searchQuery &&
          !student.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;
        if (
          statusFilter &&
          statusFilter !== "All" &&
          student.status !== statusFilter
        )
          return false;
        return true;
      }),
    }))
    .filter((session) => session.students.length > 0);

  // Count totals
  const totalPresent = filteredSessions.reduce(
    (acc, s) => acc + s.students.filter((st) => st.status === "PRESENT").length,
    0
  );
  const totalAbsent = filteredSessions.reduce(
    (acc, s) => acc + s.students.filter((st) => st.status === "ABSENT").length,
    0
  );
  const totalLate = filteredSessions.reduce(
    (acc, s) => acc + s.students.filter((st) => st.status === "LATE").length,
    0
  );

  return (
    <div className="animate-fadeIn">
      <div className="page-container">
        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="filters-bar-left">
            {/* Search */}
            <div className="search-input-wrapper w-full-mobile">
              <Search size={16} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Class Filter */}
            <div className="w-full-mobile">
              <CustomSelect
                value={classFilter}
                onChange={setClassFilter}
                options={[
                  { value: "", label: "All Classes" },
                  ...CLASSES.map((c) => ({ value: c, label: c })),
                ]}
                placeholder="All Classes"
              />
            </div>

            {/* Subject Filter */}
            <div className="w-full-mobile hide-mobile">
              <CustomSelect
                value={subjectFilter}
                onChange={setSubjectFilter}
                options={[
                  { value: "", label: "All Subjects" },
                  ...SUBJECTS.map((s) => ({ value: s, label: s })),
                ]}
                placeholder="All Subjects"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full-mobile hide-mobile">
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={STATUSES.map((s) => ({
                  value: s === "All" ? "" : s,
                  label: s,
                }))}
                placeholder="All Statuses"
              />
            </div>
          </div>

          {/* Summary Stats - Right Side */}
          <div className="filters-bar-actions">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--success)]"></span>
                <span className="text-sm text-[var(--text-secondary)]">
                  Present:{" "}
                  <strong className="text-[var(--text-primary)]">
                    {totalPresent}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--danger)]"></span>
                <span className="text-sm text-[var(--text-secondary)]">
                  Absent:{" "}
                  <strong className="text-[var(--text-primary)]">
                    {totalAbsent}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--warning)]"></span>
                <span className="text-sm text-[var(--text-secondary)]">
                  Late:{" "}
                  <strong className="text-[var(--text-primary)]">
                    {totalLate}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="card">
          <div className="table-responsive-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: "110px" }}>Time</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th className="hide-mobile">Level</th>
                  <th className="hide-tablet">Subject</th>
                  <th className="text-center" style={{ minWidth: "160px" }}>
                    Status
                  </th>
                  <th className="text-center" style={{ minWidth: "140px" }}>
                    Justification
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-[var(--text-muted)]"
                    >
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) =>
                    session.students.map((student, studentIndex) => (
                      <tr key={`${session.id}-${student.id}`}>
                        {/* Session Time - Only show for first student of each session */}
                        {studentIndex === 0 ? (
                          <td
                            rowSpan={session.students.length}
                            data-label="Time"
                            className="font-medium text-[var(--text-primary)] bg-[var(--bg-light)] align-top no-label"
                          >
                            {session.time}
                          </td>
                        ) : null}

                        {/* Student Name */}
                        <td data-label="Student">
                          <span className="font-medium text-[var(--text-primary)]">
                            {student.name}
                          </span>
                        </td>

                        {/* Class */}
                        <td
                          data-label="Class"
                          className="text-[var(--text-secondary)]"
                        >
                          {session.class}
                        </td>

                        {/* Level */}
                        <td data-label="Level" className="hide-mobile">
                          <span className="px-2 py-1 bg-[var(--bg-main)] text-[var(--text-secondary)] text-xs font-medium">
                            {session.level}
                          </span>
                        </td>

                        {/* Subject */}
                        <td
                          data-label="Subject"
                          className="text-[var(--text-secondary)] hide-tablet"
                        >
                          {session.subject}
                        </td>

                        {/* Status Buttons */}
                        <td data-label="Status" className="no-label">
                          <div className="attendance-status-btns justify-center">
                            <button
                              onClick={() =>
                                updateStudentStatus(
                                  session.id,
                                  student.id,
                                  "PRESENT"
                                )
                              }
                              className={`status-btn ${
                                student.status === "PRESENT"
                                  ? "present"
                                  : "inactive"
                              }`}
                            >
                              <Check size={12} />P
                            </button>
                            <button
                              onClick={() =>
                                updateStudentStatus(
                                  session.id,
                                  student.id,
                                  "ABSENT"
                                )
                              }
                              className={`status-btn ${
                                student.status === "ABSENT"
                                  ? "absent"
                                  : "inactive"
                              }`}
                            >
                              <X size={12} />A
                            </button>
                            <button
                              onClick={() =>
                                updateStudentStatus(
                                  session.id,
                                  student.id,
                                  "LATE"
                                )
                              }
                              className={`status-btn ${
                                student.status === "LATE" ? "late" : "inactive"
                              }`}
                            >
                              <Clock size={12} />L
                            </button>
                          </div>
                        </td>

                        {/* Justification Column */}
                        <td data-label="Justification" className="text-center">
                          {student.status === "PRESENT" ? (
                            <span className="text-[var(--text-muted)] text-sm">
                              —
                            </span>
                          ) : (
                            <div
                              style={{ minWidth: "120px" }}
                              className={`justification-select ${
                                student.justification === "justified"
                                  ? "justified"
                                  : student.justification === "not_justified"
                                  ? "not-justified"
                                  : ""
                              }`}
                            >
                              <CustomSelect
                                value={student.justification || ""}
                                onChange={(value) =>
                                  updateJustification(
                                    session.id,
                                    student.id,
                                    value as "justified" | "not_justified"
                                  )
                                }
                                options={[
                                  { value: "justified", label: "Justified" },
                                  {
                                    value: "not_justified",
                                    label: "Not Justified",
                                  },
                                ]}
                                placeholder="Select..."
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
