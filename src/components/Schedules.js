import React from 'react';
import ScheduleFormatter from "./ScheduleFormatter";

class Schedules extends React.Component {
    render() {
        let schedulesToBeShown = [];
        let schedules = this.props.schedules;
        for (let i = 0; i < schedules.length; i++) {
            schedulesToBeShown.push(<ScheduleFormatter schedule={schedules[i]} />);
        }
        return <div className="schedules">{schedulesToBeShown}</div>;
    }
}
export default Schedules;
