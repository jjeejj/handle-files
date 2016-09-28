var fs = require('fs');

const devicemac_one = 'FCAD0F0647F0';
const devicemac_two = '202818A1DBA2';
var isDelete = true;

//合并为csv文件------简单的读取写入，没有利用流

var files = fs.readdir('./csv/2016-09-27',function (err,files) {
	if(err){
		console.log(err);
		return false;
	}
	console.log(files.length);
	//开始合并
	for(var i = 0; i < files.length; i++){
		var filename = files[i];
		var data = fs.readFileSync('./csv/2016-09-27/'+filename,{encoding:'utf8'}) 
			
		//分设备mac 进行分开合并
		if(filename.indexOf(devicemac_one) >= 0){
			fs.appendFileSync('./csv/2016-09-27/'+devicemac_one+'.csv',data);

		}else if(filename.indexOf(devicemac_two) >=0){
			fs.appendFileSync('./csv/2016-09-27/'+devicemac_two+'.csv',data);
		}

		if(isDelete){
			fs.unlinkSync('./csv/2016-09-27/'+filename); //删除原始文件		
		}
	}
	//结束合并
})