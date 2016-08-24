'use strict'

import React from 'react';
import {
	Dimensions,
	Image,
	InteractionManager,
	View,
	Text,
} from 'react-native';
//拿到窗口的宽和高进行解构赋值;
var {height,width} = Dimensions.get('window');
import IsLogin from './IsLogin'
class Splash extends React.Component {
	constructor(props) {
	  super(props);
	
	  
	}

	componentDidMount(){
    
	const {navigator} = this.props;
	this.timer = setTimeout(()=>{
        InteractionManager.runAfterInteractions(()=>{
        	navigator.resetTo({
        		component:IsLogin,
        		name:'无需登录模块'
        	});
        });
		},2500);
	}

	componentWillUnmount(){
		this.timer && clearTimeout(this.timer);
	}
     
    render(){
    	return(
    		<View style={{flex:1}}>
    	 <Image style={{flex:1,height:height,width:width}}
    	        source={require('../imgs/ic_welcome.jpg')}/>
    	    </View>


    		);
    	
    }

    

}

export default Splash;

