import contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    let { favorite, page, limit } = req.query;

    if (!page || isNaN(Number(page))) {
      page = 1;
    }

    if (!limit || isNaN(Number(limit))) {
      limit = 100;
    }

    const contacts = await contactsServices.listContacts(favorite, page, limit);

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
    return res.status(400).json({ message: `Bad request` });
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
    return res.status(400).json({ message: `Bad request` });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await contactsServices.addContact(name, email, phone);

    res.status(201).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(400).json({ message: `Bad request` });
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const contact = await contactsServices.updateStatusContact(
      id,
      favorite
    );

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    return res.status(400).json({ message: `Bad request` });
  }
};
