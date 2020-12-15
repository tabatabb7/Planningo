// import React from "react"

// class MiscIcons extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selected: "https://res.cloudinary.com/ddsjq4nhs/image/upload/v1608060534/users/028-boy_zywjco",
//     };
//   }
//   render() {
//    const array = [
//     '028-boy_zywjco',
//     '027-grandmother_kjoesv'
//     ];
//     const images = array.map((image) => {
//       return (
//         <img
//           key={image}
//           src={`/assets/icons/misc/${image}.png`}
//           className={
//             this.state.selected === `https://res.cloudinary.com/ddsjq4nhs/image/upload/v1608060534/users/${image}.png`
//               ? "pick-avatar selected"
//               : "pick-avatar"
//           }
//           onClick={() => {
//             this.setState({ selected: `https://res.cloudinary.com/ddsjq4nhs/image/upload/v1608060534/users/${image}.png` });
//           }}
//           value={image}
//         />
//       );
//     });

//     return (
//       <div id="pick-user-image-wrap">{images}</div>
//       )
//   }
// }

// export default MiscIcons
