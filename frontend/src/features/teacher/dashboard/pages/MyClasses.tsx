import { useState } from "react";
import { SearchInput } from "../../../../components/SearchInput";
import { CustomSelect } from "../../../../components/CustomSelect";
import { Users, GraduationCap } from "lucide-react";

export const MyClasses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  // Mock data matching the structure needed for the table
  const allClasses = [
    {
      id: 1,
      name: "Terminale S1",
      level: "Terminale",
      studentCount: 32,
      subject: "Mathématiques",
      academicYear: "2023-2024",
    },
    {
      id: 2,
      name: "1ère S2",
      level: "1ère",
      studentCount: 28,
      subject: "Mathématiques",
      academicYear: "2023-2024",
    },
    {
      id: 3,
      name: "2nde 3",
      level: "Seconde",
      studentCount: 35,
      subject: "Mathématiques",
      academicYear: "2023-2024",
    },
    {
      id: 4,
      name: "Terminale S2",
      level: "Terminale",
      studentCount: 30,
      subject: "Spécialité Maths",
      academicYear: "2023-2024",
    },
  ];

  // Filter logic
  const filteredClasses = allClasses.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "All" || cls.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Get unique levels for filter
  const levels = Array.from(new Set(allClasses.map((c) => c.level)));

  return (
    <div className="animate-fadeIn">
      <div className="page-container">
        {/* Search and Filter Bar */}
        <div className="filters-bar">
          <div className="filters-bar-left">
            <div className="w-full-mobile">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes..."
              />
            </div>
            <div className="w-full-mobile">
              <CustomSelect
                value={levelFilter}
                onChange={setLevelFilter}
                options={["All", ...levels]}
                placeholder="Level"
              />
            </div>
          </div>
        </div>

        {/* Table Layout */}
        <div className="card">
          <div className="table-responsive-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th className="hide-mobile">Level</th>
                  <th className="hide-mobile">Subject</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No classes found
                    </td>
                  </tr>
                ) : (
                  filteredClasses.map((cls) => (
                    <tr key={cls.id}>
                      <td data-label="Class" className="no-label">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#c41e3a]/10 text-[#c41e3a] flex items-center justify-center flex-shrink-0">
                            <GraduationCap size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 truncate">
                              {cls.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {cls.academicYear}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td data-label="Level" className="hide-mobile">
                        <span className="status-badge bg-gray-100 text-gray-700">
                          {cls.level}
                        </span>
                      </td>
                      <td
                        data-label="Subject"
                        className="text-gray-600 hide-mobile truncate"
                      >
                        {cls.subject}
                      </td>
                      <td data-label="Students">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users
                            size={14}
                            className="text-gray-400 flex-shrink-0"
                          />
                          {cls.studentCount}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {filteredClasses.length > 0 && (
          <div className="table-footer">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredClasses.length}</span>{" "}
              class(es)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
