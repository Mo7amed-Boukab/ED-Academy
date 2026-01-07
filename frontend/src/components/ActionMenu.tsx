import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export interface ActionMenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface ActionMenuProps {
  actions: ActionMenuItem[];
}

export const ActionMenu = ({ actions }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="action-menu" ref={menuRef}>
      <button
        type="button"
        className="action-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Actions"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="action-menu-backdrop"
            onClick={() => setIsOpen(false)}
          />

          <div className="action-menu-dropdown">
            {actions.map((action, index) => (
              <button
                key={index}
                type="button"
                className={`action-menu-item ${
                  action.variant === "danger" ? "danger" : ""
                }`}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
              >
                <span className="action-menu-icon">{action.icon}</span>
                <span className="action-menu-label">{action.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
