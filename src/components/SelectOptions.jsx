import React, {Component} from 'react';
import PropTypes from "prop-types";

class SelectOptions extends Component {
  getAllOptions() {
    return this.props.options.map((o) => <option value={o.name} key={"option" + o.name}>{o.name}</option>);
  }

  render() {
    return (
        <select value={this.props.selectedValue} onChange={this.props.onChange} className={this.props.className}>
          <option>{this.props.chooseMsg || ""}</option>
          {
            this.getAllOptions()
          }
        </select>
    );
  }
}

SelectOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SelectOptions
