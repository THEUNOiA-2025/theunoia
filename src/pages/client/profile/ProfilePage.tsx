import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  ClipboardList,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  FileText,
  AlertCircle,
  MapPin,
  CreditCard,
  Shield,
  Edit,
  User,
} from "lucide-react";
import { format } from "date-fns";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  city: string | null;
  phone: string | null;
  profile_picture_url: string | null;
  created_at: string;
}

interface ProfileStats {
  totalProjects: number;
  openProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  totalBids: number;
  acceptedBids: number;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<ProfileStats>({
    totalProjects: 0,
    openProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    totalBids: 0,
    acceptedBids: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfileData = async () => {
      try {
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileData) setProfile(profileData as ProfileData);

        const { data: projects } = await supabase
          .from("user_projects")
          .select("id, status")
          .eq("user_id", user.id);

        const projectIds = projects?.map((p) => p.id) || [];

        let totalBids = 0;
        let acceptedBids = 0;

        if (projectIds.length > 0) {
          const { data: bids } = await supabase
            .from("bids")
            .select("id, status")
            .in("project_id", projectIds);

          totalBids = bids?.length || 0;
          acceptedBids =
            bids?.filter((b) => b.status === "accepted").length || 0;
        }

        setStats({
          totalProjects: projects?.length || 0,
          openProjects:
            projects?.filter((p) => p.status === "open").length || 0,
          completedProjects:
            projects?.filter((p) => p.status === "completed").length || 0,
          inProgressProjects:
            projects?.filter((p) => p.status === "in_progress").length || 0,
          totalBids,
          acceptedBids,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const memberSince = profile?.created_at
    ? format(new Date(profile.created_at), "MMMM yyyy")
    : "";

  const initials = profile
    ? `${profile.first_name?.charAt(0) || ""}${profile.last_name?.charAt(0) || ""}`.toUpperCase()
    : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f1] p-5">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex gap-5">
            <Skeleton className="w-[76px] h-[76px] rounded-2xl" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "Client";

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#faf7f1] pb-14">
      {/* ─── Header ─── */}
      <header className="max-w-6xl mx-auto px-5 pt-7 pb-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          {/* Left: Identity */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-black/5 shrink-0">
              {profile?.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#7e63f8]/10 flex items-center justify-center">
                  <span className="text-base font-bold text-[#7e63f8]">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                  {fullName}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#cbec93] text-slate-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified Client
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1.5">
                {profile?.email}
              </p>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {profile?.bio ||
                  "Welcome to your client profile. Add a bio to tell freelancers about yourself and the kind of projects you work on."}
              </p>
            </div>
          </div>

          {/* Right: Meta & Actions */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="text-xs text-slate-500 space-y-0.5 text-left md:text-right">
              {profile?.city && (
                <div className="flex items-center md:justify-end gap-1.5">
                  <span>{profile.city}</span>
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              )}
              <div>Member since {memberSince}</div>
            </div>
            <Button className="bg-[#7e63f8] text-white px-5 py-2 h-auto rounded-xl text-[13px] font-semibold shadow-lg shadow-[#7e63f8]/20 hover:bg-[#7e63f8]/90">
              <Edit className="w-3.5 h-3.5 mr-1.5" />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 space-y-5">
        {/* ─── Reputation Snapshot ─── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            icon={<Star className="w-4 h-4" />}
            iconBg="bg-[#fbdd84]/20"
            iconColor="text-[#fbdd84]"
            value="4.8"
            label="Avg. Rating"
          />
          <MetricCard
            icon={<ClipboardList className="w-4 h-4" />}
            iconBg="bg-[#7e63f8]/10"
            iconColor="text-[#7e63f8]"
            value={String(stats.completedProjects)}
            label="Projects Completed"
          />
          <MetricCard
            icon={<CheckCircle className="w-4 h-4" />}
            iconBg="bg-[#cbec93]/20"
            iconColor="text-green-700"
            value="98%"
            label="On-time Payments"
          />
          <MetricCard
            icon={<Clock className="w-4 h-4" />}
            iconBg="bg-slate-100"
            iconColor="text-slate-600"
            value="2 hrs"
            label="Avg. Response"
          />
        </section>

        {/* ─── Workspace Control Center ─── */}
        <section className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#121118] ml-0.5">
            Workspace Control Center
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <WorkspaceTile
              icon={<Zap className="w-5 h-5" />}
              value={pad(stats.inProgressProjects)}
              label="Active Projects"
            />
            <WorkspaceTile
              icon={<Eye className="w-5 h-5" />}
              value={pad(stats.totalBids)}
              label="Open Bids"
            />
            <WorkspaceTile
              icon={<FileText className="w-5 h-5" />}
              value={pad(stats.acceptedBids)}
              label="Ongoing Contracts"
            />
            <WorkspaceTile
              icon={<AlertCircle className="w-5 h-5" />}
              value={pad(stats.openProjects)}
              label="Pending Approvals"
            />
          </div>
        </section>

        {/* ─── About + Preferences (2-column) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* About Our Work */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-black/5 space-y-3.5">
            <h2 className="text-[15px] font-bold text-slate-900">
              About Our Work
            </h2>
            <div className="space-y-3">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Industry Focus
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["FinTech", "SaaS", "AI/ML", "UX Research"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-[#fbdd84]/30 text-slate-800 text-[13px] font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Project Types
                </span>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  We primarily post long-term engagements (6+ months) focusing
                  on product design, full-stack engineering, and go-to-market
                  strategy. We occasionally seek specialists for intensive
                  2-week sprints.
                </p>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Engagement Style
                </span>
                <div className="flex items-center gap-3 py-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7e63f8]" />
                    <span className="text-[13px] font-medium text-slate-700">
                      Retainer Based
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7e63f8]" />
                    <span className="text-[13px] font-medium text-slate-700">
                      Milestone Driven
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Working Preferences */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-black/5 space-y-3.5">
            <h2 className="text-[15px] font-bold text-slate-900">
              Working Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <PreferenceItem
                label="Communication"
                value="Slack & Async First"
              />
              <PreferenceItem
                label="Timezone"
                value="GMT (Overlap 14:00 - 18:00)"
              />
              <PreferenceItem
                label="Collaboration"
                value="Figma & Notion"
              />
              <PreferenceItem
                label="Update Frequency"
                value="Weekly Video Syncs"
              />
            </div>
            <div className="p-3.5 bg-[#faf7f1] rounded-xl border border-slate-100">
              <p className="text-[13px] text-slate-500 italic">
                "I value direct honesty and radical transparency. We treat
                contractors as core team members."
              </p>
            </div>
          </section>
        </div>

        {/* ─── Account & Billing ─── */}
        <section className="bg-slate-900/5 p-5 rounded-xl border border-slate-200/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h2 className="text-[15px] font-bold text-slate-800">
                Account & Billing
              </h2>
              <p className="text-[13px] text-slate-500 max-w-md">
                Access your secure payment methods, tax documentation, and
                assigned account manager details.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="bg-white border-slate-200 text-slate-700 px-4 py-2 h-auto rounded-xl font-semibold text-[13px] hover:bg-slate-50 shadow-sm"
              >
                Manage Billing
              </Button>
              <Button
                variant="outline"
                className="bg-white border-slate-200 text-slate-700 px-4 py-2 h-auto rounded-xl font-semibold text-[13px] hover:bg-slate-50 shadow-sm"
              >
                Security Settings
              </Button>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                <User className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#121118] uppercase tracking-wider">
                  Assigned Manager
                </p>
                <p className="text-[13px] font-semibold text-slate-700">
                  Sarah Jenkins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#121118] uppercase tracking-wider">
                  Payment Method
                </p>
                <p className="text-[13px] font-semibold text-slate-700">
                  Visa ending in •••• 9012
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                <Shield className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#121118] uppercase tracking-wider">
                  Trust Score
                </p>
                <p className="text-[13px] font-semibold text-slate-700">
                  Exceptional (High Limit)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ─── Sub-components ─── */

function MetricCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white p-3.5 rounded-xl shadow-sm flex items-center gap-3 border border-black/5">
      <div
        className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold text-slate-900">{value}</div>
        <div className="text-[11px] uppercase tracking-wider font-bold text-[#121118]">
          {label}
        </div>
      </div>
    </div>
  );
}

function WorkspaceTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white p-3.5 rounded-xl shadow-sm border border-black/5 group cursor-pointer transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-slate-400 group-hover:text-[#7e63f8] transition-colors mb-2">
        {icon}
      </div>
      <div className="text-lg font-bold text-slate-900">{value}</div>
      <div className="text-[13px] text-slate-500 font-medium">{label}</div>
    </div>
  );
}

function PreferenceItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-0.5">
      <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </div>
      <p className="text-[13px] font-medium text-slate-800">{value}</p>
    </div>
  );
}

export default ProfilePage;
