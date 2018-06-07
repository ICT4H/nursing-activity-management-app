import React, {Component} from 'react';

class PersonDetails extends Component {
  render() {
    let person = this.props.person;
    return (<div className={"PersonDetails"}>
      <p>
        {person.name}
      </p>
      <p>
        {person.gender}
      </p>
      <p>
        {person.age + " yrs"}
      </p>
    </div>)
  }
}

export default PersonDetails
