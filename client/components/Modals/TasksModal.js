// import React, { Component, Suspense } from "react";
// import "./taskmodal.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import ErrorBoundary from "./ErrorBoundary";


// class TasksModal extends Component {
//   constructor(props) {
//     super(props);
//     //example componentpath: "ShoppingList/AddShopping"
//   }

//   onClose = (e) => {
//     this.props.onClose && this.props.onClose(e);
//   };

//   render() {
//     const Component = loadComponent(this.props.componentpath);

//     if (!this.props.show) {
//       return null;
//     }
//     return (
//       <div>
//         <div className="create-task-modal-content">
//           <div id="modal-title">NEW TASK</div>
//           {this.props.componentpath}
//           <button onClick={(e) => this.onClose(e)} className="close-modal-btn">
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         </div>
//         <Suspense fallback={<div>Loading...</div>}>
//           <ErrorBoundary>
//             <Component />
//           </ErrorBoundary>
//         </Suspense>
//       </div>
//     );
//   }
// }

// export default TasksModal;
