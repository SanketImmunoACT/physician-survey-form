"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchFilter({
  onSearch,
  onFilter,
  searchPlaceholder = "Search...",
  filterOptions = [],
  showDateFilter = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilter({ type: value, dateRange });
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onFilter({ type: selectedFilter, dateRange: newDateRange });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedFilter("");
    setDateRange({ from: "", to: "" });
    onSearch("");
    onFilter({ type: "", dateRange: { from: "", to: "" } });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Dropdown */}
        {filterOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-4 h-4" />
            <Select value={selectedFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date Range Filter */}
        {showDateFilter && (
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dateRange.from}
              onChange={(e) => handleDateRangeChange("from", e.target.value)}
              className="w-40"
            />
            <span className="text-gray-400">to</span>
            <Input
              type="date"
              value={dateRange.to}
              onChange={(e) => handleDateRangeChange("to", e.target.value)}
              className="w-40"
            />
          </div>
        )}

        {/* Clear Filters */}
        {(searchTerm || selectedFilter || dateRange.from || dateRange.to) && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
