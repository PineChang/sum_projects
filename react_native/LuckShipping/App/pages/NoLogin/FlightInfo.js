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
  TextInput,
  InteractionManager,
   ToastAndroid,
   Platform,
   AsyncStorage,
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import DatePickerAndroidComponent from '../../component/DatePickerAndroidComponent';
import Loading from '../../component/Loading';
import {TESTHOST} from  '../../commom/Request';
import DisplayFltList from './DisplayFltList'




var {height, width} = Dimensions.get('window');


class FlightInfo extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);    
    this.onChangeFlightDate=this.onChangeFlightDate.bind(this);
    this.searchForFlightInfo=this.searchForFlightInfo.bind(this);
    this.state={

      carrier:"",
      flightNo:"",
      flightDate:"",
         
      }
     
  } 
    //返回
  buttonBackAction(){
     const {navigator} = this.props;
     
      return NaviGoBack(navigator);
  }
 
  onChangeFlightDate(changedDate){
    this.setState((state)=>{
      return {
        flightDate:changedDate
      }
    })
  }
  searchForFlightInfo(){
    
     const {navigator} = this.props;
     
            //用户登录
           if(this.state.carrier === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('承运人不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           if(this.state.flightNo === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('航班号不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           if(this.state.flightDate === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('航班日期不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           this.getLoading().show();
           var host = TESTHOST + 'CommonQuery/QueryFltInfo';
          fetch(host,{
            method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "fltpara.CARRIER": this.state.carrier,
                      
            "fltpara.FLTNO": this.state.flightNo,
            "fltpara.FLTDATE": this.state.flightDate,
        })

          }).then((response) => response.json()).then((responseJson) => {
              this.getLoading().dismiss(); 
               
              if(responseJson.OTHEROBJ && responseJson.OTHEROBJ.length>0){
               
               var jsonFltList = JSON.stringify(responseJson.OTHEROBJ);
               
               
               AsyncStorage.setItem("jsonFltList",jsonFltList,function(errs){
                      //TODO:错误处理
                      if (errs) {
                         ToastAndroid.show("存储有误!",ToastAndroid.SHORT);
                         return;
                      }
                      if (!errs) {
                        ToastAndroid.show("存储成功!",ToastAndroid.SHORT);
                        //存储成功就跳转;
                        navigator.push({
                          component:DisplayFltList,
                          name:"展示查询到的航班数据"
                        });

                      }
               });
                







            }else{
               ToastAndroid.show("查询航班信息不存在!",ToastAndroid.SHORT);
               return;

            }
            }).catch((error) => {
              console.error(error);
            });
           


  }


  getLoading() {
    return this.refs['loading'];
  }
 
  
  render() {
    return (
      <View style={{flex:1}}>
           <Image style={{width:width,height:height,resizeMode:'cover'}} source={require('../../imgs/fltQuery.jpg')}>
      
                <View style={{height:45,backgroundColor:'black',flexDirection:'row'}}>
                   <View style={{width:45,height:45,justifyContent:'center'}}>
                     <TouchableOpacity onPress={() => {this.buttonBackAction()}} style={{justifyContent:'center',alignItems:'center'}} >
                           <Image 
                                 style={{width:13,height:20}}
                                 source={require('../../imgs/ic_center_back.png')}
                           />
                     </TouchableOpacity>  
                  </View>
                 <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>航班动态查询       </Text>
                </View>
              
                </View>

             <View style={{marginTop:25,marginLeft:5,marginRight:5,height:44,
                           flexDirection:'row',borderRadius:5,padding:2,
                           backgroundColor:'#FF0067'}}>

                             <View style={{flex:1,height:40,justifyContent:'center',alignItems:'center', borderRightWidth:1,borderColor:'#fff'}}>
                                    <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>承运人</Text>
                             </View>

                             <View style={{flex:3,height:40,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                    <TextInput 
                                    style={{ fontSize: 14, textAlign: 'left',color:'white',flex:1}}
                                    placeholder="请输入承运人"
                                    placeholderTextColor="#aaaaaa"
                                    underlineColorAndroid="transparent"
                                    numberOfLines={1}
                                    ref={'stockpre'}
                                    multiline={true}
                                    autoFocus={true}
                                    onChangeText={(text) => {
                                      this.setState((state)=>{
                                        return {
                                          carrier:text,
                                        };
                                      });
                                    }}
                              />
                            </View>
             </View>

             <View style={{marginTop:20,marginLeft:5,marginRight:5,height:44,
                           flexDirection:'row',borderRadius:5,padding:2,
                           backgroundColor:'#FF0067'}}>
                           
                             <View style={{flex:1,height:40,justifyContent:'center',alignItems:'center', borderRightWidth:1,borderColor:'#fff'}}>
                                    <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>航班号</Text>
                             </View>

                             <View style={{flex:3,height:40,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                    <TextInput 
                                    style={{ fontSize: 14, textAlign: 'left',color:'white',flex:1}}
                                    placeholder="请输入航班号"
                                    placeholderTextColor="#aaaaaa"
                                    underlineColorAndroid="transparent"
                                    numberOfLines={1}
                                    ref={'stockpre'}
                                    multiline={true}
                                   
                                    onChangeText={(text) => {
                                      this.setState((state)=>{
                                        return {
                                          flightNo:text,
                                        };
                                      });
                                    }}
                              />
                            </View>
             </View>



              <View style={{marginTop:20,marginLeft:5,marginRight:5,height:44,
                           flexDirection:'row',borderRadius:5,padding:2,
                           backgroundColor:'#FF0067'}}>
                           
                             <View style={{flex:1,height:40,justifyContent:'center',alignItems:'center', borderRightWidth:1,borderColor:'#fff'}}>
                                    <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>航班日期</Text>
                             </View>

                             <View style={{flex:3,height:40,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                              <DatePickerAndroidComponent  onChangeDate={this.onChangeFlightDate} touchablePlaceholder={'请选择航班日期'}/> 
                            </View>
             </View>

             <View style={{marginTop:20,marginLeft:5,marginRight:5,height:44,
                           flexDirection:'row',borderRadius:5,padding:2,
                           backgroundColor:'#FF0067'}}>
                           
                      <TouchableOpacity onPress={() => {this.searchForFlightInfo()}} 
                                  style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                             <View style={{flex:1,height:40,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'white'}}>查询</Text>
                             </View>
                     </TouchableOpacity> 
                   
                     
             </View>


          
               
               
        <Loading ref={'loading'} text={'正在查询中...'} />    

            
            </Image>

      </View>


      
    );
  }
}
let styles = StyleSheet.create({
 


});
export default FlightInfo;