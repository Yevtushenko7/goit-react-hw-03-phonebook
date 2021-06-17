import React from "react";
import { Component } from "react";
import shortid from "shortid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactsList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  onFormSubmit = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.state.contacts.some((i) => i.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  onDeleteContactClick = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((i) => i.id !== id),
    }));
  };

  onFilterInput = (e) => {
    const value = e.currentTarget.value;
    this.setState({ filter: value });
  };

  onFilterChange = () => {
    return this.state.contacts.filter((i) =>
      i.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilter={this.onFilterInput} />
        <ContactsList
          contacts={this.onFilterChange()}
          onDeleteClick={this.onDeleteContactClick}
        />
      </div>
    );
  }
}

export default App;
