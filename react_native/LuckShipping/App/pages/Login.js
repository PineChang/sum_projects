'use strict';
import React, {Component} from 'react';
import{ 
    View,
    Text,
    
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
    AsyncStorage,
} from 'react-native';


import ShortLineTwo from '../component/ShortLineTwo';


import {LOCALHOST} from  '../commom/Request';


import Loading from '../component/Loading';

import ModulesMain from './Login/ModulesMain';


var username = '';
var password = '';

class Login extends Component {
  constructor(props) {
      super(props);
          
      this.buttonRegisterOrLoginAction=this.buttonRegisterOrLoginAction.bind(this);  
      
     
}
  
  //用户登录/注册
  buttonRegisterOrLoginAction(position){
     var _this = this;
      if(position === 0){
            //用户登录
           if(username === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('用户名不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           if(password === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('密码不能为空...',ToastAndroid.SHORT) : ''; 
               return;
           }
           this.getLoading().show();
          fetch(LOCALHOST,{
	          method: 'POST',
    			  headers: {
    			    'Accept': 'application/json',
    			    'Content-Type': 'application/json',
    			  },
    			  body: JSON.stringify({
    			     "userinfo.USERNAME": username,
    	                    
    	            "userinfo.PASSWORD": password,
    			  })

          }).then((response) => response.json())
            .then((responseJson) => {
			      	this.getLoading().dismiss(); 
    			       var jsonUserInfo = responseJson.OTHEROBJ;
                 AsyncStorage.setItem("strUserInfo",JSON.stringify(jsonUserInfo),function(err){

                   if (!err){
                    //存储成功的跳转逻辑;
                      var {navigator} = _this.props;
                      navigator.push({
                        component:ModulesMain,
                        name:"登录后的模块主页"
                      })

                   }else{

                    //存储失败就
                    ToastAndroid.show("存储用户信息失败",ToastAndroid.SHORT);
                   }


                 })



			      }).catch((error) => {
			           console.error(error);
			         });
			     
			      
			      
              
              


             }
           
      }
  
 
 
  
  
  getLoading() {
    return this.refs['loading'];
  }
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            
                <View style={styles.topbar_bg}>
                   
                    <View style={styles.topbar_center_bg}>
                       <Text style={styles.topbar_center_tv}>登录</Text>   
                    </View>  
                    
                </View>
            
                <View style={{backgroundColor:'white',marginTop:13}}>
                   
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Image source={require('../imgs/logre/ic_us_icon.png')} 
                                 style={{width:17,height:14,marginLeft:13}}/>
                          <TextInput 
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入用户名"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'username'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               username = text;
                            }}
                      />
                    </View>
                   
                    <ShortLineTwo/>
                  
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Image source={require('../imgs/logre/ic_pwd_icon.png')} 
                                 style={{width:17,height:14,marginLeft:13}}/>
                          <TextInput 
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                               password = text;
                            }}
                           />
                          
                    </View>
                </View>
               
                <TouchableOpacity onPress={() => {this.buttonRegisterOrLoginAction(0)}} 
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                    <Image source={require('../imgs/logre/ic_login_btn.png')} 
                           style={{width:300,height:40,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{color:'white'}}>登录</Text>
                    </Image>
                </TouchableOpacity>
               
               
                 <Loading ref={'loading'} text={'登录中...'} />
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    },
    topbar_bg:{
        height:45,
        backgroundColor:'black',
        flexDirection:'row'
    },
   
    topbar_center_bg:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_center_tv:{
        fontSize:18,
        color:'white',
        alignSelf:'center'
    }
    
});
export default Login;