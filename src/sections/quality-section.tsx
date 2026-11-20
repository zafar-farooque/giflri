'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Network,
  BookOpen,
  ClipboardCheck,
  Users,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const framework = [
  { icon: Network, title: 'quality.governance', desc: 'quality.governanceDesc' },
  { icon: Users, title: 'quality.faculty', desc: 'quality.facultyDesc' },
  { icon: BookOpen, title: 'quality.curriculum', desc: 'quality.curriculumDesc' },
  { icon: ClipboardCheck, title: 'quality.assessment', desc: 'quality.assessmentDesc' },
  { icon: Users, title: 'quality.studentSupport', desc: 'quality.supportDesc' },
  { icon: Shield, title: 'quality.ethics', desc: 'quality.ethicsDesc' },
  { icon: Award, title: 'quality.records', desc: 'quality.recordsDesc' },
];

const scorecard = [
  { area: 'quality.governance', score: 92, trend: 'up' },
  { area: 'quality.faculty', score: 84, trend: 'stable' },
  { area: 'quality.curriculum', score: 90, trend: 'up' },
  { area: 'quality.assessment', score: 86, trend: 'down' },
  { area: 'quality.studentSupport', score: 78, trend: 'up' },
  { area: 'quality.compliance', score: 96, trend: 'stable' },
];

const standards = [
  { title: 'quality.manual', desc: 'quality.manualDesc', version: 'v2.1', updated: '2027-01' },
  { title: 'quality.framework', desc: 'quality.frameworkDesc', version: 'v3.0', updated: '2026-11' },
  { title: 'quality.templates', desc: 'quality.templatesDesc', version: 'v1.5', updated: '2027-02' },
  { title: 'quality.guides', desc: 'quality.guidesDesc', version: 'v2.0', updated: '2027-01' },
];

const correctiveActions = [
  { id: 'CA-001', area: 'quality.studentSupport', desc: 'quality.ca1Desc', deadline: '2027-09-30', status: 'In Progress', priority: 'high' },
  { id: 'CA-002', area: 'quality.assessment', desc: 'quality.ca2Desc', deadline: '2027-10-31', status: 'Pending', priority: 'mandatory' },
  { id: 'CA-003', area: 'quality.faculty', desc: 'quality.ca3Desc', deadline: '2027-12-31', status: 'Planned', priority: 'medium' },
];

const chartData = [
  { month: 'Jan', score: 78 },
  { month: 'Feb', score: 80 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 81 },
  { month: 'May', score: 83 },
  { month: 'Jun', score: 84 },
  { month: 'Jul', score: 85 },
  { month: 'Aug', score: 86 },
  { month: 'Sep', score: 87 },
  { month: 'Oct', score: 86 },
  { month: 'Nov', score: 87 },
  { month: 'Dec', score: 87 },
];

const radarData = [
  { subject: 'quality.governance', A: 92 },
  { subject: 'quality.faculty', A: 84 },
  { subject: 'quality.curriculum', A: 90 },
  { subject: 'quality.assessment', A: 86 },
  { subject: 'quality.studentSupport', A: 78 },
  { subject: 'quality.compliance', A: 96 },
];

import { useWebsiteContent } from '@/hooks/use-website-content';

export function QualitySection() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();

  const activeFramework = content.quality.framework && content.quality.framework.length ? content.quality.framework : framework;
  const activeScorecard = content.quality.scorecard && content.quality.scorecard.length ? content.quality.scorecard : scorecard;
  const activeStandards = content.quality.standards && content.quality.standards.length ? content.quality.standards : standards;
  const activeCorrectiveActions = content.quality.correctiveActions && content.quality.correctiveActions.length ? content.quality.correctiveActions : correctiveActions;

  // Calculate dynamic average score
  const averageScore = Math.round(
    activeScorecard.reduce((acc, curr) => acc + (curr.score || 0), 0) / (activeScorecard.length || 1)
  );

  return (
    <section className="section bg-gradient-to-b from-[#062622] via-[#08332E] to-[#0A3D36] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="quality-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="quality-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quality-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{content.quality.eyebrow || t('quality.qualityAssurance')}</span>
          <h2 id="quality-title" className="section-title">{content.quality.title || t('quality.title')}</h2>
          <p className="section-subtitle">{content.quality.subtitle || t('quality.subtitle')}</p>
        </motion.div>

        {/* Framework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="section-header mb-12">
            <span className="section-eyebrow">{t('quality.framework')}</span>
            <h3 className="section-title">{t('quality.institutionalFramework')}</h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {activeFramework.map((item: any, index: number) => {
              const Icon = item.icon || (item.iconName === 'Users' ? Users : item.iconName === 'BookOpen' ? BookOpen : item.iconName === 'ClipboardCheck' ? ClipboardCheck : item.iconName === 'Shield' ? Shield : item.iconName === 'Award' ? Award : item.iconName === 'Target' ? Target : Network);
              return (
                <motion.div
                  key={item.title}
                  className="p-6 h-full group rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg hover:shadow-gold/10 transition-all duration-300 backdrop-blur-md flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-gold group-hover:text-primary transition-all duration-300 border border-gold/30 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-heading-lg font-bold text-white group-hover:text-gold transition-colors mb-2">
                    {item.title.startsWith('quality.') ? t(item.title) : item.title}
                  </h4>
                  <p className="text-ivory/70 text-body-md font-normal leading-relaxed">
                    {item.desc.startsWith('quality.') ? t(item.desc) : item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Internal Scorecard */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-12">
            <span className="section-eyebrow">{t('quality.scorecard')}</span>
            <h3 className="section-title">{t('quality.internalScorecard')}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scorecard List */}
            <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-heading-xl font-bold text-white">{t('quality.overallScore')}</h3>
                <div className="text-4xl font-bold text-gold">{averageScore}/100</div>
              </div>
              <div className="space-y-4">
                {activeScorecard.map((item: any, i: number) => (
                  <motion.div key={item.area} className="score-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-ivory/90 text-sm">{item.area.startsWith('quality.') ? t(item.area) : item.area}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gold">{item.score}%</span>
                        {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400 font-bold" />}
                        {item.trend === 'down' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                        {item.trend === 'stable' && <span className="w-4 h-4 text-ivory/40 font-bold">—</span>}
                      </div>
                    </div>
                    <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#E5C158] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-bold text-gold">{t('quality.recommendations')}</p>
                    <p className="text-ivory/80 text-sm mt-1">{t('quality.recommendationsDesc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* Trend Chart */}
              <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h4 className="font-heading text-heading-lg font-bold text-white mb-4">{t('quality.trends')}</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A227" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#C9A227" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} domain={[70, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#062622', border: '1px solid #C9A227', borderRadius: '8px', color: '#F8FAF9', fontWeight: 'bold' }} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#C9A227"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Radar Chart */}
              <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h4 className="font-heading text-heading-lg font-bold text-white mb-4">{t('quality.radarChart')}</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="100" data={radarData}>
                      <PolarGrid gridType="polygon" stroke="#ffffff20" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#E2E8F0' }} tickFormatter={(v: string) => t(v)} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                      <Radar name="Score" dataKey="A" stroke="#C9A227" fill="#C9A227" fillOpacity={0.3} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Standards Library */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-12">
            <span className="section-eyebrow">{t('quality.standardsLibrary')}</span>
            <h3 className="section-title">{t('quality.standards')}</h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {activeStandards.map((std: any, index: number) => (
              <motion.div key={std.title} className="p-6 h-full rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg transition-all backdrop-blur-md flex flex-col justify-between" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-heading-lg font-bold text-white mb-2">
                    {std.title.startsWith('quality.') ? t(std.title) : std.title}
                  </h4>
                  <p className="text-ivory/70 text-body-md mb-4 font-normal leading-relaxed">
                    {std.desc.startsWith('quality.') ? t(std.desc) : std.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gold pt-3 border-t border-white/10">
                  <span>{t('quality.version')} {std.version}</span>
                  <span className="text-ivory/50">{t('quality.updated')} {std.updated}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Corrective Actions */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-8">
            <span className="section-eyebrow">{t('quality.correctiveActions')}</span>
            <h3 className="section-title">{t('quality.correctiveActionsTitle')}</h3>
          </div>

          <motion.div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    {['quality.id', 'quality.area', 'quality.description', 'quality.deadline', 'quality.status', 'quality.priority'].map((header) => (
                      <th key={header} className="px-6 py-4 text-xs font-bold text-gold uppercase tracking-wider">{t(header)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeCorrectiveActions.map((action: any, index: number) => (
                    <motion.tr key={action.id} className="hover:bg-white/[0.03] transition-colors" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                      <td className="px-6 py-4 font-mono text-sm font-bold text-gold">{action.id}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{action.area.startsWith('quality.') ? t(action.area) : action.area}</td>
                      <td className="px-6 py-4 text-sm text-ivory/70 max-w-xs truncate">{action.desc.startsWith('quality.') ? t(action.desc) : action.desc}</td>
                      <td className="px-6 py-4 text-sm text-ivory/60 font-medium">{new Date(action.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-6 py-4">
                        <span className={cn('px-3 py-1 rounded-full text-xs font-bold border', action.status === 'In Progress' ? 'bg-gold/15 text-gold border-gold/30' : action.status === 'Pending' ? 'bg-white/[0.06] text-ivory/80 border-white/10' : 'bg-blue-500/15 text-blue-300 border-blue-400/30')}>
                          {action.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('px-3 py-1 rounded-full text-xs font-bold border', action.priority === 'mandatory' ? 'bg-rose-500/15 text-rose-300 border-rose-400/30' : action.priority === 'high' ? 'bg-amber-500/15 text-amber-300 border-amber-400/30' : 'bg-blue-500/15 text-blue-300 border-blue-400/30')}>
                          {action.priority}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Excellence Recognition */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-12">
            <span className="section-eyebrow">{content.quality.auditBadge || t('quality.excellence')}</span>
            <h3 className="section-title">{t('quality.excellenceRecognition')}</h3>
            <p className="section-subtitle">{t('quality.neverPayToWin')}</p>
          </div>

          <motion.div className="p-8 md:p-12 text-center rounded-3xl bg-white/[0.04] border border-gold/30 shadow-2xl backdrop-blur-md" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#B48A1B] to-[#CF9E20] text-[#062622] flex items-center justify-center shadow-lg shadow-gold/20">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-heading-xl font-bold text-white mb-4">{t('quality.criteriaBased')}</h3>
            <p className="text-ivory/80 text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">{t('quality.criteriaDesc')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-white/[0.06] text-gold border border-gold/30 text-xs sm:text-sm font-bold">{t('quality.criterion1')}</span>
              <span className="px-4 py-2 rounded-full bg-white/[0.06] text-gold border border-gold/30 text-xs sm:text-sm font-bold">{t('quality.criterion2')}</span>
              <span className="px-4 py-2 rounded-full bg-white/[0.06] text-gold border border-gold/30 text-xs sm:text-sm font-bold">{t('quality.criterion3')}</span>
              <span className="px-4 py-2 rounded-full bg-white/[0.06] text-gold border border-gold/30 text-xs sm:text-sm font-bold">{t('quality.criterion4')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}