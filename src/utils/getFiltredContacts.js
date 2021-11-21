export const getFiltredContacts = (contacts, string) => {
  return contacts
    ? contacts.filter(el =>
        el.name.toLowerCase().includes(string.toLowerCase()),
      )
    : [];
};
