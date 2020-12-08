// import React, { Component } from "react";
// import { useForm } from "react-hook-form";

// export default function UpdateForm() {

//   const { register, handleSubmit } = useForm({
//     defaultValues: preloadedValues
//   })

//   const preloadedValues = {
//     name: this.props.task.name,
//     selected: this.props.task.selected,
//     description: this.props.task.description,
//   }

//   const onSubmit = async(event) => {
//     event.preventDefault();
//     try {
//       if (this.state.name == "") {
//         alert("task name can't be empty!")
//       } else {
//         await this.setState({taskId: this.props.task.id})
//         await this.props.updateTask(this.state);
//         this.setState({
//           name: "",
//           selected: "",
//           description: "",
//           taskId: null
//         });
//         alert(`Your task was updated! Redirecting you to your tasks page..`)
//         await this.props.fetchTasks();
//         this.props.onClose();
//       }
//     } catch (err) {
//       console.log("error creating task", err);
//     }
//   }

// return (
//   <div>
//     <div>{this.props.children}</div>
//     <div className="task-modal-content">
//       <div id="top-taskmodal-div">
//         <div id="modal-title">YOUR TASK</div>
//         <button
//           onClick={(e) => this.onClose(e)}
//           className="close-modal-btn"
//         >
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </div>

//       <div id="lower-taskmodal-div">
//         <form id="add-task-form" onSubmit={handleSubmit(this.onSubmit)}>
//           <label htmlFor="name">Task:</label>
//           <input
//             ref={register}
//             name="name"
//             type="text"
//             className="modal-input"
//             onChange={this.handleChange}
//             value={this.state.name}
//           />

//           <label htmlFor="description">Description:</label>
//           <textarea
//             ref={register}
//             name="description"
//             type="text"
//             rows="4"
//             className="modal-input"
//             onChange={this.handleChange}
//             value={this.state.description}
            
//           />
//         </form>

//         <form id="group-form" onSubmit={this.handleSubmit}>
//           <label htmlFor="selected"></label>
//           <select
//             value={this.state.selected}
//             onChange={this.handleChange}
//             name="selected"
//           >
//             <option value="" disabled>
//               Select Group
//             </option>
//             {groups && groups.length
//               ? groups.map((group) => (
//                   <option key={group.id}>{group.name} </option>
//                 ))
//               : "There are no groups"}
//           </select>
//           <button type="submit" id="modal-submit-button">Update</button>
//         </form>
//       </div>
//     </div>
//   </div>
// );
// }
