import { useState } from "react";
import { SearchInput } from "../../../../components/SearchInput";
import { CustomSelect } from "../../../../components/CustomSelect";
import { ActionMenu } from "../../../../components/ActionMenu";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
} from "lucide-react";
import { SessionModal } from "../components/SessionModal";
import { DeleteConfirmationModal } from "../../../../components/DeleteConfirmationModal";

export const TeacherSessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  // Mock data
  const allSessions = [
    {
      id: "1",
      date: "2024-01-15T08:00:00",
      class: { id: "c1", name: "Terminale S1" },
      subject: { id: "s1", name: "Mathématiques" },
      startTime: "08:00",
      endTime: "10:00",
      room: "Salle 101",
    },
    {
      id: "2",
      date: "2024-01-15T14:00:00",
      class: { id: "c2", name: "1ère S2" },
      subject: { id: "s2", name: "Mathématiques" },
      startTime: "14:00",
      endTime: "15:30",
      room: "Salle 204",
    },
    {
      id: "3",
      date: "2024-01-16T10:00:00",
      class: { id: "c3", name: "2nde 3" },
      subject: { id: "s3", name: "Mathématiques" },
      startTime: "10:00",
      endTime: "12:00",
      room: "Salle 305",
    },
    {
      id: "4",
      date: "2024-01-18T08:00:00",
      class: { id: "c4", name: "Terminale S2" },
      subject: { id: "s4", name: "Spécialité Maths" },
      startTime: "08:00",
      endTime: "10:00",
      room: "Lab 1",
    },
  ];

  const availableClasses = [
    { id: "c1", name: "Terminale S1" },
    { id: "c2", name: "1ère S2" },
    { id: "c3", name: "2nde 3" },
    { id: "c4", name: "Terminale S2" },
  ];

  const availableSubjects = [
    { id: "s1", name: "Mathématiques" },
    { id: "s2", name: "Spécialité Maths" },
  ];

  // Filter logic
  const filteredSessions = allSessions.filter((session) => {
    const matchesSearch =
      session.subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.class.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      classFilter === "All" || session.class.name === classFilter;
    return matchesSearch && matchesClass;
  });

  const classes = Array.from(new Set(allSessions.map((s) => s.class.name)));

  const handleEdit = (session: any) => {
    setSelectedSession(session);
    setIsSessionModalOpen(true);
  };

  const handleDelete = (session: any) => {
    setSelectedSession(session);
    setIsDeleteModalOpen(true);
  };

  const handleAddSession = () => {
    setSelectedSession(null);
    setIsSessionModalOpen(true);
  };

  const handleSaveSession = (data: any) => {
    console.log("Saving session:", data);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting session:", selectedSession);
    setIsDeleteModalOpen(false);
    setSelectedSession(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="animate-fadeIn">
      <div className="page-container">
        {/* Filters and Actions */}
        <div className="filters-bar">
          <div className="filters-bar-left">
            <div className="w-full-mobile">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sessions..."
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
              onClick={handleAddSession}
              className="btn btn-primary flex items-center justify-center gap-2 w-full-mobile"
            >
              <Plus size={18} />
              <span>Add Session</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="table-responsive-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Class</th>
                  <th className="hide-mobile">Subject</th>
                  <th className="hide-mobile">Time</th>
                  <th className="hide-tablet">Room</th>
                  <th className="text-center hide-mobile">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No sessions found
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => (
                    <tr key={session.id}>
                      {/* Mobile Action Menu */}
                      <ActionMenu
                        actions={[
                          {
                            label: "Edit",
                            icon: <Edit2 size={16} />,
                            onClick: () => handleEdit(session),
                          },
                          {
                            label: "Delete",
                            icon: <Trash2 size={16} />,
                            onClick: () => handleDelete(session),
                            variant: "danger",
                          },
                        ]}
                      />

                      <td data-label="Date" className="no-label">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="capitalize">
                            {formatDate(session.date)}
                          </span>
                        </div>
                      </td>
                      <td data-label="Class">
                        <span className="status-badge bg-[#c41e3a]/10 text-[#c41e3a]">
                          {session.class.name}
                        </span>
                      </td>
                      <td data-label="Subject" className="hide-mobile">
                        <div className="flex items-center gap-2 text-gray-700">
                          <BookOpen size={14} className="text-gray-400" />
                          {session.subject.name}
                        </div>
                      </td>
                      <td data-label="Time" className="hide-mobile">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={14} className="text-gray-400" />
                          {session.startTime} – {session.endTime}
                        </div>
                      </td>
                      <td data-label="Room" className="hide-tablet">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={14} className="text-gray-400" />
                          {session.room}
                        </div>
                      </td>
                      <td className="text-center no-label hide-mobile">
                        <div className="action-btns-desktop flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(session)}
                            className="action-btn edit"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(session)}
                            className="action-btn delete"
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
        {filteredSessions.length > 0 && (
          <div className="table-footer">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredSessions.length}</span>{" "}
              session(s)
            </span>
          </div>
        )}
      </div>

      {/* Modals */}
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onSave={handleSaveSession}
        session={selectedSession}
        availableClasses={availableClasses}
        availableSubjects={availableSubjects}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={
          selectedSession
            ? `${selectedSession.class.name} - ${selectedSession.subject.name}`
            : ""
        }
        itemType="session"
      />
    </div>
  );
};
