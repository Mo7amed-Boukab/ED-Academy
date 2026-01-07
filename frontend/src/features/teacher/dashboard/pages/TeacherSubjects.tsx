import { useState } from "react";
import { SearchInput } from "../../../../components/SearchInput";
import { CustomSelect } from "../../../../components/CustomSelect";
import { BookOpen, Layers, Edit2, Trash2, Plus } from "lucide-react";
import { SubjectModal } from "../components/SubjectModal";
import { DeleteConfirmationModal } from "../../../../components/DeleteConfirmationModal";

export const TeacherSubjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  // Mock data
  const allSubjects = [
    {
      id: "1",
      name: "Mathématiques",
      class: { id: "c1", name: "Terminale S1" },
    },
    { id: "2", name: "Mathématiques", class: { id: "c2", name: "1ère S2" } },
    {
      id: "3",
      name: "Spécialité Maths",
      class: { id: "c3", name: "Terminale S2" },
    },
    { id: "4", name: "Mathématiques", class: { id: "c4", name: "2nde 3" } },
  ];

  const availableClasses = [
    { id: "c1", name: "Terminale S1" },
    { id: "c2", name: "1ère S2" },
    { id: "c3", name: "Terminale S2" },
    { id: "c4", name: "2nde 3" },
  ];

  // Filter logic
  const filteredSubjects = allSubjects.filter((subject) => {
    const matchesSearch = subject.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass =
      classFilter === "All" || subject.class?.name === classFilter;
    return matchesSearch && matchesClass;
  });

  const classes = Array.from(
    new Set(allSubjects.map((s) => s.class?.name).filter(Boolean))
  );

  const handleEdit = (subject: any) => {
    setSelectedSubject(subject);
    setIsSubjectModalOpen(true);
  };

  const handleDelete = (subject: any) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubject = () => {
    setSelectedSubject(null);
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = (data: any) => {
    console.log("Saving subject:", data);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting subject:", selectedSubject);
    setIsDeleteModalOpen(false);
    setSelectedSubject(null);
  };

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
                placeholder="Search subjects..."
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

          <div className="filters-bar-actions">
            <button
              onClick={handleAddSubject}
              className="btn btn-primary flex items-center justify-center gap-2 w-full-mobile"
            >
              <Plus size={18} />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div className="table-responsive-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Class</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      No subjects found
                    </td>
                  </tr>
                ) : (
                  filteredSubjects.map((subject) => (
                    <tr key={subject.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#c41e3a]/10 text-[#c41e3a] flex items-center justify-center">
                            <BookOpen size={16} />
                          </div>
                          <div className="font-medium text-gray-900">
                            {subject.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Layers size={14} className="text-gray-400" />
                          {subject.class?.name || "-"}
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(subject)}
                            className="action-btn"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(subject)}
                            className="action-btn text-red-500 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
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
        {filteredSubjects.length > 0 && (
          <div className="table-footer">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredSubjects.length}</span>{" "}
              subject(s)
            </span>
          </div>
        )}
      </div>

      {/* Modals */}
      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onSave={handleSaveSubject}
        subject={selectedSubject}
        availableClasses={availableClasses}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedSubject?.name}
        itemType="subject"
      />
    </div>
  );
};
