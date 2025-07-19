"use client";
import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    fetch("/api/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    });
  }, []);
  return null;
}
