

import React, { useState, useEffect } from 'react';

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch contacts from the API
    fetch('https://contact.mediusware.com/api/contacts/?format=json')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.results);
        setSearchResults(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const filteredResults = contacts.filter((contact) =>
          contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
      } else {
        setSearchResults(contacts);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, contacts]);

  const openModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
  };

  const openModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
  };

  const openModalC = (contact) => {
    setSelectedContact(contact);
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(true);
  };

  const closeModal = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
    setSelectedContact(null);
  };

  const toggleOnlyEven = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = onlyEvenChecked ? searchResults.filter((contact) => contact.id % 2 === 0) : searchResults;
  const usContacts = filteredContacts.filter((contact) => contact.country.name === 'United States');

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA} style={{ backgroundColor: '#46139f' }}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB} style={{ backgroundColor: '#ff7f50' }}>
            US Contacts
          </button>
        </div>
      </div>

      {showModalA && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal A</h5>
                <button type="button" className="btn-close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={onlyEvenChecked}
                    onChange={toggleOnlyEven}
                    id="onlyEvenCheckbox"
                  />
                  <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                    Only Even
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Contacts"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {filteredContacts.map((contact) => (
                  <div className="border m-2" key={contact.id} onClick={() => openModalC(contact)}>
                    <p>Phone: {contact.phone}</p>
                    <p>Country: {contact.country.name}</p>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={openModalA} style={{ backgroundColor: '#46139f' }}>
                  Modal Button A
                </button>
                <button className="btn btn-warning" onClick={openModalB} style={{ backgroundColor: '#ff7f50' }}>
                  Modal Button B
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalB && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal B</h5>
                <button type="button" className="btn-close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={onlyEvenChecked}
                    onChange={toggleOnlyEven}
                    id="onlyEvenCheckbox"
                  />
                  <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                    Only Even
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Contacts"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {usContacts.map((contact) => (
                  <div className="border m-2" key={contact.id} onClick={() => openModalC(contact)}>
                    <p>Phone: {contact.phone}</p>
                    <p>Country: {contact.country.name}</p>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={openModalA} style={{ backgroundColor: '#46139f' }}>
                  Modal Button A
                </button>
                <button className="btn btn-warning" onClick={openModalB} style={{ backgroundColor: '#ff7f50' }}>
                  Modal Button B
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalC && selectedContact && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }}>
              <div className="modal-header">
                <h5 className="modal-title">Modal C</h5>
                <button type="button" className="btn-close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <p>Contact Details:</p>
                <p>Phone: {selectedContact.phone}</p>
                <p>Country: {selectedContact.country.name}</p>
                {/* Add more contact details here */}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={openModalA} style={{ backgroundColor: '#46139f' }}>
                  Modal Button A
                </button>
                <button className="btn btn-warning" onClick={openModalB} style={{ backgroundColor: '#ff7f50' }}>
                  Modal Button B
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;




