import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Building2,
  FileText,
  ArrowRight,
  Calendar,
  CalendarDays,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 3 project placeholders with videos from public/Video (paths with spaces/special chars encoded when used)
const PROJECT_VIDEOS = [
  "/Video/video1.mp4",
  "/Video/video 3.mp4",
  "/Video/WhatsApp Video 2026-01-16 at 2.07.43 AM.mp4",
];

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Cloud Infrastructure Migration",
    deadline: "Oct 24, 2024",
    progress: 85,
    phase: "Phase 4 of 5",
    videoSrc: PROJECT_VIDEOS[0],
  },
  {
    id: 2,
    title: "Product Design Overhaul",
    deadline: "Nov 15, 2024",
    progress: 60,
    phase: "Phase 3 of 5",
    videoSrc: PROJECT_VIDEOS[1],
  },
  {
    id: 3,
    title: "Mobile App Development",
    deadline: "Dec 01, 2024",
    progress: 30,
    phase: "Phase 2 of 5",
    videoSrc: PROJECT_VIDEOS[2],
  },
];

// Action Required: summary in red; each row = primary | secondary | accent
type ActionVariant = "primary" | "secondary" | "accent";
const MOCK_ACTIONS: { id: number; label: string; variant: ActionVariant }[] = [
  { id: 1, label: "Pending Budget Approval", variant: "primary" },
  { id: 2, label: "2 Design Reviews Pending", variant: "secondary" },
  { id: 3, label: "3 Unread Messages", variant: "accent" },
];

function getActionRequiredSummary(actions: { id: number }[]): string {
  const total = actions.length;
  const taskWord = total === 1 ? "task" : "tasks";
  const verb = total === 1 ? "needs" : "need";
  return `${total} ${taskWord} ${verb} your attention`;
}

const DashboardPage = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const [metricsProjectIndex, setMetricsProjectIndex] = useState(0);
  const currentProject = MOCK_PROJECTS[projectIndex];

  return (
    <div className="w-full py-3">
        {/* Client profile header */}
        <section className="mb-3 flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5">
          <div className="flex gap-3 items-center">
            <div className="bg-white p-2 rounded-lg shadow-inner border border-black/5 flex items-center justify-center size-12">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-[#121118] dark:text-white text-lg font-extrabold tracking-tight">
                Alexander Sterling
              </h1>
              <p className="text-[#68608a] dark:text-gray-400 text-sm font-medium mt-0.5">
                CEO, Sterling Enterprises
              </p>
            </div>
          </div>
          <div className="mt-3 md:mt-0 space-y-1 text-right">
            <div className="flex items-center justify-end gap-1.5 text-[#68608a] dark:text-gray-300">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-xs">alexander@sterling.com</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Contract: Active
              </span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-[#68608a] dark:text-gray-300">
              <span className="text-xs">
                Account Manager: <span className="font-semibold text-primary">Sarah Jenkins</span>
              </span>
              <HeadphonesIcon className="w-3.5 h-3.5" />
            </div>
          </div>
        </section>

        {/* Row 1: Project Overview + Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          {/* Project Overview */}
          <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[#121118] dark:text-white text-base font-bold">
                Project Overview
              </h3>
              <div className="flex items-center gap-1.5 bg-secondary p-0.5 rounded-md">
                <button
                  type="button"
                  onClick={() =>
                    setProjectIndex((i) => (i === 0 ? MOCK_PROJECTS.length - 1 : i - 1))
                  }
                  className="p-0.5 hover:opacity-80 rounded transition-opacity"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-secondary-foreground" />
                </button>
                <span className="text-[10px] font-bold text-secondary-foreground px-1.5 whitespace-nowrap">
                  Project {projectIndex + 1} of {MOCK_PROJECTS.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setProjectIndex((i) => (i === MOCK_PROJECTS.length - 1 ? 0 : i + 1))
                  }
                  className="p-0.5 hover:opacity-80 rounded transition-opacity"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-secondary-foreground" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border border-black/5 group">
                <video
                  key={currentProject.videoSrc}
                  src={encodeURI(currentProject.videoSrc)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <div>
                <h4 className="text-[#121118] dark:text-white text-sm font-bold">
                  {currentProject.title}
                </h4>
                <p className="text-[#68608a] dark:text-gray-400 text-[10px] mt-0.5">
                  Deadline: {currentProject.deadline}
                </p>
              </div>
              <div className="space-y-1 pt-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary">
                    {currentProject.progress}% Complete
                  </span>
                  <span className="text-[10px] font-medium text-[#68608a]">
                    {currentProject.phase}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#f1f0f5] dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(126,99,248,0.4)]"
                    style={{ width: `${currentProject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics - plain container, no graph */}
          <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[#121118] dark:text-white text-base font-bold">
                Performance Metrics
              </h3>
              <div className="flex items-center gap-1.5 bg-secondary p-0.5 rounded-md">
                <button
                  type="button"
                  onClick={() =>
                    setMetricsProjectIndex((i) => (i === 0 ? 1 : i - 1))
                  }
                  className="p-0.5 hover:opacity-80 rounded transition-opacity"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-secondary-foreground" />
                </button>
                <span className="text-[10px] font-bold text-secondary-foreground px-1.5">
                  Project {metricsProjectIndex + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setMetricsProjectIndex((i) => (i === 1 ? 0 : i + 1))
                  }
                  className="p-0.5 hover:opacity-80 rounded transition-opacity"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-secondary-foreground" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 py-3">
              <p className="text-[10px] text-[#68608a] dark:text-gray-400">
                Metrics for this project
              </p>
              <Button size="sm" className="bg-primary text-white h-7 text-[10px] font-bold px-3 rounded-lg hover:bg-primary/90 shadow-md shadow-primary/20">
                View metrics
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Invoices + Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5">
            <h3 className="text-[#121118] dark:text-white text-base font-bold mb-2">
              Invoices
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border border-[#dddbe6]/30 rounded-md hover:bg-[#faf7f1] dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="bg-[#f1f0f5] dark:bg-white/10 p-1 rounded-md">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-[#121118] dark:text-white text-sm">
                      INV-8829
                    </p>
                    <p className="text-[10px] text-[#68608a]">Aug 24, 2023</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold rounded-full">
                  Paid
                </span>
              </div>
              <div className="flex items-center justify-between p-2 border border-[#dddbe6]/30 rounded-md hover:bg-[#faf7f1] dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="bg-[#f1f0f5] dark:bg-white/10 p-1 rounded-md">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-[#121118] dark:text-white text-sm">
                      INV-8830
                    </p>
                    <p className="text-[10px] text-[#68608a]">Sep 01, 2023</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold rounded-full">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between p-2 border border-[#dddbe6]/30 rounded-md hover:bg-[#faf7f1] dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="bg-[#f1f0f5] dark:bg-white/10 p-1 rounded-md">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-[#121118] dark:text-white text-sm">
                      INV-8831
                    </p>
                    <p className="text-[10px] text-[#68608a]">Sep 28, 2023</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold rounded-full">
                  Paid
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5">
            <h3 className="text-[#121118] dark:text-white text-base font-bold mb-3">
              Support
            </h3>
            {/* Need Assistance? - primary color container */}
            <div className="rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 flex flex-col items-center text-center shadow-sm">
              <div className="size-12 rounded-full bg-primary flex items-center justify-center mb-3 shadow-md">
                <HeadphonesIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-[#121118] dark:text-white text-sm font-bold mb-1">
                Need Assistance?
              </h4>
              <p className="text-[#68608a] dark:text-gray-400 text-xs mb-3 max-w-[240px]">
                Our primary support team is available 24/7 for enterprise clients.
              </p>
              <a
                href="https://www.helpmenow-theunoia.com/help-center"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 px-4 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-colors"
              >
                Submit Request
              </a>
            </div>
          </div>
        </div>

        {/* Row 3: Upcoming Deadlines + Action Required */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5">
            <h3 className="text-[#121118] dark:text-white text-base font-bold mb-2">
              Upcoming Deadlines
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-1">
                <div className="bg-primary/10 dark:bg-primary/20 p-1 rounded-md border border-primary/20">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[#121118] dark:text-white text-xs font-semibold">
                    Phase 3: Security Review
                  </p>
                  <p className="text-[10px] text-primary font-medium">
                    Due in 2 days • Oct 14
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-1">
                <div className="bg-secondary/30 dark:bg-secondary/20 p-1 rounded-md border border-secondary/40">
                  <CalendarDays className="w-3.5 h-3.5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-[#121118] dark:text-white text-xs font-semibold">
                    UAT Feedback Loop
                  </p>
                  <p className="text-[10px] text-[#68608a]">Due in 5 days • Oct 17</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-1">
                <div className="bg-accent/30 dark:bg-accent/20 p-1 rounded-md border border-accent/50">
                  <Calendar className="w-3.5 h-3.5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-[#121118] dark:text-white text-xs font-semibold">
                    Final Deliverables Review
                  </p>
                  <p className="text-[10px] text-accent-foreground font-medium">
                    Due in 7 days • Oct 21
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-black/5">
            <h3 className="text-[#121118] dark:text-white text-base font-bold mb-1">
              Action Required
            </h3>
            <p className="text-red-600 dark:text-red-400 text-xs font-medium mb-2">
              {getActionRequiredSummary(MOCK_ACTIONS)}
            </p>
            <div className="space-y-1">
              {MOCK_ACTIONS.map((action) => {
                const isPrimary = action.variant === "primary";
                const isSecondary = action.variant === "secondary";
                const isAccent = action.variant === "accent";
                return (
                  <div
                    key={action.id}
                    className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                      isPrimary
                        ? "bg-primary/10 dark:bg-primary/20 hover:bg-primary/15"
                        : isSecondary
                          ? "bg-secondary/20 dark:bg-secondary/10 hover:bg-secondary/30"
                          : "bg-accent/20 dark:bg-accent/10 hover:bg-accent/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-1 rounded-full ${
                          isPrimary
                            ? "bg-primary animate-pulse"
                            : isSecondary
                              ? "bg-secondary-foreground"
                              : "bg-accent-foreground"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-medium ${
                          isPrimary
                            ? "text-primary font-semibold"
                            : isSecondary
                              ? "text-secondary-foreground"
                              : "text-accent-foreground"
                        }`}
                      >
                        {action.label}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isPrimary
                          ? "text-primary"
                          : isSecondary
                            ? "text-secondary-foreground"
                            : "text-accent-foreground"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

    </div>
  );
};

export default DashboardPage;
