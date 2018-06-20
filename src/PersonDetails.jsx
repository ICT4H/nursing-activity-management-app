import React, {Component} from 'react';

class PersonDetails extends Component {
  render() {
    let person = this.props.person;
    return (<div className={this.props.className}>
      <div>
        {person.name}
      </div>
      <div>
        {person.gender}
      </div>
      <div>
        {person.age + " yrs"}
      </div>
    </div>)
  }
}

export default PersonDetails
