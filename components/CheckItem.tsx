export const CheckItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const id = `id-${children}`;
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          name="comments"
          type="checkbox"
          className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </div>
      <div className="ml-3 text">
        <label htmlFor={id} className="font-medium text-gray-700">
          {children}
        </label>
      </div>
    </div>
  );
};
