'use strict'
var fs = require('fs')
var Promise = require('bluebird')

//异步的方式读取文本的信息
exports.readFileAsync = function(fpath,encoding){
	//读取文本信息的时候,用Promise包裹一层
	return new Promise(function(resolve,reject){
		fs.readFile(fpath,encoding,function(err,content){
			if(err) reject(err)
			else resolve(content)
		})
	})

}
//异步方式写入文本,写入的时候用Promise包裹一层
exports.writeFileAsync = function(fpath,content){
	return new Promise(function(resolve,reject){
		fs.writeFile(fpath,content,function(err){
			if (err) reject(err)
			else resolve()
		})
	})
}