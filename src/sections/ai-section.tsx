'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Bot,
  GraduationCap,
  Building2,
  Microscope,
  Send,
  Loader2,
  Sparkles,
  Shield,
  FileText,
  Globe,
  Menu,
  X,
  Copy,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';

const MODES = [
  {
    id: 'student',
    icon: GraduationCap,
    label: 'ai.studentMode',
    desc: 'ai.studentDesc',
    example: 'ai.studentExample',
    color: 'emerald',
    bgColor: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'institution',
    icon: Building2,
    label: 'ai.institutionMode',
    desc: 'ai.institutionDesc',
    example: 'ai.institutionExample',
    color: 'gold',
    bgColor: 'from-gold-500 to-gold-600',
  },
  {
    id: 'researcher',
    icon: Microscope,
    label: 'ai.researcherMode',
    desc: 'ai.researcherDesc',
    example: 'ai.researcherExample',
    color: 'blue',
    bgColor: 'from-blue-500 to-blue-600',
  },
];

const responses = {
  student: [
    'Based on your B.Com background, I recommend the **Diploma in Islamic Finance** (600 hours, blended) or **Professional Certificate in Islamic Banking** (150 hours, online). Both accept business/commerce graduates. Would you like program details or eligibility criteria?',
    'For Arabic language, the **Arabic Level A1–B2** program is perfect for beginners. It\'s 200 hours online with live sessions. Would you like to know about scholarships?',
    'The **Executive Program in Islamic FinTech** (80 hours, online) is ideal for professionals wanting to upskill. It covers blockchain, digital payments, and Shariah compliance.',
  ],
  institution: [
    'For affiliation from India, you need: 1) Legal registration docs, 2) Faculty CVs with qualifications, 3) Curriculum mapping to GIFLRI standards, 4) Infrastructure evidence, 5) Quality assurance policies. The **Eligibility Check** tool can pre-validate your readiness.',
    'The affiliation process takes 4-6 months. Fees: Application $2,500, Quality Review $1,500, Inspection $3,000 (if applicable). Total: ~$7,000. Renewal is annual with compliance submission.',
    'GIFLRI standards cover: Governance, Faculty, Curriculum, Assessment, Student Support, Ethics, Records. You\'ll need documented policies for each area.',
  ],
  researcher: [
    'Recent GIFLRI papers on Sukuk risk: 1) "Sukuk Risk Management in Volatile Markets" (Ahmed et al., 2027), 2) "Sukuk Structuring under Shariah Governance" (Hassan, 2026), 3) "Green Sukuk for Climate Finance" (Policy Brief, 2027). Access via Research → Publications or the Observatory.',
    'For Islamic FinTech research, check the **Islamic FinTech Observatory** for real-time data on startup count, investment volume, regulatory sandboxes, and digital adoption metrics across 59 countries.',
    'The **Expert Network** has 150+ scholars. Filter by field (Islamic Finance, Arabic Language, Research), country, or GIFLRI role. Each profile shows publications, courses, and conferences.',
  ],
};

const formatMessage = (content: string) => {
  return content.split('\n').map((line, i) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
    const cleanLine = isBullet ? trimmed.substring(2) : line;

    // Parse bold markdown format: **text**
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(cleanLine)) !== null) {
      if (match.index > lastIndex) {
        parts.push(cleanLine.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-bold text-primary dark:text-gold">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < cleanLine.length) {
      parts.push(cleanLine.substring(lastIndex));
    }

    const elementContent = parts.length > 0 ? parts : cleanLine;

    if (isBullet) {
      return (
        <li key={i} className="list-disc ml-5 mb-1 last:mb-2 text-ink/80 dark:text-ivory/80">
          {elementContent}
        </li>
      );
    }

    return (
      <p key={i} className="mb-2 last:mb-0">
        {elementContent}
      </p>
    );
  });
};

export function AskGIFLRISection() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'student' | 'institution' | 'researcher'>('student');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Assalamu alaikum! I\'m Ask GIFLRI — your guide to Islamic finance education, affiliation, and research. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    const updatedMessages = [...messages, { role: 'user', content: userMsg } as const];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          mode: mode,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${err.message || 'Unknown error'}. Please verify that GEMINI_API_KEY is properly set in your .env.local file.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentMode = MODES.find(m => m.id === mode)!;

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="ai-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ai-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('ai.askGIFLRI')}</span>
          <h2 id="ai-title" className="section-title">{t('ai.title')}</h2>
          <p className="section-subtitle">{t('ai.subtitle')}</p>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {MODES.map((m) => (
            <motion.button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={cn(
                'mode-btn flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 flex-1 min-w-[280px] backdrop-blur-md shadow-lg',
                mode === m.id
                  ? 'bg-white/[0.08] border-2 border-gold text-white shadow-gold/20'
                  : 'bg-white/[0.04] text-ivory/70 hover:bg-white/[0.06] border border-white/10 hover:border-gold/30'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-transform',
                mode === m.id
                  ? 'bg-gold text-[#062622] border-gold font-bold scale-105'
                  : 'bg-gold/15 text-gold border-gold/30'
              )}>
                <m.icon className="w-7 h-7" />
              </div>
              <h4 className="font-heading text-heading-md font-bold text-white">{t(m.label)}</h4>
              <p className="text-sm text-ivory/70 text-center max-w-xs">{t(m.desc)}</p>
              <p className="text-xs text-gold/80 italic max-w-xs text-center mt-2">"{t(m.example)}"</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="chat-card rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="chat-header p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gold text-[#062622] font-bold shadow-sm">
                  <currentMode.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white">
                    {t('ai.title')} — {t(currentMode.label)}
                  </h4>
                  <p className="text-xs text-ivory/60">
                    {t(currentMode.desc)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-xs font-bold text-gold">{t('ai.secure')}</span>
              </div>
            </div>

            <div ref={chatContainerRef} className="chat-messages p-4 md:p-6" style={{ maxHeight: 500, overflowY: 'auto' }} role="log" aria-live="polite">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      'message mb-4',
                      msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={cn(
                      'message-bubble max-w-[85%] px-4 py-3 rounded-2xl shadow-md leading-relaxed text-sm',
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-semibold rounded-br-md'
                        : 'bg-white/[0.06] text-ivory rounded-bl-md border border-white/10'
                    )}>
                      <div className="prose prose-sm prose-invert max-w-none">
                        {formatMessage(msg.content)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div key="loading" className="message flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="message-bubble bg-white/[0.06] text-ivory px-4 py-3 rounded-2xl rounded-bl-md border border-white/10 flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gold"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gold"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gold"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="chat-input p-4 md:p-5 border-t border-white/10 bg-white/[0.02]">
              <div className="input-group flex gap-2">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('ai.placeholder')}
                  className="flex-1 bg-[#062622] border border-white/15 text-white placeholder:text-white/40 focus:border-gold focus:outline-none rounded-xl p-3 resize-none min-h-[50px] max-h-[150px] text-sm"
                  disabled={loading}
                  rows={1}
                />
                <motion.button
                  className="px-4 rounded-xl bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-bold shadow-md hover:brightness-110 flex items-center justify-center transition-all"
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
              <p className="text-center text-xs text-ivory/50 mt-3">
                <Info className="w-3.5 h-3.5 inline mr-1 text-gold" />
                {t('ai.shariahNote')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { AskGIFLRISection as AISection };