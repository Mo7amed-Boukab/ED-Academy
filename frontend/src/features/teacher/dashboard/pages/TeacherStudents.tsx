import { useState } from "react";
import { SearchInput } from "../../../../components/SearchInput";
import { CustomSelect } from "../../../../components/CustomSelect";
import { GraduationCap } from "lucide-react";

export const TeacherStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  // Mock data
  const allStudents = [
    {
      id: 1,
      fullName: "Alice Martin",
      class: { name: "Terminale S1" },
      email: "alice.m@school.com",
      absenceCount: 2,
    },
    {
      id: 2,
      fullName: "Bob Colin",
      class: { name: "Terminale S1" },
      email: "bob.c@school.com",
      absenceCount: 5,
    },
    {
      id: 3,
      fullName: "Charlie Durand",
      class: { name: "1ère S2" },
      email: "charlie.d@school.com",
      absenceCount: 1,
    },
    {
      id: 4,
      fullName: "Diane Lo",
      class: { name: "2nde 3" },
      email: "diane.l@school.com",
      absenceCount: 3,
    },
    {
      id: 5,
      fullName: "Eve Peron",
      class: { name: "Terminale S1" },
      email: "eve.p@school.com",
      absenceCount: 4,
    },
  ];

  // Filter logic
  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      classFilter === "All" || student.class?.name === classFilter;
    return matchesSearch && matchesClass;
  });

  // Get unique classes for filter
  const classes = Array.from(
    new Set(allStudents.map((s) => s.class?.name).filter(Boolean))
  );

  return (
    <div className="animate-fadeIn">
      <div className="page-container">
        {/* Actions Bar */}
        <div className="filters-bar">
          <div className="filters-bar-left">
            <div className="w-full-mobile">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
              />
            </div>
            <div className="w-full-mobile">
              <CustomSelect
                value={classFilter}
                onChange={setClassFilter}
                options={["All", ...classes]}
                placeholder="Class"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-responsive-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Absences</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#c41e3a]/10 text-[#c41e3a] flex items-center justify-center text-sm font-semibold">
                            {student.fullName.charAt(0)}
                          </div>
                          <div className="font-medium text-gray-900">
                            {student.fullName}
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-600">{student.email}</td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-gray-400" />
                          <span className="text-gray-700 font-medium">
                            {student.class?.name || "-"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            student.absenceCount > 3
                              ? "bg-red-100 text-[#c41e3a]"
                              : student.absenceCount > 0
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {student.absenceCount} absence
                          {student.absenceCount > 1 ? "s" : ""}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {filteredStudents.length > 0 && (
          <div className="table-footer">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredStudents.length}</span>{" "}
              student(s)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
