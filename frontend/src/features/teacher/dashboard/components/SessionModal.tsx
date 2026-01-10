import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomSelect } from "../../../../components/CustomSelect";
import type {
  Session,
  CreateSessionDto,
  UpdateSessionDto,
} from "../../types/session.types";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateSessionDto | UpdateSessionDto) => void;
  session?: Session;
  availableClasses: { id: string; name: string }[];
  availableSubjects: { id: string; name: string }[];
}

export const SessionModal = ({
  isOpen,
  onClose,
  onSave,
  session,
  availableClasses,
  availableSubjects,
}: SessionModalProps) => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    classId: "",
    subjectId: "",
  });

  useEffect(() => {
    if (session) {
      const sessionDate = new Date(session.date);
      const dateStr = sessionDate.toISOString().split("T")[0];

      setFormData({
        date: dateStr,
        startTime: session.startTime,
        endTime: session.endTime,
        room: session.room,
        classId: session.class?.id || session.classId,
        subjectId: session.subject?.id || session.subjectId,
      });
    } else {
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        classId: "",
        subjectId: "",
      });
    }
  }, [session, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sessionData = {
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      room: formData.room,
      classId: formData.classId,
      subjectId: formData.subjectId,
    };

    onSave(sessionData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">
            {session ? "Edit Session" : "Add New Session"}
          </h3>
          <button onClick={onClose} className="modal-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <CustomSelect
                  label="Class"
                  value={formData.classId}
                  onChange={(val) => setFormData({ ...formData, classId: val })}
                  options={availableClasses.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  placeholder="Select..."
                />
              </div>
              <div className="form-group">
                <CustomSelect
                  label="Subject"
                  value={formData.subjectId}
                  onChange={(val) =>
                    setFormData({ ...formData, subjectId: val })
                  }
                  options={availableSubjects.map((s) => ({
                    value: s.id,
                    label: s.name,
                  }))}
                  placeholder="Select..."
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Room</label>
              <input
                type="text"
                required
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                className="form-input"
                placeholder="e.g. Room 101"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {session ? "Save Changes" : "Add Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
