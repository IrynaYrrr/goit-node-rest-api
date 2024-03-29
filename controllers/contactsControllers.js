import contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsServices.listContacts();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.removeContact(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await contactsServices.addContact(name, email, phone);

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const contact = await contactsServices.updateContact(
      id,
      name,
      email,
      phone
    );

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
