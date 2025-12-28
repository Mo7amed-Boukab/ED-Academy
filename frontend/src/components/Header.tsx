interface HeaderProps {
    title: string;
    description?: string;
}

export const Header = ({ title, description }: HeaderProps) => {
    return (
         <header className="h-16 lg:h-20 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 sticky top-0 z-20">
      <div className="ml-14 lg:ml-0">
        <h1 className="text-base lg:text-lg font-semibold text-gray-900">
          {title}
        </h1>
        <p className="text-xs text-gray-500 hidden sm:block">{description}</p>
      </div>
    </header>
    );
};
