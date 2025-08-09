// components/ui/checkbox.jsx
import React from "react";

export const Checkbox = ({ checked, onCheckedChange, id }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
  );
};
