import { Contact } from '../models/contactsModel.js';

const listContacts = async (owner, favorite, page, limit) => {
  if (favorite === 'true' || favorite === 'false') {
    return Contact.find({ owner, favorite }).limit(limit).skip((page - 1) * limit)
  }

  return Contact.find({ owner }).limit(limit).skip((page - 1) * limit);
};

const getContactById = async (owner, id) => {
  const contact = await Contact.findOne({ owner, id })

  return contact;
};

const removeContact = async (owner, id) => {
  const contact = await Contact.findOneAndDelete({ owner, id })

  return contact;
};

const addContact = async (owner, name, email, phone) => {
  const contact = new Contact({ owner, name, email, phone });
  await contact.save()

  return contact;
};

const updateContact = async (owner, id, name, email, phone) => {
  const contact = await getContactById(owner, id);
  if (contact) {
    contact.name = name ?? contact.name;
    contact.email = email ?? contact.email;
    contact.phone = phone ?? contact.phone;
    await contact.save();
  }

  return contact;
};

const updateStatusContact = async (owner, id, favorite) => {
  const contact = await getContactById(owner, id);
  if (contact) {
    contact.favorite = favorite ?? contact.favorite;
    await contact.save();
  }

  return contact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
