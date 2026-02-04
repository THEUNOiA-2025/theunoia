import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ListFilter,
  Clock,
  Users,
  TrendingUp,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Live countdown from now until endDate (ISO string). Updates every second.
function useCountdown(endDate: string | null): { days: number; hours: number; minutes: number } | null {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!endDate) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [endDate]);
  if (!endDate) return null;
  const end = new Date(endDate).getTime();
  const diff = Math.max(0, end - now);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  return { days, hours, minutes };
}

function formatCountdown(c: { days: number; hours: number; minutes: number } | null): string {
  if (!c) return "—";
  return `${c.days}d ${c.hours}h ${c.minutes}m`;
}

type ProjectStatus = "open_for_bidding" | "in_progress" | "completed";

interface ClientProject {
  id: string;
  title: string;
  coverImageUrl: string | null;
  coverVideoUrl?: string | null;
  status: ProjectStatus;
  biddingDeadline: string | null;
  bidsReceived: number;
  phaseName: string | null;
  talentName: string | null;
  tags: string[];
}

// Public folder: images (poster/fallback) and all videos from public/Video
const PUBLIC_IMAGES = [
  "/images/class1.png",
  "/images/class2.png",
  "/images/class3.png",
  "/images/auth-slide-1.png",
  "/images/dashboard-hero.png",
  "/images/dashboard-preview.png",
];
const PUBLIC_VIDEOS = [
  "/Video/video1.mp4",
  "/Video/video 3.mp4",
  "/Video/WhatsApp Video 2026-01-16 at 2.07.43 AM.mp4",
  "/Video/WhatsApp Video 2026-01-28 at 6.24.41 PM.mp4",
  "/Video/New Project 29 [4ED1F2C].mp4",
];

// Every card uses a video from public/Video; poster from public images. Reduced layout.
const MOCK_PROJECTS: ClientProject[] = [
  {
    id: "1",
    title: "Modern Fintech App UI/UX Design",
    coverImageUrl: PUBLIC_IMAGES[0]!,
    coverVideoUrl: PUBLIC_VIDEOS[0]!,
    status: "open_for_bidding",
    biddingDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    bidsReceived: 24,
    phaseName: null,
    talentName: null,
    tags: ["Product Design", "Mobile"],
  },
  {
    id: "2",
    title: "E-commerce Brand Identity Redesign",
    coverImageUrl: PUBLIC_IMAGES[1]!,
    coverVideoUrl: PUBLIC_VIDEOS[1]!,
    status: "in_progress",
    biddingDeadline: null,
    bidsReceived: 0,
    phaseName: "Phase 2: Review",
    talentName: "Alex Rivera",
    tags: ["Branding", "Logo"],
  },
  {
    id: "3",
    title: "Motion Graphics Video Intro",
    coverImageUrl: PUBLIC_IMAGES[2]!,
    coverVideoUrl: PUBLIC_VIDEOS[2]!,
    status: "open_for_bidding",
    biddingDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 12 * 60 * 1000).toISOString(),
    bidsReceived: 8,
    phaseName: null,
    talentName: null,
    tags: ["Animation", "Video"],
  },
  {
    id: "4",
    title: "Social Media Campaign Assets",
    coverImageUrl: PUBLIC_IMAGES[3]!,
    coverVideoUrl: PUBLIC_VIDEOS[3]!,
    status: "in_progress",
    biddingDeadline: null,
    bidsReceived: 0,
    phaseName: "Phase 1: Research",
    talentName: "Sarah J.",
    tags: ["Marketing", "Social"],
  },
  {
    id: "5",
    title: "Web3 Dashboard Visual Style",
    coverImageUrl: PUBLIC_IMAGES[4]!,
    coverVideoUrl: PUBLIC_VIDEOS[4]!,
    status: "open_for_bidding",
    biddingDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
    bidsReceived: 42,
    phaseName: null,
    talentName: null,
    tags: ["UI Design", "Blockchain"],
  },
  {
    id: "6",
    title: "Leadership Program Visuals",
    coverImageUrl: PUBLIC_IMAGES[5]!,
    coverVideoUrl: PUBLIC_VIDEOS[0]!,
    status: "in_progress",
    biddingDeadline: null,
    bidsReceived: 0,
    phaseName: "Phase 3: Delivery",
    talentName: "Jordan Lee",
    tags: ["Video", "Marketing"],
  },
];

const TABS = [
  { value: "all", label: "All Projects" },
  { value: "active", label: "Active" },
  { value: "bidding", label: "Bidding" },
  { value: "completed", label: "Completed" },
] as const;

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["value"]>("all");

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      if (activeTab === "all") return true;
      if (activeTab === "active") return p.status === "in_progress";
      if (activeTab === "bidding") return p.status === "open_for_bidding";
      if (activeTab === "completed") return p.status === "completed";
      return true;
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1200px] w-full flex flex-col gap-5">
        {/* Title + Create Task — reduced size */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#121118] text-3xl font-black leading-tight tracking-[-0.033em] font-display">
              Projects
            </h1>
            <p className="text-[#68608a] text-base font-medium opacity-80">
              Manage your projects and tasks
            </p>
          </div>
          <Button
            className="flex min-w-[120px] items-center justify-center gap-1.5 rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
            asChild
          >
            <Link to="/projects/post-project">
              <Plus className="w-4 h-4" />
              <span className="truncate">Post Project</span>
            </Link>
          </Button>
        </div>

        {/* Tabs + Filters — compact */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="bg-[#FDF8F3] dark:bg-white/5 p-1 gap-1 h-auto justify-start border border-[#f1f0f5] dark:border-white/10 w-fit rounded-xl shadow-sm flex flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200",
                    activeTab === tab.value
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-[#121118] dark:text-white hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#FDF8F3] dark:bg-white/5 border border-[#f1f0f5] dark:border-white/10 px-3 text-[#121118] dark:text-white text-xs font-medium cursor-pointer hover:bg-[#f1f0f5] dark:hover:bg-white/10 transition-colors"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Project cards grid: 3 per row, reduced gap and card size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* New Project card — smaller to match */}
            <Link
              to="/projects/new"
              className="group bg-transparent border-2 border-dashed border-[#68608a]/30 rounded-xl flex flex-col items-center justify-center min-h-[280px] cursor-pointer hover:border-primary/50 hover:bg-white transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3 text-[#68608a] group-hover:text-primary">
                <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-base font-bold">New Project</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProjectCard({ project }: { project: ClientProject }) {
  const countdown = useCountdown(
    project.status === "open_for_bidding" ? project.biddingDeadline : null
  );
  const isBidding = project.status === "open_for_bidding";
  const isVideo = Boolean(project.coverVideoUrl);
  const coverSrc = project.coverImageUrl || undefined;

  const statusLabel =
    project.status === "open_for_bidding"
      ? "OPEN FOR BIDDING"
      : project.status === "in_progress"
        ? "IN PROGRESS"
        : "COMPLETED";

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-[#121118]/5">
      {/* Cover: video from public/Video — autoPlay, loop, no controls (same as dashboard Project Overview) */}
      <div className="relative h-36 w-full bg-slate-200 overflow-hidden">
        {isVideo && project.coverVideoUrl ? (
          <>
            <video
              key={project.coverVideoUrl}
              src={encodeURI(project.coverVideoUrl)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
              poster={coverSrc ?? undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </>
        ) : (
          <img
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={coverSrc ?? ""}
          />
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-grow">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold text-[#121118] leading-tight flex-1 min-w-0">
            {project.title}
          </h3>
          <span className="bg-accent text-[#121118] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm shrink-0">
            {statusLabel}
          </span>
        </div>

        {/* Gray container: Ends in + Bids received, or Status + Freelancer */}
        <div className="bg-[#f1f0f5] rounded-lg p-3 flex flex-col gap-2">
          {isBidding ? (
            <>
              <div className="flex items-center justify-between text-[#68608a]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <p className="text-[11px] font-semibold">Bid ends in</p>
                </div>
                <p className="text-[11px] font-bold text-[#121118] tabular-nums">
                  {formatCountdown(countdown)}
                </p>
              </div>
              <div className="flex items-center justify-between text-[#68608a]">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <p className="text-[11px] font-semibold">Bids received</p>
                </div>
                <p className="text-[11px] font-bold text-[#121118]">
                  {project.bidsReceived}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-[#68608a]">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[11px] font-semibold">Status</p>
                </div>
                <p className="text-[11px] font-bold text-primary">
                  {project.phaseName ?? "—"}
                </p>
              </div>
              <div className="flex items-center justify-between text-[#68608a]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <p className="text-[11px] font-semibold">Freelancer assigned</p>
                </div>
                <p className="text-[11px] font-bold text-[#121118]">
                  {project.talentName ?? "—"}
                </p>
              </div>
            </>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full h-9 border-2 border-primary text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-200 mt-auto"
          asChild
        >
          <Link to={`/projects/${project.id}`}>Open Project</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProjectsPage;
