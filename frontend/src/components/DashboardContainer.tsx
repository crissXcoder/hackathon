"use client";

import { useEffect, useState } from "react";
import { DashboardView } from "@/components/DashboardView";

export function DashboardContainer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? <DashboardView /> : null;
}
