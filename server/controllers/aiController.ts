import { Request, Response } from 'express';
import { DB } from '../db/db';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Generate contextual system knowledge base prompt from live DB
function generateSystemContext(mode: string): string {
  const programs = DB.getPrograms();
  const institutions = DB.getInstitutions().filter(i => i.name && i.name.length > 5 && !i.name.toLowerCase().includes('efdsfa'));
  const researchPapers = DB.getResearchPapers();
  const events = DB.getEvents();
  const experts = DB.getExperts();

  const programsSummary = programs
    .slice(0, 10)
    .map((p) => `• [${p.id}] "${p.title}" (${p.category} | ${p.level} | ${p.mode} | ${p.hours})`)
    .join('\n');

  const institutionsSummary = institutions
    .slice(0, 8)
    .map((i) => `• [${i.giflriId}] ${i.name} (${i.city}, ${i.country} - ${i.status})`)
    .join('\n');

  const papersSummary = researchPapers
    .slice(0, 6)
    .map((r) => `• "${r.title}" by ${r.authors} (${r.journal} - DOI: ${r.doi})`)
    .join('\n');

  const eventsSummary = events
    .slice(0, 5)
    .map((e) => `• ${e.title} (${e.date} at ${e.city}, ${e.country})`)
    .join('\n');

  const expertsSummary = experts
    .slice(0, 6)
    .map((ex) => `• ${ex.name} - ${ex.role} (${ex.country})`)
    .join('\n');

  return `You are "Ask GIFLRI", the premier AI Knowledge & Academic Intelligence Assistant for the Global Islamic Finance & Language Research Institution (GIFLRI).

CORE INSTITUTIONAL IDENTITY:
GIFLRI is an international standards-setting body headquartered in Dubai International Academic City (UAE), operating across 59 countries with 200+ accredited institutions, 400+ standardized curricula, and 150+ expert scholars. GIFLRI sets global quality standards aligned with ISO 9001 and AAOIFI for Islamic Banking, Fiqh al-Muamalat, Arabic Computational Linguistics, and Shariah FinTech.

ACTIVE OPERATING MODE: "${mode.toUpperCase()}"
- Student Mode: Advise students & scholars on standardized diploma curricula, admission prerequisites, CEFR-Arabiyya levels, and verifiable certificates.
- Institution Mode: Guide university deans and registrars on the 8-domain quality assurance scorecard, affiliation steps, annual inspection audits, and fee schedules.
- Researcher Mode: Assist scholars with DOI citations, working papers, Islamic FinTech Observatory indicators, and scholar peer-review networks.

LIVE KNOWLEDGE BASE SUMMARY:
Programs:
${programsSummary}

Accredited Institutions:
${institutionsSummary}

Recent Research Publications:
${papersSummary}

Upcoming Conferences:
${eventsSummary}

Distinguished Scholars:
${expertsSummary}

COMMUNICATION INSTRUCTIONS:
1. Always be polite, scholarly, precise, and encouraging. Use traditional Islamic greetings (e.g. "Assalamu Alaikum wa Rahmatullahi wa Barakatuh") when greeted.
2. If the user asks in Hindi/Hinglish/Urdu, reply in helpful Hindi/Hinglish/Urdu! If in Arabic, reply in Arabic! If in English, reply in English!
3. Ground your answers in GIFLRI standards, Fiqh al-Muamalat principles (elimination of Riba, Gharar, Maysir), and AAOIFI standards.
4. Provide structured responses using bold keywords, bullet points, and actionable next steps with relevant portal links (e.g., /programs, /affiliation/apply, /verify, /research, /events).
5. Never provide generic or unhelpful answers. Always address the exact question with depth and clarity.`;
}

// Fallback Dynamic Intelligent Rule-Based Engine
function generateSmartFallbackResponse(userPrompt: string, mode: string): string {
  const q = userPrompt.toLowerCase().trim();
  const programs = DB.getPrograms();
  const institutions = DB.getInstitutions();
  const papers = DB.getResearchPapers();
  const events = DB.getEvents();
  const experts = DB.getExperts();

  // 1. Hindi / Hinglish Inquiries
  if (
    q.includes('kya hai') ||
    q.includes('kaise') ||
    q.includes('batao') ||
    q.includes('namaste') ||
    q.includes('karo') ||
    q.includes('admission') ||
    q.includes('fees') ||
    q.includes('course') ||
    q.includes('padhai') ||
    q.includes('shuru')
  ) {
    if (q.includes('fee') || q.includes('paisa') || q.includes('kharcha')) {
      return `**GIFLRI Programs & Affiliation Fee Structure:**

1. **Academic Programs & Diplomas:**
   • **Executive Diplomas & Master's:** $800 – $2,500 (flexible installments available).
   • **Professional Certificates:** $350 – $600.
   • **Scholarships:** Up to 50% merit-based financial aid for deserving students.

2. **Institutional Affiliation Fees:**
   • **Application & Initial Audit:** $2,500
   • **Quality Assurance Review:** $1,500
   • **Annual Registry Maintenance:** $1,200

Aap direct application portal **/affiliation/apply** par jakar ya programs list **/programs** par details dekh sakte hain.`;
    }

    if (q.includes('course') || q.includes('program') || q.includes('diploma')) {
      const progList = programs.slice(0, 4).map(p => `• **${p.title}** (${p.level} • ${p.hours} • ${p.mode})`).join('\n');
      return `**GIFLRI ke Pramukh Standardized Courses & Programs:**

${progList}

• **Islamic Finance Track:** Shariah Auditing, Sukuk Structuring, Takaful Underwriting, Islamic FinTech.
• **Arabic & Languages Track:** CEFR-Arabiyya Certification, Legal Translation, Computational NLP.
• **Research Track:** Doctoral Fellowships, Macroeconomics & Waqf Models.

Aap poori list **/programs** page par dekh kar filter aur apply kar sakte hain!`;
    }

    return `Assalamu Alaikum! GIFLRI (Global Islamic Finance & Language Research Institution) me aapka swagat hai.

Mai aapko nimnlikhit vishayon me poori jankari de sakta hoon:
1. **Academic Programs & Admission**: Islamic Finance, Arabic Language, aur Shariah FinTech courses (Check: **/programs**).
2. **Institutional Affiliation & ISO Accreditation**: Colleges aur Universities ke liye accreditation process (Check: **/affiliation**).
3. **Certificate Verification**: Cryptographic registry lookup (Check: **/verify**).
4. **Research Papers & Journals**: Peer-reviewed publications aur Observatory data (Check: **/research**).

Aap kis vishay par vistaar se janna chahte hain?`;
  }

  // 2. Greetings & Introductions
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'salam' ||
    q.includes('assalam') ||
    q.includes('hey') ||
    q.includes('good morning') ||
    q.includes('good evening')
  ) {
    if (mode === 'institution') {
      return `Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! Welcome to the **GIFLRI Institutional Accreditation Advisory**.

I can assist your university, college, or training academy with:
• **8-Domain Quality Assurance Scorecard** (ISO 9001 & AAOIFI aligned).
• **Accreditation Readiness Assessment & On-Site Audits**.
• **Curriculum Standardization & Institutional Registry Lookup**.

To initiate your institutional pathway, explore **/affiliation/apply** or ask me any specific question regarding audit criteria and fees!`;
    } else if (mode === 'researcher') {
      return `Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! Welcome to the **GIFLRI Research Directorate & Observatory**.

I can assist your scholarly inquiry with:
• **Peer-Reviewed Publications & DOI Citations** in Fiqh al-Muamalat and Islamic Macroeconomics.
• **Islamic FinTech Observatory 2026** real-time macroeconomic indicators.
• **Global Scholar Network & Visiting Fellowships**.

Feel free to ask for papers on Sukuk, Takaful, ESG FinTech, or Semitic NLP!`;
    }

    return `Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! Welcome to **Ask GIFLRI** — your intelligent academic and Shariah governance assistant.

How may I assist your educational journey today?
• 📚 **Academic Curricula & Diplomas** (/programs)
• 🏛️ **University Affiliation & Accreditation** (/affiliation)
• 📜 **Verifiable Cryptographic Credentials** (/verify)
• 🔬 **Research Directorate & Working Papers** (/research)
• 🌐 **Global Scholar Network & Events** (/experts, /events)`;
  }

  // 3. Programs & Courses
  if (
    q.includes('program') ||
    q.includes('course') ||
    q.includes('degree') ||
    q.includes('diploma') ||
    q.includes('master') ||
    q.includes('curriculum') ||
    q.includes('syllabus') ||
    q.includes('study')
  ) {
    let matched = programs;
    if (q.includes('fintech') || q.includes('tech') || q.includes('crypto')) {
      matched = programs.filter(p => p.category.toLowerCase().includes('fintech') || p.title.toLowerCase().includes('fintech'));
    } else if (q.includes('arabic') || q.includes('language')) {
      matched = programs.filter(p => p.category.toLowerCase().includes('arabic') || p.category.toLowerCase().includes('language'));
    } else if (q.includes('research') || q.includes('phd') || q.includes('doctor')) {
      matched = programs.filter(p => p.category.toLowerCase().includes('research') || p.level.toLowerCase().includes('doctor'));
    }

    const list = (matched.length ? matched.slice(0, 4) : programs.slice(0, 4))
      .map(
        (p) =>
          `• **${p.title}**\n  - Level: ${p.level} | Mode: ${p.mode} | Duration: ${p.hours}\n  - Focus: ${p.description.slice(0, 110)}...`
      )
      .join('\n\n');

    return `**GIFLRI Standardized Academic Programs & Curricula:**

${list}

**Accreditation Standards:**
All programs are standardized under **AAOIFI Shariah Governance Standards** and **ISO 9001 Quality Frameworks**. Each enrolled candidate receives a verifiable cryptographic ID upon completion.

Explore full course syllabi, prerequisites, and registration details on the [Programs Directory](/programs).`;
  }

  // 4. Affiliation, Quality & Accreditation
  if (
    q.includes('affiliat') ||
    q.includes('accredit') ||
    q.includes('join') ||
    q.includes('quality') ||
    q.includes('scorecard') ||
    q.includes('audit') ||
    q.includes('institution') ||
    q.includes('university')
  ) {
    const instList = institutions.slice(0, 3).map(i => `• **${i.name}** (${i.city}, ${i.country}) — Registry ID: \`${i.giflriId}\``).join('\n');

    return `**GIFLRI Institutional Affiliation & Accreditation Pathway:**

To receive international recognition, educational institutions undergo a structured 4-step accreditation review:

1. **Institutional Profile Submission:** Submit your organization profile, state license, and academic catalog via **/affiliation/apply**.
2. **8-Domain Quality Assurance Scorecard:** Self-assessment across Governance, Faculty Rigor, Standardized Curriculum, Examinations, Infrastructure, Student Welfare, Ethical Standards, and Record-keeping.
3. **Peer Review & Verification Audit:** The GIFLRI Quality Directorate reviews curriculum alignment with AAOIFI standards.
4. **Accreditation Seal & Cryptographic Registry:** Upon approval, your institution is entered into the Global Directory with an official verifiable QR code badge.

**Currently Accredited Institutions (Sample):**
${instList}

Ready to begin? Visit the [Affiliation Hub](/affiliation) or download the compliance framework.`;
  }

  // 5. Verification & Certificates
  if (
    q.includes('verify') ||
    q.includes('certificate') ||
    q.includes('diploma check') ||
    q.includes('qr') ||
    q.includes('lookup') ||
    q.includes('credential') ||
    q.includes('fraud') ||
    q.includes('tamper')
  ) {
    return `**GIFLRI Public Registry & Credential Verification:**

Every certificate and accreditation badge issued by GIFLRI and its 200+ partner universities is embedded with an anti-tamper cryptographic registry hash.

**How to Verify Any Credential:**
1. Navigate to the public [Registry Verification Portal](/verify).
2. Enter the **Certificate Number** (e.g. \`GIFLRI-1002\`) or **Student ID** (e.g. \`STD-2027-8902\`).
3. Instantly review official issuance dates, verified honors/grades, accredited institution stamps, and AAOIFI compliance status.

You can also scan the physical QR code on any official parchment to open the verified ledger entry.`;
  }

  // 6. Research, Publications & Observatory
  if (
    q.includes('research') ||
    q.includes('paper') ||
    q.includes('journal') ||
    q.includes('doi') ||
    q.includes('observatory') ||
    q.includes('sukuk') ||
    q.includes('takaful') ||
    q.includes('fintech data') ||
    q.includes('macroeconomic')
  ) {
    const paperList = papers.slice(0, 3).map(p => `• **"${p.title}"**\n  - Authors: ${p.authors} (${p.year})\n  - Journal: ${p.journal} | DOI: \`${p.doi}\``).join('\n\n');

    return `**GIFLRI Research Directorate & Intelligence Observatory:**

Our scholarly wing publishes original, double-blind peer-reviewed literature bridging classical Islamic jurisprudence with modern econometrics.

**Featured Publications:**
${paperList}

**Global Observatory 2026:**
• Global Islamic Assets: **$4.5 Trillion** (+14.8% YoY growth).
• Digital Sandbox hubs operating in UAE, Malaysia, Saudi Arabia, Bahrain, and Türkiye.
• Access interactive charts and reports on the [Global Observatory](/observatory) and [Research Hub](/research).`;
  }

  // 7. Arabic Language & Linguistics
  if (
    q.includes('arabic') ||
    q.includes('language') ||
    q.includes('sarf') ||
    q.includes('nahw') ||
    q.includes('balagha') ||
    q.includes('linguistics') ||
    q.includes('cefr')
  ) {
    return `**GIFLRI Pillar III: Arabic Language & Linguistics Standardization:**

GIFLRI establishes international benchmark criteria for Classical and Contemporary Arabic pedagogy:

• **CEFR-Arabiyya Standardized Framework:** Structured proficiency tiers (A1 to C2) covering Syntax (*Nahw*), Morphology (*Sarf*), and Rhetoric (*Balagha*).
• **Semitic NLP & Computational Corpora:** Open machine-readable corpora for AI models, automated morphological taggers, and Shariah legal text analysis.
• **Accredited Programs:**
  - *Arabic NLP & Corpus Engineering Diploma* (620 Hours)
  - *Professional Bilingual Legal & Shariah Translation* (280 Hours)
  - *Classical Arabic Syntax & Morphology Pedagogy* (420 Hours)

Explore linguistic curricula on the [Programs Directory](/programs).`;
  }

  // 8. Conferences, Summits & Events
  if (
    q.includes('event') ||
    q.includes('conference') ||
    q.includes('summit') ||
    q.includes('webinar') ||
    q.includes('workshop') ||
    q.includes('gifc')
  ) {
    const evList = events.slice(0, 3).map(e => `• **${e.title}**\n  - Date: ${e.date} | Location: ${e.city}, ${e.country}\n  - Theme: ${e.theme}`).join('\n\n');

    return `**Upcoming GIFLRI International Conferences & Summits:**

${evList}

Scholars, institutional delegates, and graduate candidates can register directly on the [Events Directory](/events). Early-bird academic concessions are available for affiliated institutions.`;
  }

  // 9. Scholars & Experts Network
  if (
    q.includes('expert') ||
    q.includes('scholar') ||
    q.includes('professor') ||
    q.includes('faculty') ||
    q.includes('tariq') ||
    q.includes('bilal') ||
    q.includes('sheikh')
  ) {
    const expList = experts.slice(0, 3).map(ex => `• **${ex.name}** (${ex.country})\n  - Role: ${ex.role} • ${ex.giflriRole}\n  - Fields: ${ex.fields?.join(', ')}`).join('\n\n');

    return `**GIFLRI Global Scholar & Expert Network:**

Our advisory council comprises 150+ leading Shariah jurists, financial economists, and computational linguists across 59 nations.

**Distinguished Faculty & Referees:**
${expList}

Explore complete scholar biographies, publications, and supervised curricula on the [Experts Directory](/experts).`;
  }

  // Default Contextual Comprehensive Guide
  return `**Welcome to Ask GIFLRI — Academic & Shariah Governance Intelligence**

I am ready to assist your query regarding:

1. **Standardized Programs & Curricula (/programs):** Master's degrees, executive diplomas, and professional certificates in Islamic Banking, Sukuk Structuring, Arabic NLP, and FinTech.
2. **Institutional Affiliation & ISO Audits (/affiliation):** 8-domain quality assurance guidelines for universities, colleges, and training academies.
3. **Public Registry Credential Verification (/verify):** Instant cryptographic diploma and accreditation checks.
4. **Scholarly Research & Observatory (/research, /observatory):** Peer-reviewed DOIs, macroeconomic growth indicators, and green Sukuk standards.
5. **Global Scholar Network & Events (/experts, /events):** Upcoming conferences (GIFC 2027), faculty CPD points, and visiting scholar grants.

Please ask any specific question or describe your institutional or student goals!`;
}

export async function handleAIChat(req: Request, res: Response) {
  try {
    const { messages, mode = 'student' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content || '';

    // If Gemini API Key is provided, attempt to call Gemini API
    if (GEMINI_API_KEY && GEMINI_API_KEY.trim().length > 10 && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
      try {
        const systemPrompt = generateSystemContext(mode);
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY.trim()}`;

        const payload = {
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        };

        const apiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (apiRes.ok) {
          const apiData = await apiRes.json();
          const candidateText =
            apiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (candidateText.trim()) {
            return res.status(200).json({
              success: true,
              content: candidateText.trim(),
              role: 'assistant',
              mode,
              source: 'gemini',
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, switching to Smart Knowledge Engine:', geminiErr);
      }
    }

    // Dynamic High-Fidelity Smart Knowledge Engine
    const smartResponse = generateSmartFallbackResponse(userPrompt, mode);

    return res.status(200).json({
      success: true,
      content: smartResponse,
      role: 'assistant',
      mode,
      source: 'giflri-neural-engine',
    });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process AI chat request',
    });
  }
}
