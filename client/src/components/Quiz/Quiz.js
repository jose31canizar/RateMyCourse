import React, { Component } from 'react';
import Question from '../Question/Question'
import Data from '../../data/questions.json'
import './Quiz.styl'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listMembers: '',
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFirstName(event) {
    this.setState({firstName: event.target.value});
  }
  handleLastName(event) {
    this.setState({lastName: event.target.value});
  }
  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.email + this.state.firstName + this.state.lastName)
    this.addMember()
    event.preventDefault()
  }
  addMember = () => {
    fetch('/api/addMember', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: this.state.email,
        status: 'subscribed',
        merge_fields: {
          firstName: this.state.firstName,
          lastName: this.state.lastName
        }
      })
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
  }
  getMembers = () => {
    fetch("/api/memberList")
    .then((res) => {
      return res.json();
    }).then( (json) => {
      this.setState({
        listMembers: json.members
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
  }
  render() {
    const newData = Object.values(Data)
    var list
    if(this.state.listMembers) {
      list = this.state.listMembers.map((m) => {
        return <p>{m.email_address}</p>
      })
    }
    return (
      <div className="Quiz">
      {newData.map((item, i) => {
        return <Question key={i} id={'question' + i} numKey={i} question={item.question} options={item.options} answer={item.answer} />
      })}
        <form className='quiz-form' id={'question' + newData.length} onSubmit={this.handleSubmit}>
          <label>
            <p>First Name:</p>
            <input type="text" value={this.state.firstName} onChange={this.handleFirstName} />
          </label>
          <label>
            <p>Last Name:</p>
            <input type="text" value={this.state.lastName} onChange={this.handleLastName} />
          </label>
          <label>
            <p>Email:</p>
            <input type="email" value={this.state.email} onChange={this.handleEmail} />
          </label>
          <input type="submit" value="Subscribe Now" />
        </form>
        <button onClick={this.getMembers} >get list of members</button>
        {list}
      </div>
    )
  }
}

export default Quiz;
