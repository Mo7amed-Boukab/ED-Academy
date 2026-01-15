import { useState, useEffect } from "react";
import { Check, X, Clock, Search, Loader2 } from "lucide-react";
import { CustomSelect } from "../../../../components/CustomSelect";
import {
  attendanceService,
  type AttendanceSession,
} from "../../services/attendanceService";
import { useToast } from "../../../../hooks/useToast";

// Use types from service but we can extend or alias if needed for local state
type Session = AttendanceSession;

export const TeacherAttendance = () => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all history (no date filter) to show previous days and today's sessions
      const data = await attendanceService.getTeacherAttendance();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update student status
  const updateStudentStatus = async (
    sessionId: string,
    studentId: string,
    status: "PRESENT" | "ABSENT" | "LATE"
  ) => {
    try {
      // Call API
      await attendanceService.markAttendance(sessionId, [
        { studentId, status },
      ]);

      // Refresh data to get the new attendanceId and ensure sync
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Update justification
  const updateJustification = async (
    sessionId: string,
    studentId: string,
    attendanceId: string,
    justification: "justified" | "not_justified"
  ) => {
    try {
      setProcessingId(attendanceId);

      // Optimistic update
      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === sessionId) {
            return {
              ...session,
              students: session.students.map((student) =>
                student.id === studentId
                  ? { ...student, justification }
                  : student
              ),
            };
          }
          return session;
        })
      );

      // API call to save justification
      // We need mapping to uppercase for backend if service doesn't handle it
      // The service expects "JUSTIFIED" | "NOT_JUSTIFIED"
      const backendJustification =
        justification === "justified" ? "JUSTIFIED" : "NOT_JUSTIFIED";

      await attendanceService.updateJustification(
        attendanceId,
        backendJustification
      );
    } catch (error) {
      console.error("Error updating justification:", error);
      toast.error("Failed to update justification");
      fetchData();
    } finally {
      setProcessingId(null);
    }
  };

  // Extract unique values for filters
  const classes = [...new Set(sessions.map((s) => s.class))];
  const subjects = [...new Set(sessions.map((s) => s.subject))];
  const statuses = ["All", "PRESENT", "ABSENT", "LATE"];

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
      </div>
    );
  }

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
                  ...classes.map((c) => ({ value: c, label: c })),
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
                  ...subjects.map((s) => ({ value: s, label: s })),
                ]}
                placeholder="All Subjects"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full-mobile hide-mobile">
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statuses.map((s) => ({
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
                  <th style={{ width: "120px" }}>Time</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th className="hide-mobile">Level</th>
                  <th className="hide-tablet">Subject</th>
                  <th className="pl-4" style={{ minWidth: "160px" }}>
                    Status
                  </th>
                  <th className="pl-4" style={{ minWidth: "130px" }}>
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
                        <td data-label="Status" className="no-label pl-4">
                          <div className="attendance-status-btns">
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
                        <td data-label="Justification" className="pl-4">
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
                                onChange={(value) => {
                                  if (student.attendanceId) {
                                    updateJustification(
                                      session.id,
                                      student.id,
                                      student.attendanceId,
                                      value as "justified" | "not_justified"
                                    );
                                  }
                                }}
                                options={[
                                  { value: "justified", label: "Justified" },
                                  {
                                    value: "not_justified",
                                    label: "Not Justified",
                                  },
                                ]}
                                placeholder="Select..."
                                disabled={processingId === student.attendanceId}
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
