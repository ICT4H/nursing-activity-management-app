import React, {Component} from 'react';
import PropTypes from "prop-types";

class SelectOptions extends Component {
  getAllOptions() {
    return this.props.options.map((o) => <option value={o} key={"option" + o}>{o}</option>);
  }

  render() {
    return (
        <select value={this.props.selectedValue} onChange={this.props.onChange}>
          <option>select Option</option>
          {
            this.getAllOptions()
          }
        </select>
    );
  }
}

SelectOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SelectOptions
