import RecognizedLogo from '../models/RecognizedLogo.js';
import { isCloudinaryConfigured, uploadImageBuffer } from '../config/cloudinary.js';

const isHttpUrl = (value) => {
  if (!value) return false;
  try {
    const url = new URL(String(value));
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export async function getRecognizedLogos(req, res) {
  try {
    const logos = await RecognizedLogo.find({ enabled: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json(logos);
  } catch (error) {
    console.error('Error fetching recognized logos:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export async function adminListRecognizedLogos(req, res) {
  try {
    const logos = await RecognizedLogo.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(logos);
  } catch (error) {
    console.error('Error fetching recognized logos (admin):', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export async function createRecognizedLogo(req, res) {
  try {
    const alt = (req.body?.alt || '').trim();
    const enabled = req.body?.enabled === undefined ? true : String(req.body.enabled).toLowerCase() !== 'false';
    const order = Number.isFinite(Number(req.body?.order)) ? Number(req.body.order) : 0;

    const manualUrl = (req.body?.imageUrl || '').trim();
    let imageUrl = '';

    if (req.file?.buffer) {
      if (!isCloudinaryConfigured()) {
        return res.status(500).json({ message: 'Cloudinary is not configured' });
      }
      const result = await uploadImageBuffer(req.file.buffer, { folder: 'recognized-logos' });
      imageUrl = result?.secure_url || '';
    } else if (manualUrl) {
      if (!isHttpUrl(manualUrl)) {
        return res.status(400).json({ message: 'Invalid image URL' });
      }
      imageUrl = manualUrl;
    } else {
      return res.status(400).json({ message: 'Logo image file or image URL is required' });
    }
    const created = await RecognizedLogo.create({
      imageUrl,
      alt,
      enabled,
      order,
    });

    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating recognized logo:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export async function deleteRecognizedLogo(req, res) {
  try {
    const logo = await RecognizedLogo.findById(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: 'Logo not found' });
    }

    await logo.deleteOne();
    res.status(200).json({ message: 'Logo removed' });
  } catch (error) {
    console.error('Error deleting recognized logo:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
