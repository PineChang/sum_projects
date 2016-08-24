'use strict';
import React, {Component} from 'react';
import{ 
    View,
    Text,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    InteractionManager,
    AsyncStorage,
     ToastAndroid,
} from 'react-native';


import {dateFormat} from '../../commom/datetime.js';
var {height,width} = Dimensions.get('window');
import { NaviGoBack } from '../../utils/CommonUtils';
class DisplayFltList extends Component {

    constructor(props) {
        super(props);
        
        this.renderItem = this.renderItem.bind(this); 
        this.buttonBackAction=this.buttonBackAction.bind(this);
        this.formatNumberDate=this.formatNumberDate.bind(this);
        this.state={
          //数据源
         dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,
               })
         //数据
               }
       
         var _this = this;
         //从缓存中将对象取出来;
         AsyncStorage.getItem("jsonFltList",function(errs,result){
                    if(errs){
                      ToastAndroid.show("获取有误!",ToastAndroid.SHORT);
                    }else{
                      //因为取出的对象是字符串格式,所以就需要转化为json对象;
                       var jsonFltList =  JSON.parse(result)
                      //将转化好的json对象放进state里面;
                       _this.setState({
                          fltItems:jsonFltList
                       })
                    }
                
            });
          


        
        
    }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;

      return NaviGoBack(navigator);
  }
  
  //进行渲染数据
  renderContent(dataSource) {
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={{backgroundColor:'transparent',flex:1}}
        onEndReachedThreshold={50}
        enableEmptySections={true}
      />
    );
   }

   formatNumberDate(rawdate,formatString){

      var temp = rawdate.split("(")[1]
      var temp1 = temp.split(")")[0];
      var date = new Date(parseInt(temp1));
      return dateFormat(date,formatString);
  }
    
  
   
   //渲染每一项的数据
  renderItem(fltItem) {
 
    return (
    <View>
             
                     <View style={{flexDirection:'row',backgroundColor:'lightgray',height:30,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>航班号</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{fltItem.FLIGHT_NO}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>航班日期</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{this.formatNumberDate(fltItem.FLIGHT_DATE,"yyyy-MM-dd hh:mm:ss")}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>机型</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{fltItem.AC_TYPE}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>状态</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{fltItem.STATUSTYPE}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>始发站</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{fltItem.SAIRPORT}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>到达站</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{fltItem.ARRIVAL_AIRPORT}</Text>
                           </View>
                     </View>
                      <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>计划起飞时间</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{this.formatNumberDate(fltItem.STD,"yyyy-MM-dd hh:mm")}</Text>
                           </View>
                     </View>
                      <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>实际起飞时间</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{this.formatNumberDate(fltItem.STA,"yyyy-MM-dd hh:mm")}</Text>
                           </View>
                     </View>
                      <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>计划降落时间</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{this.formatNumberDate(fltItem.ATD,"yyyy-MM-dd hh:mm")}</Text>
                           </View>
                     </View>
                      <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>实际降落时间</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{this.formatNumberDate(fltItem.ATA,"yyyy-MM-dd hh:mm")}</Text>
                           </View>
                     </View>
      </View>
    );
  }
    render() {
        return (
          <View style={{backgroundColor:'#f5f5f5',flex:1}}>
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
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>航班详细信息       </Text>
                     </View>
              
              </View>
                <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                   {this.renderContent(this.state.dataSource.cloneWithRows(
                         this.state.fltItems === undefined ? [] : this.state.fltItems))}
                </View>
          </View>
        );
    }
}
const styles=StyleSheet.create({
    item_view_zhanwei:{
        backgroundColor:'#f5f5f5',
        height:8
    },
    item_view_center:{
        flexDirection:'row',
        height:40,
        marginLeft:10,
        alignItems:'center'
    },
    item_view_icon:{
        width:10,
        height:15,
        marginLeft:5
    },
    item_view_center_status:{
        alignItems:'flex-end',
        flex:1,
        marginRight:10
    },
    item_view_center_status_tv_img:{
        height:20,
        width:62,
        justifyContent:'center',
        alignItems:"center"
    },
    item_view_center_status_tv:{
        color:'white',
        fontSize:10,
        backgroundColor:'#00000000'
    },
    item_view_center_msg:{
        flexDirection:'row',
        height:90,
        alignItems:'center'
    },
    item_view_center_icon:{
        width:50,
        height:50,
        marginLeft:10
    },
    item_view_center_title_img:{
        flexDirection:'column',
        marginLeft:10
    },
    item_view_center_title:{
        fontSize:14,
        color:'black'
    },
    item_view_center_time:{
        color:'#777',
        fontSize:13
    },
    item_view_bottom:{
        flexDirection:'row',
        height:40
    },
    item_view_bottom_price_v:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item_view_bottom_price:{
        color:'red',
        fontSize:14
    },
    item_view_bottom_again_v:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item_view_bottom_again:{
        fontSize:14,
        color:'black'
    }
});
export default DisplayFltList;