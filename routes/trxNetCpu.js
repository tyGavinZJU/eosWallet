var express = require('express');
var router = express.Router();
var Eos = require('eosjs');
var bodyParser = require('body-parser');
var config = require('./utils/config.js');
var db = require('./utils/db.js');
var respJson = require('./utils/responseJson.js');
var utils = require('./utils/utils.js')



router.post('/', function(req, resp, next) {

	var UID = req.body.UID;
	var CpuAmount = req.body.cpuAmount;
	var NetAmount = req.body.netAmount;
	var actionType = req.body.actionType;


	var EosCpuAmount = utils.amountConvert(CpuAmount);
	var EosNetAmount = utils.amountConvert(NetAmount);
	//console.log(typeof(CpuAmount),EosCpuAmount);
	//console.log(EosNetAmount);
	
	db.getRow(UID,function(data){
		switch(data)
		{
		    case "void":
		    	resp.send(respJson.generateJson(0,0,"此UID无EOS钱包"));
		        break;
		    case "error":
		    	resp.send(respJson.generateJson(0,1,"数据库读库失败"));
		        break;
		    default:
		    	console.log(data);
		        var priKey = data.ownerPriKey;
		        var eos = Eos({
		        //payer的私钥
		            keyProvider: priKey,// private key
		            httpEndpoint: config.chainServer,
		            chainId: config.chainID
		        });
	        	var payerAccount = data.accountName;
	        	var receiverAccount = data.accountName;

				switch(actionType)
				{
				    case 0:
				    	utils.stakeNetCpu(eos,payerAccount,receiverAccount,EosNetAmount,EosCpuAmount,function(data){
			        		console.log(data);
			        		if (data=="ok"){
			        			resp.send(respJson.generateJson(1,0,"质押成功",data));
			        		}
			        		else
			        			resp.send(respJson.generateJson(0,2,"质押失败"));
		        		})
				        break;
				    case 1:
				    	utils.unstakeNetCpu(eos,payerAccount,receiverAccount,EosNetAmount,EosCpuAmount,function(data){
			        		console.log(data);
			        		if (data=="ok"){
			        			resp.send(respJson.generateJson(1,1,"赎回成功",data));
			        		}
			        		else
			        			resp.send(respJson.generateJson(0,3,"赎回失败"));
		        		})
				        break;
				    default:
				    	resp.send(respJson.generateJson(0,4,"actionType错误"));
				}	        		
		}

	})	
});

module.exports = router;
