import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getMembers, getMemberBySlug } from "@/lib/sanity/client";
import { GlitchImage } from "@/components/ui/GlitchImage";
import { GothicFrame, GothicDivider } from "@/components/ui/GothicFrame";
import { TerminalText } from "@/components/ui/TerminalText";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

interface MemberPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    return { title: "Member Not Found | MEOVVNIVERSE" };
  }

  return {
    title: `${member.name} (${member.koreanName}) | MEOVV`,
    description: `Official archive and profile for ${member.name} of MEOVV. Positions: ${member.positions.join(", ")}. MBTI: ${member.mbti}, Zodiac: ${member.zodiac}.`,
  };
}

export default async function MemberDetailPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const [member, allMembers] = await Promise.all([
    getMemberBySlug(slug),
    getMembers(),
  ]);

  if (!member) {
    notFound();
  }

  // Find next member in the coven cycle
  const currentIndex = allMembers.findIndex((m) => m.slug === member.slug);
  const nextMember = allMembers[(currentIndex + 1) % allMembers.length];
  const prevMember = allMembers[(currentIndex - 1 + allMembers.length) % allMembers.length];

  return (
    <div className="relative min-h-screen bg-void pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background radial highlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(192,192,192,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Breadcrumb & Coven Cycle Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-concrete-light pb-4 text-xs font-mono text-fog">
          <Link
            href="/#coven"
            className="inline-flex items-center gap-2 text-chrome hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO THE COVEN</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={`/member/${prevMember.slug}`}
              className="hover:text-chrome transition-colors"
            >
              ← {prevMember.name}
            </Link>
            <span className="text-chrome-dim">|</span>
            <span className="text-white font-bold">{member.name}</span>
            <span className="text-chrome-dim">|</span>
            <Link
              href={`/member/${nextMember.slug}`}
              className="hover:text-chrome transition-colors"
            >
              {nextMember.name} →
            </Link>
          </div>
        </div>

        {/* Member Profile Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Large Glitch Portrait (5 cols) */}
          <div className="lg:col-span-5 relative space-y-4">
            <GothicFrame highlight className="p-2 bg-concrete-dark">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-void">
                <GlitchImage
                  src={member.heroImage}
                  alt={member.name}
                  fill
                  priority
                  className="w-full h-full"
                />

                {/* Vertical Monogram Watermark */}
                <div className="absolute bottom-4 right-4 text-6xl font-gothic font-black text-white/10 pointer-events-none select-none">
                  {member.name[0]}
                </div>
              </div>
            </GothicFrame>

            {/* Stage Quote Tagline */}
            <div className="p-4 bg-concrete-dark/70 border border-concrete-light font-sans text-xs italic text-fog text-center">
              &ldquo;{member.quote}&rdquo;
            </div>
          </div>

          {/* Right: Telemetry & Dossier (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header: Names & Positions */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-concrete-light bg-concrete-dark text-[11px] font-mono tracking-widest text-chrome uppercase">
                <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
                MEMBER PROFILE · 0{currentIndex + 1}
              </div>

              <div className="flex items-baseline gap-4 flex-wrap">
                <h1 className="font-bathory text-5xl sm:text-7xl font-normal tracking-wide text-white">
                  {member.name.charAt(0).toUpperCase() + member.name.slice(1).toLowerCase()}
                </h1>
                <span className="font-sans text-lg sm:text-xl text-fog font-medium">
                  {member.koreanName}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {member.positions.map((pos) => (
                  <span
                    key={pos}
                    className="px-3 py-1 bg-concrete-dark border border-concrete-light text-xs font-mono text-ash tracking-widest uppercase"
                  >
                    {pos}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-concrete-dark/90 border border-concrete-light">
                <div className="text-[10px] font-mono text-fog tracking-widest uppercase">MBTI</div>
                <div className="font-mono text-base font-bold text-white mt-1">{member.mbti}</div>
              </div>

              <div className="p-3 bg-concrete-dark/90 border border-concrete-light">
                <div className="text-[10px] font-mono text-fog tracking-widest uppercase">ZODIAC</div>
                <div className="font-mono text-base font-bold text-white mt-1">{member.zodiac}</div>
              </div>

              <div className="p-3 bg-concrete-dark/90 border border-concrete-light">
                <div className="text-[10px] font-mono text-fog tracking-widest uppercase">HEIGHT</div>
                <div className="font-mono text-base font-bold text-white mt-1">{member.height}</div>
              </div>

              <div className="p-3 bg-concrete-dark/90 border border-concrete-light">
                <div className="text-[10px] font-mono text-fog tracking-widest uppercase">BLOOD TYPE</div>
                <div className="font-mono text-base font-bold text-white mt-1">{member.bloodType || "N/A"}</div>
              </div>

              <div className="p-3 bg-concrete-dark/90 border border-concrete-light">
                <div className="text-[10px] font-mono text-fog tracking-widest uppercase">BIRTHDATE</div>
                <div className="font-mono text-xs font-bold text-white mt-1">{member.birthDate}</div>
              </div>

              <div className="p-3 bg-concrete-dark/90 border border-concrete-light">
                <div className="text-[10px] font-mono text-fog tracking-widest uppercase">BIRTHPLACE</div>
                <div className="font-mono text-xs font-bold text-white mt-1 truncate">{member.birthplace}</div>
              </div>
            </div>

            {/* Performance Affinity Indices */}
            <div className="p-4 bg-void border border-concrete-light space-y-3">
              <div className="text-xs font-mono tracking-widest text-chrome uppercase flex items-center justify-between">
                <span>SKILL METRICS</span>
                <span className="text-[10px] text-fog">THEBLACKLABEL</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                {member.stats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono border-b border-concrete-light/40 pb-1.5">
                    <span className="text-fog text-[10px]">{stat.label}</span>
                    <span className="text-chrome font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Biography Section */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs tracking-[0.25em] text-ash uppercase border-b border-concrete-light pb-2">
                BIOGRAPHY
              </h3>
              {member.bio.map((paragraph, idx) => (
                <p key={idx} className="font-sans text-sm text-fog leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Trivia Section */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs tracking-[0.25em] text-ash uppercase border-b border-concrete-light pb-2">
                FACTS & TRIVIA
              </h3>
              <ul className="space-y-2 text-xs font-mono text-chrome-dim">
                {member.trivia.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-chrome">✦</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/console"
                className="px-6 py-2.5 bg-ash text-void font-mono text-xs font-bold tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase"
              >
                LISTEN IN MEDIA CONSOLE
              </Link>
              <Link
                href={`/member/${nextMember.slug}`}
                className="px-6 py-2.5 bg-concrete-dark text-chrome font-mono text-xs tracking-widest border border-concrete-light hover:border-chrome transition-all uppercase flex items-center gap-2"
              >
                <span>NEXT: {nextMember.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
