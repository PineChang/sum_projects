/**
 * 城市选择
 */
'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  ToastAndroid
} from 'react-native';


import FlightInfo from './NoLogin/FlightInfo';
import BulkTrack from './NoLogin/BulkTrack';
import Login from './Login';

var {height, width} = Dimensions.get('window');
const modules={
    
    "data":[{
        "moduleId":0,
        "moduleName":"航班动态",
        
    },{
        "moduleId":1,
        "moduleName":"货物追踪",
        
    },{
        "moduleId":2,
        "moduleName":"登录",
        
    }]
};
var moduleImages=[
     require('../imgs/city/img_Oxford.png'),  
     require('../imgs/city/img_Birmingham.png'),  
     require('../imgs/city/img_Coventry.png'),  
     
];

class IsLogin extends React.Component {
  constructor(props) {
    super(props);
     
    this.onPressItem=this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this); 
    this.state={
         dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
         }),
         moduleItems : eval(modules).data,
      }
  } 
  
  onEndReached(typeId) {
     
  }
  //点击列表每一项响应按钮
  onPressItem(moduleItem){
    const {navigator} = this.props;
    if(moduleItem){
      switch(moduleItem.moduleId){
        case 0:
         navigator.push({
            component:FlightInfo,
            name:'航班动态'
          });
        break;
        
        break;
        case 1:
        navigator.push({
            component:BulkTrack,
            name:'货物追踪'
          });
        break;
        
        case 2:
        navigator.push({
            component:Login,
            name:'登录'
          });
        ToastAndroid.show(moduleItem.moduleName,ToastAndroid.SHORT);
        
        break;
       

      }
    }
      
  }
  //进行渲染数据
  renderContent(dataSource) {
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={{backgroundColor:'white',flex:1}}
        onEndReachedThreshold={10}
        enableEmptySections={true}
      />
    );
   }
  //渲染每一项的数据
  renderItem(moduleItem) {
    return (
      <TouchableOpacity onPress={()=>{this.onPressItem(moduleItem)}}>
          <View style={{justifyContent:'center'}}>
                <Image source={moduleImages[moduleItem.moduleId]} style={{width:width,height:190}}>
                       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                             <Text style={{color:'white',fontSize:19}}>{moduleItem.moduleName}</Text>
                       </View>
                </Image>
          </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
          <View style={{height:45,backgroundColor:'black',flexDirection:'row'}}>
               
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>吉祥货运</Text>   
                </View>  
          </View>
          <View style={{flex:1}}>
               {this.renderContent(this.state.dataSource.cloneWithRows(
                         this.state.moduleItems === undefined ? [] : this.state.moduleItems))}
          </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
   text_version:{
      color:'#ddd', 
      marginTop:8
   },
   text_right:{
      alignSelf:'center',
      alignItems:'center',
      flex:1,
      justifyContent:'flex-end'
   }
});
export default IsLogin;