/**
 * 商城主页
 */
'use strict';
import React, {Component} from 'react';
import{ 
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    StatusBar
} from 'react-native';

import ShortLine from '../../component/ShortLine';
import { NaviGoBack } from '../../utils/CommonUtils';
var {height, width} = Dimensions.get('window');
var item_width = (width-1)/2;


class ModulesMain extends Component {
   constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      
    }
  centerItemAction(position){
      if(position === 0){
          
      }else if(position === 1){

      }else if(position === 2){
          
      }else if(position === 3){
          
      }
  }  

    //返回
  buttonBackAction(){
      const {navigator} = this.props;

      return NaviGoBack(navigator);
  }
  
  
  
  render() {
        return (
           <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <StatusBar
                          backgroundColor='#ff0000'
                          translucent={true}
                          hidden={true}
                          animated={true}      
                />

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
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>内部人员功能       </Text>
                     </View>
              
                 </View>
              

         
                
                <View style={{height:height-45,backgroundColor:'white'}}>

                     <View style={{flexDirection:'row',height:(height-45)/4}}>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/1.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width/2,height:(height-45)/4}}>
                                   <View style={{opacity:0.9,backgroundColor:'#495f77',height:30,width:width/2,alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:'white',fontSize:19}}>有运单订舱</Text>
                                      </View>
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/2.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width/2,height:(height-45)/4}}>
                                   <View style={{opacity:0.9,backgroundColor:'#495f77',height:30,width:width/2,alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:'white',fontSize:19}}>订舱查询</Text>
                                      </View>
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           
                     </View>

                     <View style={{flexDirection:'row',height:(height-45)/4}}>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/3.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width/2,height:(height-45)/4}}>
                                   <View style={{opacity:0.9,backgroundColor:'#495f77',height:30,width:width/2,alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:'white',fontSize:19}}>订舱管理</Text>
                                      </View>
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/4.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width/2,height:(height-45)/4}}>
                                   <View style={{opacity:0.9,backgroundColor:'#495f77',height:30,width:width/2,alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:'white',fontSize:19}}>拉货处理</Text>
                                      </View>
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           
                     </View>
                     <View style={{flexDirection:'row',height:(height-45)/4}}>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/5.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width/2,height:(height-45)/4}}>
                                   <View style={{opacity:0.9,backgroundColor:'#495f77',height:30,width:width/2,alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:'white',fontSize:19}}>CBA调取</Text>
                                      </View>
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/6.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width/2,height:(height-45)/4}}>
                                   <View style={{opacity:0.9,backgroundColor:'#495f77',height:30,width:width/2,alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:'white',fontSize:19}}>外站回程预录入</Text>
                                      </View>
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           
                     </View>
                     <View style={{flexDirection:'row'}}>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderColor:'black',}}>
                               <TouchableOpacity>
                                  <Image source={require('../../imgs/home/7.jpg')} style={{justifyContent:'flex-end',alignItems:'center',resizeMode:'stretch',width:width,height:(height-45)/4}}>
                                   
                                  </Image>      
                               </TouchableOpacity>
                           </View>
                           
                           
                     </View>

                </View>
              
           </View>         
        );
    }
}
const styles=StyleSheet.create({
    center_item_wrap:{
        alignSelf:'center',
        alignItems:'center',
        flex:1,
        justifyContent:'flex-end'
    },
    center_item_tv:{
        fontSize:14,
        marginBottom:8,
        backgroundColor:'#00000000'
    }
});
export default ModulesMain;