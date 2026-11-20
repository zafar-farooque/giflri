import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsiteContent extends Document {
  about?: Record<string, any>;
  quality?: Record<string, any>;
  affiliation?: Record<string, any>;
  relations?: Record<string, any>;
  observatory?: Record<string, any>;
  globalPresence?: Record<string, any>;
  latestUpdates?: Record<string, any>;
  quickActions?: Record<string, any>;
  footer?: Record<string, any>;
  updatedAt?: Date;
}

const WebsiteContentSchema = new Schema<IWebsiteContent>(
  {
    about: { type: Schema.Types.Mixed, default: {} },
    quality: { type: Schema.Types.Mixed, default: {} },
    affiliation: { type: Schema.Types.Mixed, default: {} },
    relations: { type: Schema.Types.Mixed, default: {} },
    observatory: { type: Schema.Types.Mixed, default: {} },
    globalPresence: { type: Schema.Types.Mixed, default: {} },
    latestUpdates: { type: Schema.Types.Mixed, default: {} },
    quickActions: { type: Schema.Types.Mixed, default: {} },
    footer: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const WebsiteContent =
  mongoose.models.WebsiteContent ||
  mongoose.model<IWebsiteContent>('WebsiteContent', WebsiteContentSchema);

export default WebsiteContent;
