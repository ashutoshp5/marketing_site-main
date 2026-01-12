import Role from '../models/Role.js';

const trimOrEmpty = (v) => String(v || '').trim();

export const getPublicRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isActive: true }).sort({ createdAt: -1 }).limit(200);
    return res.status(200).json(roles);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching roles:', error);
    }
    return res.status(500).json({ error: 'Failed to fetch roles.' });
  }
};

export const getAdminRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 }).limit(500);
    return res.status(200).json(roles);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching roles (admin):', error);
    }
    return res.status(500).json({ error: 'Failed to fetch roles.' });
  }
};

export const createRole = async (req, res) => {
  try {
    const title = trimOrEmpty(req?.body?.title);
    const description = trimOrEmpty(req?.body?.description);
    const location = trimOrEmpty(req?.body?.location);
    const department = trimOrEmpty(req?.body?.department);
    const isActive = typeof req?.body?.isActive === 'boolean' ? req.body.isActive : true;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const created = await Role.create({ title, description, location, department, isActive });
    return res.status(201).json(created);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error creating role:', error);
    }
    return res.status(500).json({ error: 'Failed to create role.' });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = {};
    if (req.body?.title !== undefined) updates.title = trimOrEmpty(req.body.title);
    if (req.body?.description !== undefined) updates.description = trimOrEmpty(req.body.description);
    if (req.body?.location !== undefined) updates.location = trimOrEmpty(req.body.location);
    if (req.body?.department !== undefined) updates.department = trimOrEmpty(req.body.department);
    if (req.body?.isActive !== undefined) updates.isActive = Boolean(req.body.isActive);

    if (updates.title !== undefined && !updates.title) {
      return res.status(400).json({ error: 'title cannot be empty' });
    }

    const updated = await Role.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Role not found.' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error updating role:', error);
    }
    return res.status(500).json({ error: 'Failed to update role.' });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Role.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Role not found.' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error deleting role:', error);
    }
    return res.status(500).json({ error: 'Failed to delete role.' });
  }
};
