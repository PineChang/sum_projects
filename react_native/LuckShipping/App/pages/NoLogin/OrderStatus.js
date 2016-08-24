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

} from 'react-native';
import { NaviGoBack } from '../utils/CommonUtils';
import Loading from '../../component/Loading';
import {HOST} from '../../commom/Request'
var STATUS_IMGS=[
     require('../../imgs/order/ic_order_status_tijiao.png'),  
     require('../../imgs/order/ic_order_status_zhifu.png'),  
     require('../../imgs/order/ic_order_status_jiedan.png'),  
     require('../../imgs/order/ic_order_status_peisong.png'),
     require('../../imgs/order/ic_order_status_wancheng.png')
];

var {height, width} = Dimensions.get('window');

class BulkTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onPressItem=this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this); 
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.state={
          stockpre:'',
          stockno:'',
          dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
         }),
         bulkStatus : {},
      }
  } 
  //点击列表每一项响应按钮
  onPressItem(data){
      
  }
   //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  topItemAction(position){
      
      if(position === 0){
         //向服务器端请求数据, content作为参数
         //this.state.bulkStatus=服务器请求过来的数据
         //验证参数
           if(this.status.stockpre === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('运单不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           if(this.status.stockno === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('运单不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           this.getLoading().show();
         //发送请求数据
          fetch(HOST+'CommonQuery/QueryAwbInfo',{
            method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "awbpara.Stockpre": this.state.stockpre,
                      
              "awbpara.Stockno": this.state.stockno,
        })

          }).then((response) => response.json()).then((responseJson) => {
              this.getLoading().dismiss(); 
              //
              ToastAndroid.show(responseJson.CODE,ToastAndroid.SHORT);
              if(responseJson==-1){
                ToastAndroid.show("查询失败...",ToastAndroid.SHORT);
                return;
              }
               
               //将数据赋值给状态的bulkStutas

               this.setState((state)=>{
                return {
                  bulkStatus:responseJson.OTHEROBJ,
                }
               });
            }).catch((error) => {
              console.error(error);
            });
          
      }
  }
  //进行渲染数据
  renderContent(dataSource) {
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={{flex:1}}
        onEndReachedThreshold={50}
        enableEmptySections={true}
      />
    );
   }
  //渲染每一项的数据
  renderItem(data) {
    if(data.Statusname === '订舱确认'){
       return ( this.renderHeaderItem(data));
    }else if(data.Statusname === '收货'){
       return (this.renderFooterItem(data));
    }else{
       return (this.renderCenterItem(data));
    }
  } 
  renderHeaderItem(data){
    return (
      <View style={{flexDirection:'row',height:75}}>
          <View>
              <Image source={require('../../imgs/order/ic_order_status_tijiao.png')} 
                     style={{width:30,height:30,marginLeft:10,marginTop:22}}/>
              <Image source={require('../../imgs/order/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
          </View>
          <View >
              <View style={{height:5}}/>
              <Image source={require('../../imgs/order/ic_order_status_item_bg.png')} 
                     style={{height:65,marginLeft:10,width:(width-60)}}>
                      {this.renderCenterContent(data)}
              </Image>
              <View style={{height:5}}/>
          </View>
      </View>
    );
  }
  renderCenterItem(data){
    return (
      <View style={{flexDirection:'row',height:75}}>
          <View>
              <Image source={require('../../imgs/order/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
              <Image source={STATUS_IMGS[0]} style={{width:30,height:30,marginLeft:10}}/>
              <Image source={require('../../imgs/order/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
          </View>
          <View >
              <View style={{height:5}}/>
              <Image source={require('../../imgs/order/ic_order_status_item_bg.png')} 
                     style={{height:65,marginLeft:10,width:(width-60)}}>
                      {this.renderCenterContent(data)}
              </Image>
              <View style={{height:5}}/>
          </View>
      </View>
    );
  }
  renderFooterItem(data){
    return (
      <View style={{flexDirection:'row',height:75}}>
          <View>
              <Image source={require('../../imgs/order/ic_order_shu.png')} style={{height:20,marginLeft:25}}/>
              <Image source={require('../../imgs/order/ic_order_status_wancheng.png')} style={{width:30,height:30,marginLeft:10}}/>
          </View>
          <View >
              <View style={{height:5}}/>
              <Image source={require('../../imgs/order/ic_order_status_item_bg.png')} 
                     style={{height:65,marginLeft:10,width:(width-60)}}>
                     {this.renderCenterContent(data)}
              </Image>
              <View style={{height:5}}/>
          </View>
      </View>
    );
  }
  renderCenterContent(data){
    return (
       <View style={{marginLeft:15,marginTop:10}}>
              <View style={{flexDirection:'row'}}>
                      //显示状态
                      <Text style={{color:'black',fontSize:14,backgroundColor:'#00000000'}}>{data.Statusname}</Text>
                      //显示航班号和航站
                      <View style={{flex:1,alignItems:'flex-end',marginRight:10}}><Text style={{color:'#777',fontSize:12,backgroundColor:'#00000000'}}>{data.AirPort+"_"+data.Fltno}</Text></View>
                      </View>
                      //显示件数和重量
                      <Text style={{color:'#777',fontSize:12,marginTop:10,backgroundColor:'#00000000'}}>{data.Opepcs+"件"+"_"+data.Opewt+"公斤"}</Text>
                      //显示时间
                      <View style={{flex:1,alignItems:'flex-end',marginRight:10}}><Text style={{color:'#777',fontSize:12,backgroundColor:'#00000000'}}>{data.Opedate+"_"+data.Opetime}</Text></View>
                      </View>
              </View>
    );
  }
  render() {
    const {navigator,route} = this.props;
    return (
    //头部的运单查询
     <View style={{backgroundColor:'#fff',flex:1}}>
          <View style={{height:45,backgroundColor:'black',flexDirection:'row'}}>
                <View style={{width:45,height:45,justifyContent:'center'}}>
                     <TouchableOpacity onPress={() => {this.buttonBackAction()}} style={{justifyContent:'center',alignItems:'center'}} >
                           <Image 
                                 style={{width:13,height:20}}
                                 source={require('../../imgs/ic_center_back.png')}
                           />
                     </TouchableOpacity>  
                </View>
                <View style={{flex:1,justifyContent:'center',}}>
                    <TextInput 
                            style={{ fontSize: 14, textAlign: 'left',flex:1,color:'white'}}
                            placeholder="运单前缀"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'stockpre'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                              this.setState((state)=>{
                                return {
                                  stockpre:text,
                                };
                              });
                            }}
                      />
                      <TextInput 
                            style={{ fontSize: 14, textAlign: 'left',flex:1,color:'white'}}
                            placeholder="运单号"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'stockno'}
                            multiline={true}
                            autoFocus={false}
                            onChangeText={(text) => {
                              this.setState((state)=>{
                                return {
                                  stockno:text,
                                }
                              });
                            }}
                      />
                </View>
                <View style={{width:45,height:45,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this.topItemAction(0)}}>
                         <Image source={require('../../imgs/home/ic_home_top_search.png')} 
                           style={{width:24,height:24,marginRight:8,alignItems:'center'}}/>
                    </TouchableOpacity>
                </View>  
          </View>
          <ShortLine/>
      //中间的始发站与终点站展示
             <View style={{width:width,height:100,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                 //始发站
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'black',backgroundColor:'#00000000'}}>{this.state.bulkStatus.Sairportid}</Text>
                  </View>
                  <image style={{flex:1}} source={require('../../imgs/ic_center_more.png')}>
                //终点站
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'black',backgroundColor:'#00000000'}}>{this.state.bulkStatus.Eairportid}</Text>
                  </View>
                  <image style={{flex:1}} source={require('../../imgs/ic_center_hezuo.png')}>
            </View>
      //下部的货物追踪状态展示
        <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
              {this.renderContent(this.state.dataSource.cloneWithRows(
                         this.state.bulkStatuts.Awbfsulist === undefined ? [] : this.state.bulkStatus.Awbfsulist))}
        </View>
        //要显示的加载中
      <Loading ref={'loading'} text={'加载中...'} />
    );
  }
}
let styles = StyleSheet.create({

});
export default BulkTrack