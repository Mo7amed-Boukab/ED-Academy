import { X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ClassOption {
  id: string;
  name: string;
}

interface Teacher {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  assignedClasses?: ClassOption[];
}

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacherData: any) => void;
  teacher?: Teacher;
  availableClasses?: ClassOption[];
}

export const TeacherModal = ({
  isOpen,
  onClose,
  onSave,
  teacher,
  availableClasses = [],
}: TeacherModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    assignedClasses: [] as string[],
  });

  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (teacher) {
      setFormData({
        fullName: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone || "",
        password: "",
        assignedClasses: teacher.assignedClasses?.map((c) => c.id) || [],
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        assignedClasses: [],
      });
    }
  }, [teacher, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsClassDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleClass = (classId: string) => {
    setFormData((prev) => {
      const exists = prev.assignedClasses.includes(classId);
      if (exists) {
        return {
          ...prev,
          assignedClasses: prev.assignedClasses.filter((id) => id !== classId),
        };
      } else {
        return { ...prev, assignedClasses: [...prev.assignedClasses, classId] };
      }
    });
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: "520px" }}>
        <div className="modal-header">
          <h3 className="modal-title">
            {teacher ? "Edit Teacher" : "Add New Teacher"}
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
              <label className="form-label">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-input"
                placeholder="teacher@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required={!teacher}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="form-input"
                placeholder={
                  teacher ? "Leave blank to keep current" : "Create password"
                }
              />
            </div>

            {/* Custom Multi-select for Class Assignment */}
            <div className="form-group relative" ref={dropdownRef}>
              <label className="form-label">Assigned Classes</label>
              <button
                type="button"
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                className="form-input w-full flex items-center justify-between text-left cursor-pointer"
              >
                <span
                  className={
                    formData.assignedClasses.length === 0
                      ? "text-[var(--text-muted)]"
                      : "text-[var(--text-primary)]"
                  }
                >
                  {formData.assignedClasses.length > 0
                    ? formData.assignedClasses
                        .map(
                          (id) =>
                            availableClasses.find((c) => c.id === id)?.name
                        )
                        .filter(Boolean)
                        .join(", ")
                    : "Select classes"}
                </span>
                <ChevronDown size={16} className="text-[var(--text-muted)]" />
              </button>

              {isClassDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[var(--border-color)] z-10 max-h-48 overflow-y-auto">
                  {availableClasses.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-[var(--text-muted)]">
                      No classes available
                    </div>
                  ) : (
                    availableClasses.map((cls) => (
                      <div
                        key={cls.id}
                        onClick={() => toggleClass(cls.id)}
                        className="px-3 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={formData.assignedClasses.includes(cls.id)}
                          readOnly
                          className="w-4 h-4 border-[var(--border-color)]"
                          style={{ accentColor: "var(--primary)" }}
                        />
                        <span className="text-sm text-[var(--text-primary)]">
                          {cls.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {teacher ? "Save Changes" : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
