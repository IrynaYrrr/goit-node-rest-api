import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  return contact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  }

  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return newContact;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    contact.name = name ?? contact.name;
    contact.email = email ?? contact.email;
    contact.phone = phone ?? contact.phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }

  return contact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
