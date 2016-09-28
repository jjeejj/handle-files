/**
 * 逐行读取csv文件
 * 处理每一行的数据
 * 并包存到mongodb 数据库中
 */
const devicemac_one = 'FCAD0F0647F0';
const devicemac_two = '202818A1DBA2';

var fs = require('fs');

var lineReader = require('line-reader');//一行一行的读取

var mongoose = require('mongoose');

var files = fs.readdir('./csv/2016-09-27',function (err,files) {
	if(err){
		console.log(err);
		return false;
	}
	console.log("开始读取");
	for(var i = 0; i < files.length; i++){
		var filename = files[i]; //因为是异步的，第二次循环就会把filenaem 覆盖掉，所有下面的判断输出文件一直都是一个
		console.log("filename",filename);
		//开始读取
		lineReader.eachLine('./csv/2016-09-27/'+filename,function (line,last) {

			var lineArr = line.split(',');


			lineArr[10] = new Date(lineArr[10] * 1000);
			lineArr[11] = new Date(lineArr[11] * 1000);
			lineArr[12] = new Date(lineArr[12] * 1000);
			lineArr[13] = new Date(lineArr[13] * 1000);
			lineArr.push('\n');

			var line = lineArr.join(',');

			if(filename.indexOf(devicemac_one) >= 0){
				fs.appendFileSync('./csv/2016-09-27/'+devicemac_one+'handle.csv',line);
			}

			if(filename.indexOf(devicemac_two) >=0){
				fs.appendFileSync('./csv/2016-09-27/'+devicemac_two+'handle.csv',line);
			}
		})
	}
	console.log("读取结束");
})
