//@ts-check
import React, { useState, useEffect } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

function Scheduler() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/events/all").then((res) => {
      console.log(res.data);
      setEvents(res.data);
    });
  }, []);

  const localData = {
    dataSource: [
      {
        EndTime: new Date(2020, 0, 11, 6, 30),
        StartTime: new Date(2020, 0, 11, 4, 0),
      },
    ],
  };
  const remoteData = new DataManager({
    url: "http://localhost:8080/events/all",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  return (
    <ScheduleComponent currentView="Month" eventSettings={remoteData}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Scheduler;

// import { render } from "react-dom";
// //import "./index.css";
// import * as React from "react";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
//   Resize,
//   DragAndDrop,
// } from "@syncfusion/ej2-react-schedule";
// import { extend } from "@syncfusion/ej2-base";
// import { SampleBase } from "./sample-base";
// import * as dataSource from "./datasource.json";
// import { getDefaultNormalizer } from "@testing-library/react";
// /**
//  * Schedule local data sample
//  */
// export default class LocalData extends SampleBase {
//   constructor() {
//     super(...arguments);
//     this.data = extend(
//       [],
//       dataSource.zooEventsData,
//       dataSource.timelineData,
//       null,
//       true
//     );
//   }
//   onEventRendered(args) {
//     let categoryColor = args.data.CategoryColor;
//     if (!args.element || !categoryColor) {
//       return;
//     }
//     if (this.scheduleObj.currentView === "Agenda") {
//       args.element.firstChild.style.borderLeftColor = categoryColor;
//     } else {
//       args.element.style.backgroundColor = categoryColor;
//     }
//   }

//   render() {
//     return (
//       <div className="schedule-control-section">
//         <div className="col-lg-12 control-section">
//           <div className="control-wrapper">
//             <header className="App-header">
//               <h1>scheduling</h1>
//             </header>
//             <ScheduleComponent
//               width="100%"
//               height="650px"
//               selectedDate={new Date(2020, 7, 15)}
//               ref={(t) => (this.scheduleObj = t)}
//               eventSettings={{ dataSource: this.data }}
//               eventRendered={this.onEventRendered.bind(this)}
//             >
//               <Inject
//                 services={[
//                   Day,
//                   Week,
//                   WorkWeek,
//                   Month,
//                   Agenda,
//                   Resize,
//                   DragAndDrop,
//                 ]}
//               />
//             </ScheduleComponent>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
