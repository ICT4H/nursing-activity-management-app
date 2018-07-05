import React from 'react';
import ScheduleFormatter from "./ScheduleFormatter";

class Schedules extends React.Component {
    render() {
        let show = [];
        let schedules = this.props.schedules;
        for (let i = 0; i < schedules.length; i++) {
            show.push(<ScheduleFormatter schedule={schedules[i]} />);
        }
        return <div className="schedules">{show}</div>;
    }
}
export default Schedules;