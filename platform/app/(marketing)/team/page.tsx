import { getTeam } from "@/lib/api/team"
import { FadeInView } from "@/components/shared/FadeInView"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { User } from "lucide-react"
import Image from "next/image"

export default async function TeamPage() {
  const team = await getTeam()

  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <FadeInView>
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-500">
            The Visionaries
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Meet the researchers and engineering minds building the future of autonomous infrastructure for Smart City 2026.
          </p>
        </div>
      </FadeInView>

      <FadeInView delay={0.2}>
        <div className="mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-wider uppercase text-center">Project Supervisors</h2>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <GlassPanel className="p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] group cursor-default">
              <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-[3px] border-cyan-500/40 relative group-hover:border-cyan-400 transition-colors duration-500 shadow-lg shadow-cyan-500/20">
                <Image 
                  src="/images/supervisors/dr_osama.jpg" 
                  alt="Prof. Dr. Osama El-Nahhas" 
                  fill 
                  sizes="112px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-cyan-300 transition-colors">Prof. Dr. Osama El-Nahhas</h3>
                <p className="text-sm font-medium text-cyan-400/90 uppercase tracking-widest bg-cyan-500/10 inline-block px-3 py-1 rounded-full border border-cyan-500/20">Lead Supervisor</p>
              </div>
            </GlassPanel>
            
            <GlassPanel className="p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-transparent hover:border-indigo-400/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] group cursor-default">
              <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-[3px] border-indigo-500/40 relative group-hover:border-indigo-400 transition-colors duration-500 shadow-lg shadow-indigo-500/20">
                <Image 
                  src="/images/supervisors/eng_fayoumi.jpg" 
                  alt="Eng. Mohamed El-Fayoumi" 
                  fill 
                  sizes="112px"
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-indigo-300 transition-colors">Eng. Mohamed El-Fayoumi</h3>
                <p className="text-sm font-medium text-indigo-400/90 uppercase tracking-widest bg-indigo-500/10 inline-block px-3 py-1 rounded-full border border-indigo-500/20">Co-Supervisor</p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </FadeInView>

      <div className="mb-10 flex items-center justify-center gap-4">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-cyan-500/50" />
        <h2 className="text-2xl font-bold text-cyan-400 tracking-widest uppercase">Team Leaders</h2>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-cyan-500/50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
        {team.filter(m => m.role === 'Team Leader').map((member, i) => (
          <FadeInView key={`leader-${i}`} delay={(i % 4) * 0.1}>
            <GlassPanel className="p-6 h-full flex flex-col items-center justify-center text-center group border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.4)] cursor-default bg-cyan-500/5">
              <h3 className="font-bold text-lg mb-2 text-white/90 group-hover:text-white transition-colors">{member.name}</h3>
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">{member.role}</p>
            </GlassPanel>
          </FadeInView>
        ))}
      </div>

      <div className="mb-10 flex items-center justify-center gap-4">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/20" />
        <h2 className="text-2xl font-bold text-white/90 tracking-widest uppercase">Engineering Team</h2>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.filter(m => m.role !== 'Team Leader').map((member, i) => (
          <FadeInView key={`member-${i}`} delay={(i % 4) * 0.1}>
            <GlassPanel className="p-5 h-full flex flex-col items-center justify-center text-center group hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-default">
              <h3 className="font-bold text-[15px] mb-1 text-white/80 group-hover:text-white transition-colors">{member.name}</h3>
              <p className="text-[11px] font-medium text-white/40 group-hover:text-cyan-400/80 transition-colors uppercase tracking-widest">{member.role}</p>
            </GlassPanel>
          </FadeInView>
        ))}
      </div>
    </div>
  )
}
