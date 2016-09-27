var fs = require('fs');

const devicemac_one = 'FCAD0F0647F0.....';
const devicemac_two = '27134225';



var files = fs.readdir('./csv',function (err,files) {
	if(err){
		console.log(err);
		return false;
	}

	for(var i = 0; i < files.length; i++){
		var filename = files[i];
		var data = fs.readFileSync('./csv/'+filename,{encoding:'utf8'}) 
			
		//分设备mac 进行分开合并
		if(filename.indexOf(devicemac_one) >= 0){
			fs.appendFileSync('./csv/'+devicemac_one+'.csv',data);

		}else if(filename.indexOf(devicemac_two) >=0){
			console.log(i);
			fs.appendFileSync('./csv/'+devicemac_two+'.csv',data);
		}			
	}
})