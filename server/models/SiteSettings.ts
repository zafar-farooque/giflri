import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  siteTitle: string;
  siteTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryLink: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryLink: string;
  heroStats: Record<string, any>;
  announcement: Record<string, any>;
  contactEmail: string;
  contactPhone: string;
  headquartersAddress: string;
  copyrightText: string;
  socialLinks: Record<string, string>;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteTitle: { type: String, default: 'GIFLRI | Global Islamic Finance & Language Research Institution' },
    siteTagline: { type: String, default: 'Advancing Islamic Finance, Arabic Language Excellence & Scholarly Research' },
    heroHeadline: { type: String, default: 'Advancing Islamic Finance & Global Knowledge' },
    heroSubheadline: { type: String, default: 'Empowering universities, colleges, and scholarly institutions with international accreditation, standardized curricula, and academic quality assurance.' },
    heroCtaPrimaryText: { type: String, default: 'Apply for Affiliation' },
    heroCtaPrimaryLink: { type: String, default: '/affiliation/apply' },
    heroCtaSecondaryText: { type: String, default: 'Verify Credentials' },
    heroCtaSecondaryLink: { type: String, default: '/verify' },
    heroStats: { type: Schema.Types.Mixed, default: {} },
    announcement: { type: Schema.Types.Mixed, default: {} },
    contactEmail: { type: String, default: 'secretariat@giflri.org' },
    contactPhone: { type: String, default: '+971 4 800 GIFLRI' },
    headquartersAddress: { type: String, default: 'Dubai International Academic City, Block 12, P.O. Box 50021, Dubai, UAE' },
    copyrightText: { type: String, default: '© 2026 GIFLRI. All Rights Reserved.' },
    socialLinks: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
