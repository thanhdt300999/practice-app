
import React, { Children } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

// export default class AppText extends Component {
//   constructor(props) {
//     super(props)
//     // Put your default font styles here. 
//     this.style = [{fontFamily: 'Avenir Next Condensed'}]; 
//     if( props.style ) {
//       if( Array.isArray(props.style) ) {
//         this.style = this.style.concat(props.style)
//       } else {
//         this.style.push(props.style)
//       }
//     }
//   }

//   render() { return (
//     <Text {...this.props} style={this.style}>
//       {this.props.children}
//     </Text>
//   )}
// }

const AppText = ({ style, children }) => {
  return (
    <Text style={[styles.text, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Avenir Next Condensed Medium',
    // fontWeight: 'bold'
  }
})

export default AppText