import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) => {
  return (
    <div
      className={`flex items-center gap-2.5 bg-white border border-gray-200 px-3.5 py-2 rounded-sm focus-within:border-[#c41e3a] h-[38px] w-full max-lg:min-w-0 min-w-[260px] ${className}`}
    >
      <Search size={15} className="text-gray-400 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-none bg-transparent outline-none text-sm text-gray-800 w-full placeholder:text-gray-400"
      />
    </div>
  );
};
