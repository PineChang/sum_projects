'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  DatePickerAndroid,
  TextInput,
 
} from 'react-native';

//简单封装一个组件

class DatePickerAndroidComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={simpleText:this.props.touchablePlaceholder};
  }
  //进行创建时间日期选择器
  async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);      
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = this.props.touchablePlaceholder;
      } else {
        var date = new Date(year, month, day);
        
        newState[stateKey + 'Text'] = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);

      this.props.onChangeDate(this.state.simpleText);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
 
  render() {
    return (
      <View style={{flex:1}}>
         <TouchableHighlight
          style={styles.button}
          underlayColor="#a5a5a5"
          onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
          <Text style={styles.buttonText}>{this.state.simpleText}</Text>
        </TouchableHighlight>
      </View>
    );
  }


}
const styles = StyleSheet.create({
 
  button: {
    marginLeft:14,
    backgroundColor: 'transparent',
    padding: 0,
    
  },
buttonText:{
	color:'#aaaaaa',
	fontSize:14,
	
}
});
 
export default DatePickerAndroidComponent