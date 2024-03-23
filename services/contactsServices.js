import { Contact } from '../models/contactsModel.js';

const listContacts = async (favorite, page, limit) => {
  if (favorite === 'true' || favorite === 'false' ) {
    return Contact.find({ favorite: favorite }).limit(limit).skip((page-1) * limit)
  }

  return Contact.find().limit(limit).skip((page-1) * limit);
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id)

  return contact;
};

const removeContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id)

  return contact;
};

const addContact = async (name, email, phone) => {
  const contact = new Contact({ name, email, phone });
  await contact.save()

  return contact;
};

const updateContact = async (id, name, email, phone) => {
  const contact = await getContactById(id);
  if (contact) {
    contact.name = name ?? contact.name;
    contact.email = email ?? contact.email;
    contact.phone = phone ?? contact.phone;
    await contact.save();
  }

  return contact;
};

const updateStatusContact = async (id, favorite) => {
  const contact = await getContactById(id);
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
