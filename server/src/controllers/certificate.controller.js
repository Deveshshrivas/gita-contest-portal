import * as certService from '../services/certificate.service.js';
import { sendSuccess } from '../utils/response.js';

export async function verify(req, res, next) {
  try {
    const { code } = req.params;
    const result = await certService.verifyCertificate(code);
    return sendSuccess(res, result, result.isValid ? 'Certificate verified' : 'Certificate not found');
  } catch (err) {
    next(err);
  }
}

export async function myCertificates(req, res, next) {
  try {
    const certs = await certService.getUserCertificates(req.user._id);
    return sendSuccess(res, certs, 'Candidate certificates');
  } catch (err) {
    next(err);
  }
}
