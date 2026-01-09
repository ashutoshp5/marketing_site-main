import Testimonial from '../models/Testimonial.js';

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, location, text } = req.body;

    if (!name || !location || !text) {
      return res.status(400).json({ message: 'name, location, and text are required' });
    }

    const testimonial = await Testimonial.create({
      name: String(name).trim(),
      location: String(location).trim(),
      text: String(text).trim(),
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();
    res.status(200).json({ message: 'Testimonial removed' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
