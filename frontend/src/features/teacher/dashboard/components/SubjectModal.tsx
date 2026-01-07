import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomSelect } from "../../../../components/CustomSelect";

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  subject?: any;
  availableClasses: { id: string; name: string }[];
}

export const SubjectModal = ({
  isOpen,
  onClose,
  onSave,
  subject,
  availableClasses,
}: SubjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || "",
        classId: subject.class?.id || "",
      });
    } else {
      setFormData({
        name: "",
        classId: "",
      });
    }
  }, [subject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: "480px" }}>
        <div className="modal-header">
          <h3 className="modal-title">
            {subject ? "Edit Subject" : "Add New Subject"}
          </h3>
          <button onClick={onClose} className="modal-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="form-input"
                placeholder="e.g. Mathematics"
              />
            </div>

            <div className="form-group">
              <CustomSelect
                label="Class"
                value={formData.classId}
                onChange={(val) => setFormData({ ...formData, classId: val })}
                options={availableClasses.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                placeholder="Select a class..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {subject ? "Save Changes" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
