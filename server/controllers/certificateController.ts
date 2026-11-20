import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Certificate from '../models/Certificate';
import { DB } from '../db/db';

export async function getCertificates(req: Request, res: Response) {
  try {
    const { q, institution, status } = req.query;
    if (mongoose.connection.readyState === 1) {
      const filter: any = {};
      if (institution) filter.institution = institution;
      if (status) filter.status = status;
      if (q) {
        filter.$or = [
          { certId: { $regex: String(q), $options: 'i' } },
          { studentName: { $regex: String(q), $options: 'i' } },
          { program: { $regex: String(q), $options: 'i' } },
        ];
      }
      const list = await Certificate.find(filter).lean();
      if (list.length > 0) return res.status(200).json({ success: true, data: list });
    }

    let certs = DB.getCertificates();
    if (institution) certs = certs.filter((c) => c.institution.toLowerCase() === String(institution).toLowerCase());
    if (status) certs = certs.filter((c) => c.status.toLowerCase() === String(status).toLowerCase());
    if (q) {
      const query = String(q).toLowerCase();
      certs = certs.filter(
        (c) =>
          c.certId.toLowerCase().includes(query) ||
          c.studentName.toLowerCase().includes(query) ||
          c.program.toLowerCase().includes(query)
      );
    }
    return res.status(200).json({ success: true, data: certs });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch certificates' });
  }
}

export async function verifyCertificate(req: Request, res: Response) {
  try {
    const certId = String(req.params.certId || '');
    if (mongoose.connection.readyState === 1) {
      const cert = await Certificate.findOne({
        $or: [{ certId: certId.toUpperCase() }, { id: certId }, { verificationHash: certId }],
      }).lean();
      if (cert) return res.status(200).json({ valid: true, certificate: cert, success: true, data: cert });
    }

    const cert = DB.getCertificateById(certId) || DB.getCertificateByQuery(certId);
    if (!cert) {
      return res.status(404).json({ valid: false, success: false, message: 'Certificate record not found in official registry' });
    }
    return res.status(200).json({ valid: true, certificate: cert, success: true, data: cert });
  } catch (error) {
    return res.status(500).json({ valid: false, success: false, error: 'Verification failed' });
  }
}

export async function createCertificate(req: Request, res: Response) {
  try {
    const data = req.body;
    const newCert = DB.addCertificate({
      id: data.id || `cert-${Date.now()}`,
      certId: data.certId || `GIFLRI-${Date.now().toString().slice(-6)}`,
      studentName: data.studentName || '',
      program: data.program || 'Islamic Finance Program',
      institution: data.institution || 'Affiliated Institution',
      issueDate: data.issueDate || new Date().toISOString().split('T')[0],
      validity: data.validity || 'Permanent / Verifiable',
      status: data.status || 'Verified',
      ...data,
    });
    if (mongoose.connection.readyState === 1) {
      await Certificate.create(newCert);
    }
    return res.status(201).json({ success: true, data: newCert });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create certificate' });
  }
}
