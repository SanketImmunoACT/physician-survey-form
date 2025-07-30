"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { LabelWithTooltip } from "@/components/ui/LabelWithTooltip";

export function SingleSelect({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = "Select or search clinician name...",
  className = "",
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  // Close dropdown on outside click
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

  // Focus search input when open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <LabelWithTooltip
  labelText="Name of the Physician *"
  tooltipText="Capture the full name"
/>

      <div
        className={cn(
          "min-h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background flex items-center justify-between",
          error ? "border-red-500" : "border-input",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={cn(
            "truncate",
            !value && "text-gray-400"
          )}
        >
          {selectedLabel || placeholder}
        </span>

        <div className="flex items-center gap-1">
          {value && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(null); // Clear the selection
              }}
              className="hover:bg-gray-100 p-1 rounded-full"
              title="Clear selection"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-500 transition-transform cursor-pointer",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search clinician..."
                className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-sm text-gray-500 text-center">
                No clinician found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 px-3 py-2 text-sm cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <Check
                    className={cn(
                      "h-4 w-4 text-blue-600",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
