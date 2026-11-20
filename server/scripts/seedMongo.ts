import dotenv from 'dotenv';
import connectDB from '../config/db';
import { WebsiteContent } from '../models/WebsiteContent';
import { User } from '../models/User';
import { Institution } from '../models/Institution';
import { Application } from '../models/Application';
import { Certificate } from '../models/Certificate';
import { Event } from '../models/Event';
import { ResearchPaper } from '../models/Research';
import { Pillar } from '../models/Pillar';
import { SiteSettings } from '../models/SiteSettings';
import { Complaint } from '../models/Complaint';
import { DB } from '../db/db';

dotenv.config();

async function seed() {
  console.log('🌱 Starting MongoDB Data Seeding from db_store.json...');

  const conn = await connectDB();
  if (!conn) {
    console.error('❌ Cannot seed: MongoDB is not connected.');
    process.exit(1);
  }

  try {
    // 1. Website Content CMS
    const websiteContent = DB.getWebsiteContent();
    await WebsiteContent.deleteMany({});
    await WebsiteContent.create(websiteContent);
    console.log('✅ Website Content (8 CMS Sections) seeded.');

    // 2. Site Settings
    const siteSettings = DB.getSiteSettings();
    await SiteSettings.deleteMany({});
    await SiteSettings.create(siteSettings);
    console.log('✅ Site Settings seeded.');

    // 3. Users
    const users = DB.getUsers();
    await User.deleteMany({});
    await User.insertMany(users);
    console.log(`✅ ${users.length} Users seeded.`);

    // 4. Institutions
    const institutions = DB.getInstitutions();
    await Institution.deleteMany({});
    await Institution.insertMany(institutions);
    console.log(`✅ ${institutions.length} Institutions seeded.`);

    // 5. Applications
    const applications = DB.getApplications();
    await Application.deleteMany({});
    await Application.insertMany(applications);
    console.log(`✅ ${applications.length} Applications seeded.`);

    // 6. Certificates
    const certificates = DB.getCertificates();
    await Certificate.deleteMany({});
    await Certificate.insertMany(certificates);
    console.log(`✅ ${certificates.length} Certificates seeded.`);

    // 7. Events
    const events = DB.getEvents();
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log(`✅ ${events.length} Events seeded.`);

    // 8. Research Papers
    const papers = DB.getResearchPapers();
    await ResearchPaper.deleteMany({});
    await ResearchPaper.insertMany(papers);
    console.log(`✅ ${papers.length} Research Papers seeded.`);

    // 9. Pillars
    const pillars = DB.getPillars();
    await Pillar.deleteMany({});
    await Pillar.insertMany(pillars);
    console.log(`✅ ${pillars.length} Institutional Pillars seeded.`);

    // 10. Complaints
    const complaints = DB.getComplaints();
    await Complaint.deleteMany({});
    await Complaint.insertMany(complaints);
    console.log(`✅ ${complaints.length} Complaints seeded.`);

    console.log('🎉 MongoDB Data Migration & Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
