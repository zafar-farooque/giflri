import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  X,
  Calendar,
  MapPin,
  Building2,
  Mail,
  User,
  Phone,
  Globe,
  CheckCircle2,
  Sparkles,
  Ticket,
  Copy,
  Check,
  Radio,
  Send,
  Loader2,
  Users
} from 'lucide-react';
import { EventItem, EventRegistration } from '@/types';
import { cn } from '@/lib/utils';

interface EventRegistrationModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (registeredEventId: string | number) => void;
}

export function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onSuccess,
}: EventRegistrationModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Academic Faculty / Professor');
  const [country, setCountry] = useState(event?.country || 'United Arab Emirates');
  const [attendanceType, setAttendanceType] = useState<'In-Person' | 'Virtual'>('In-Person');
  const [specialRequests, setSpecialRequests] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationResult, setRegistrationResult] = useState<EventRegistration | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Please provide both your Full Name and Official Email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          organization: organization.trim(),
          role,
          country: country.trim() || event.country,
          attendanceType,
          specialRequests: specialRequests.trim(),
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setRegistrationResult(data.data);
        if (onSuccess) {
          onSuccess(event.id);
        }
      } else {
        setError(data.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err: any) {
      console.error('Registration Error:', err);
      setError('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (registrationResult?.registrationCode) {
      navigator.clipboard.writeText(registrationResult.registrationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setRegistrationResult(null);
    setError(null);
    setName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setSpecialRequests('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#041E1A] border border-gold/40 rounded-3xl shadow-2xl overflow-hidden my-8 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Top Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-gold to-yellow-400" />

          {/* Close Button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-gold transition-colors border border-white/10 z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!registrationResult ? (
            /* Registration Form View */
            <div className="p-6 sm:p-8">
              {/* Event Badge & Title */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-[11px] font-bold uppercase tracking-wider">
                    {event.type} Registration
                  </span>
                  <span className="text-xs text-emerald-300/80 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    {(event.attendeesCount || 0) + 1} Seats Confirmed
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug">
                  {event.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200/80 mt-2.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold" />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString('en-US', { day: 'numeric' })}`}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold" />
                    {event.city}, {event.country}
                  </span>
                </div>
              </div>

              {/* Error Message if any */}
              {error && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. / Prof. / Mr. / Ms. Your Name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#062923] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                      Official Email <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@institution.org"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#062923] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                      Mobile / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#062923] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                      University / Institution
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Dubai Islamic Academy / KAU"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#062923] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Role & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                      Delegate Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#062923] border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="Academic Faculty / Professor">Academic Faculty / Professor</option>
                      <option value="Postgraduate / Student Researcher">Postgraduate / Student Researcher</option>
                      <option value="Islamic Banking / FinTech Executive">Islamic Banking / FinTech Executive</option>
                      <option value="Shariah Compliance & Quality Officer">Shariah Compliance & Quality Officer</option>
                      <option value="Institutional Delegate / Dean">Institutional Delegate / Dean</option>
                      <option value="General Academic Attendee">General Academic Attendee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                      Country of Residence
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="United Arab Emirates / Saudi Arabia"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#062923] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Attendance Mode Selection */}
                <div>
                  <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                    Attendance Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendanceType('In-Person')}
                      className={cn(
                        'flex flex-col items-start p-3 rounded-2xl border text-left transition-all',
                        attendanceType === 'In-Person'
                          ? 'bg-gold/15 border-gold text-white shadow-md'
                          : 'bg-[#062923] border-white/10 text-white/70 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                        <span className={cn('w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center', attendanceType === 'In-Person' ? 'border-gold bg-gold' : 'border-white/40')} />
                        🏢 In-Person Attendance
                      </div>
                      <span className="text-[11px] text-emerald-200/60 mt-1 pl-5">
                        On-site seat & official badge
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendanceType('Virtual')}
                      className={cn(
                        'flex flex-col items-start p-3 rounded-2xl border text-left transition-all',
                        attendanceType === 'Virtual'
                          ? 'bg-gold/15 border-gold text-white shadow-md'
                          : 'bg-[#062923] border-white/10 text-white/70 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                        <span className={cn('w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center', attendanceType === 'Virtual' ? 'border-gold bg-gold' : 'border-white/40')} />
                        💻 Virtual Live Webcast
                      </div>
                      <span className="text-[11px] text-emerald-200/60 mt-1 pl-5">
                        Interactive stream & digital pass
                      </span>
                    </button>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1.5">
                    Research Questions / Dietary / Special Inquiries (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any specific academic questions or conference accessibility requirements..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#062923] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-xs sm:text-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs sm:text-sm border border-white/10 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-emerald-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-gold/20 flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm & Register</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Registration Confirmed Success View */
            <div className="p-6 sm:p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-gold text-emerald-950 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-gold/20"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Recorded in GIFLRI Database Registry</span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white">
                Registration Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/75 mt-1 max-w-md mx-auto">
                Thank you, <strong>{registrationResult.name}</strong>. Your seat for <strong>{registrationResult.eventTitle}</strong> has been secured in the database.
              </p>

              {/* Verified Digital Pass Card */}
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#062D27] to-[#031C18] border border-gold/40 shadow-xl text-left relative overflow-hidden">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block">
                      Official Participant Pass
                    </span>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {registrationResult.eventTitle}
                    </h4>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-gold/20 text-gold border border-gold/40 text-xs font-extrabold uppercase">
                    {registrationResult.attendanceType}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-ivory/60 block uppercase font-bold">Delegate</span>
                    <span className="text-white font-semibold">{registrationResult.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ivory/60 block uppercase font-bold">Email</span>
                    <span className="text-white font-semibold truncate block">{registrationResult.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ivory/60 block uppercase font-bold">Organization</span>
                    <span className="text-white font-semibold">{registrationResult.organization || 'Independent Scholar'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ivory/60 block uppercase font-bold">Role</span>
                    <span className="text-white font-semibold">{registrationResult.role}</span>
                  </div>
                </div>

                {/* Pass Code Box */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between bg-black/30 p-3 rounded-xl border border-emerald-500/20">
                  <div>
                    <span className="text-[10px] text-emerald-300/70 block uppercase font-bold">Pass Code</span>
                    <span className="font-mono font-extrabold text-sm sm:text-base text-gold tracking-wider">
                      {registrationResult.registrationCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 text-xs font-bold transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-emerald-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-gold/20 transition-all"
                >
                  Done & Return
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EventRegistrationModal;
