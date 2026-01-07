import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomSelect } from "../../../../components/CustomSelect";

interface ClassOption {
  id: string;
  name: string;
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: any) => void;
  student?: any;
  availableClasses?: ClassOption[];
}

export const StudentModal = ({
  isOpen,
  onClose,
  onSave,
  student,
  availableClasses = [],
}: StudentModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    classId: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName,
        email: student.email,
        password: "",
        classId: student.class?.id || "",
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        classId: "",
      });
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">
            {student ? "Edit Student" : "Add New Student"}
          </h3>
          <button onClick={onClose} className="modal-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="form-input"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-input"
                placeholder="student@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required={!student}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="form-input"
                placeholder={
                  student ? "Leave blank to keep current" : "Create password"
                }
              />
            </div>

            <div className="form-group">
              <CustomSelect
                label="Assigned Class"
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
              {student ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
