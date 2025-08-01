"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useGuidelines() {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [hasSeenGuidelines, setHasSeenGuidelines] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user has seen guidelines before
    const seen = localStorage.getItem("guidelinesSeen");
    if (seen) {
      setHasSeenGuidelines(true);
      return;
    }

    // Check if this is a new form (has formId in URL params)
    const formId = searchParams.get("formId");
    const isNewForm = searchParams.get("new") === "true";
    
    // Show guidelines if:
    // 1. User hasn't seen guidelines before AND
    // 2. Either has a formId (new form) OR explicitly marked as new
    if (!hasSeenGuidelines && (formId || isNewForm)) {
      setShowGuidelines(true);
    }
  }, [searchParams, hasSeenGuidelines]);

  const handleCloseGuidelines = () => {
    setShowGuidelines(false);
    setHasSeenGuidelines(true);
  };

  const handleAcceptGuidelines = () => {
    setShowGuidelines(false);
    setHasSeenGuidelines(true);
    // You can add additional logic here if needed
  };

  const resetGuidelines = () => {
    localStorage.removeItem("guidelinesSeen");
    setHasSeenGuidelines(false);
    setShowGuidelines(true);
  };

  return {
    showGuidelines,
    hasSeenGuidelines,
    handleCloseGuidelines,
    handleAcceptGuidelines,
    resetGuidelines
  };
} 