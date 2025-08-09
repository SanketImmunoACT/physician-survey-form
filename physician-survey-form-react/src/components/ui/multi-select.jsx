import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";

export function MultiSelect({
  options = [],
  value = [],
  onChange = () => {},
  placeholder = "Select options...",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemove = (optionValue) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return value
      .map((v) => {
        const found = options.find((opt) => opt.value === v);
        return found ? found.label : null;
      })
      .filter(Boolean);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className="min-h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {value.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
              >
                {label}
                <button
                  type="button"
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    const optionValue = options.find(
                      (opt) => opt.label === label
                    )?.value;
                    if (optionValue) handleRemove(optionValue);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={cn(
            "absolute right-3 top-3 h-4 w-4 text-gray-500 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search hospitals by name..."
                className="w-full pl-8 pr-2 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-sm text-gray-500 text-center">
                No hospitals found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 px-3 py-2 text-sm cursor-pointer hover:bg-blue-100"
                  onClick={() => handleToggle(option.value)}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border border-blue-500",
                      value.includes(option.value)
                        ? "bg-blue-500 text-white"
                        : "opacity-50"
                    )}
                  >
                    {value.includes(option.value) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
