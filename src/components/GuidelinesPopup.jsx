"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  FileText,
  Users,
  Calculator,
  Shield,
  Globe,
  Database,
} from "lucide-react";

const guidelines = [
  {
    id: 1,
    text: "For each doctor, include details of up to 5 hospitals they consult at in a single form.",
    icon: Users,
    category: "form",
  },
  {
    id: 2,
    text: "If a doctor consults at more than 5 hospitals, fill one form for the first 5 hospitals and submit another form for the remaining hospitals.",
    icon: FileText,
    category: "form",
  },
  {
    id: 3,
    text: "Ensure the physician name are exactly the same across both submissions to enable correct linkage during data analysis.",
    icon: Database,
    category: "data",
  },
  {
    id: 4,
    text: "Use Approximate Data if Exact Numbers Aren't Available It's acceptable to ask for \"out of 10 patients, how many fall into each category?\" and use proportionate data.",
    icon: Calculator,
    category: "data",
  },
  {
    id: 5,
    text: "Ensure Totals Add Up For funding sources, patient distribution, and diagnostic splits - ensure values add up to 100%.",
    icon: CheckCircle,
    category: "validation",
  },
  {
    id: 6,
    text: "Fill each hospital section independently with clean, hospital-doctor specific data.",
    icon: Shield,
    category: "data",
  },
  {
    id: 7,
    text: "Avoid Assumptions Don't guess numbers - always validate by asking the right stakeholders at the hospital.",
    icon: AlertTriangle,
    category: "validation",
  },
  {
    id: 8,
    text: "Submit Online Only",
    icon: Globe,
    category: "submission",
  },
  {
    id: 9,
    text: "Reply on Sources of Information - Receptionist, Team, Consultant, Junior doctor, Secretary, Physician's assistant, Hospital Admin (if access is available), Department Nurse Doctor (least preferred)",
    icon: Info,
    category: "sources",
  },
];

const categoryColors = {
  form: "bg-blue-50 border-blue-200 text-blue-800",
  data: "bg-green-50 border-green-200 text-green-800",
  validation: "bg-orange-50 border-orange-200 text-orange-800",
  submission: "bg-purple-50 border-purple-200 text-purple-800",
  sources: "bg-indigo-50 border-indigo-200 text-indigo-800",
};

const categoryIcons = {
  form: FileText,
  data: Database,
  validation: CheckCircle,
  submission: Globe,
  sources: Users,
};

export default function GuidelinesPopup({ isOpen, onClose, onAccept }) {
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [activeTab, setActiveTab] = useState("all");
  const [hasSeenGuidelines, setHasSeenGuidelines] = useState(false);

  // Check if user has seen guidelines before (using localStorage)
  useEffect(() => {
    const seen = localStorage.getItem("guidelinesSeen");
    if (seen) {
      setHasSeenGuidelines(true);
    }
  }, []);

  const handleCheckboxChange = (guidelineId) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(guidelineId)) {
      newCheckedItems.delete(guidelineId);
    } else {
      newCheckedItems.add(guidelineId);
    }
    setCheckedItems(newCheckedItems);
  };

  const handleAccept = () => {
    // Mark guidelines as seen
    localStorage.setItem("guidelinesSeen", "true");
    setHasSeenGuidelines(true);
    onAccept && onAccept();
    onClose();
  };

  const handleSkip = () => {
    // Mark guidelines as seen
    localStorage.setItem("guidelinesSeen", "true");
    setHasSeenGuidelines(true);
    onClose();
  };

  const filteredGuidelines =
    activeTab === "all"
      ? guidelines
      : guidelines.filter((g) => g.category === activeTab);

  const allChecked = checkedItems.size === guidelines.length;
  const someChecked =
    checkedItems.size > 0 && checkedItems.size < guidelines.length;

  const handleSelectAll = () => {
    if (allChecked) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(guidelines.map((g) => g.id)));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-green-700">
                  Key Guidelines Before You Start
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Please review these important guidelines before filling out
                  the survey form
                </p>
              </div>
            </div>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button> */}
          </div>
        </DialogHeader>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Guidelines ({guidelines.length})
          </button>
          {Object.entries(categoryIcons).map(([category, Icon]) => {
            const count = guidelines.filter(
              (g) => g.category === category
            ).length;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === category
                    ? `${categoryColors[category]} border`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-3 h-3" />
                {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        {/* Guidelines List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[50vh]">
          {/* Select All Option */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
            <Checkbox
              checked={allChecked}
              ref={(el) => {
                if (el) el.indeterminate = someChecked;
              }}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-medium text-gray-700">
              {allChecked ? "Deselect All" : "Select All"} Guidelines
            </span>
          </div>

          {filteredGuidelines.map((guideline) => {
            const Icon = guideline.icon;
            const isChecked = checkedItems.has(guideline.id);

            return (
              <div
                key={guideline.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isChecked
                    ? "bg-green-50 border-green-300 shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => handleCheckboxChange(guideline.id)}
                    />
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${categoryColors[
                        guideline.category
                      ]
                        .replace("border-", "bg-")
                        .replace("text-", "text-")}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed">
                        {guideline.text}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            categoryColors[guideline.category]
                          }`}
                        >
                          {guideline.category.charAt(0).toUpperCase() +
                            guideline.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t mt-6">
          <div className="text-sm text-gray-600">
            {checkedItems.size} of {guidelines.length} guidelines reviewed
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Skip for Now
            </Button>
            <Button
              onClick={handleAccept}
              disabled={checkedItems.size === 0}
              className="bg-green-600 hover:bg-green-700 text-white px-6 cursor-pointer"
            >
              {checkedItems.size === guidelines.length
                ? "I Understand All Guidelines"
                : `Continue (${checkedItems.size}/${guidelines.length})`}
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>
              {Math.round((checkedItems.size / guidelines.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(checkedItems.size / guidelines.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
