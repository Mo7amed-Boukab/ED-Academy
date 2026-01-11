import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (Option | string)[];
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  label,
  className = "",
  disabled = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: Option[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedLabel =
    normalizedOptions.find((opt) => opt.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative max-lg:min-w-0 min-w-[180px] ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      ref={containerRef}
    >
      {label && (
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3.5 py-2 bg-white border border-gray-200 rounded-sm text-sm h-[38px] custom-select-trigger ${disabled ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-gray-300'
          }`}
      >
        <span className={!value ? "text-gray-400" : "text-gray-800"}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-150 flex-shrink-0 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-[9999] rounded-b-sm max-h-[300px] overflow-y-auto">
          {normalizedOptions.length === 0 ? (
            <div className="px-3.5 py-2.5 text-sm text-gray-400">
              No options
            </div>
          ) : (
            normalizedOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 text-sm cursor-pointer hover:bg-gray-50 ${value === option.value
                  ? "bg-gray-100 text-[#c41e3a]"
                  : "text-gray-800"
                  }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check size={12} className="text-[#c41e3a]" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
