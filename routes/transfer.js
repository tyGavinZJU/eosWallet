var express = require('express');
var router = express.Router();
var Eos = require('eosjs');
var bodyParser = require('body-parser');
var config = require('./utils/config.js');
var db = require('./utils/db.js');
var respJson = require('./utils/responseJson.js');
var utils = require('./utils/utils.js')
/* GET home page. */



router.post('/', function(req, resp, next) {
  /*
  	{
	"UID":  "10000", 
	"fromAccount": "address1",
	"toAccount":  "address2",
	"amount":    "0.1",
	"type":    1
}
*/
	var UID = req.body.UID;
	var fromAccount = req.body.fromAccount;
	var toAccount = req.body.toAccount;
	var amount = req.body.amount;
	var tokenType = req.body.type;
	var memo = req.body.memo;


	var eosAmount = utils.amountConvert(amount);
	console.log(typeof(amount),eosAmount);
	if (eosAmount == "error"){
		resp.send(respJson.generateJson(0,3,"amount格式错误"))
	}
	else{
		db.getRow(UID,function(data){
			/*
			switch(data)
			{
			    case "void":

			        break;
			    case "error":

			        break;
			    default:

			}
			*/
			switch(data)
			{
			    case "void":
			    	resp.send(respJson.generateJson(0,0,"此UID无EOS钱包"));
			        break;
			    case "error":
			    	resp.send(respJson.generateJson(0,1,"数据库查表失败"));
			        break;
			    default:
			    	if (data.accountName != fromAccount){
						resp.send(respJson.generateJson(0,2,"UID对应的库中账户名不一致"));
					}
					else{
						var priKey = data.ownerPriKey;
						console.log(priKey);
						var eos = Eos({
				        //payer的私钥
				            keyProvider: priKey,// private key
				            httpEndpoint: config.chainServer,
				            chainId: config.chainID
				        });
						//console.log(amount.toFixed(4) + " EOS");
						console.log(fromAccount,toAccount,eosAmount,memo);
				        eos.transaction(tr => {
							tr.transfer(fromAccount,toAccount,eosAmount,memo);
						}).then(r => {
								//返回成功结果
								//console.log(r);
								resp.send(respJson.generateJson(1,0,"请求成功",r));
							}).catch(e => {
								//返回失败结果
								//console.log(e);
								resp.send(respJson.generateJson(0,4,"链端服务器请求失败",e));
							});
					}
			}
		})
	}
	
	/*
	//http获取
	var accountFrom = "tygavingavin";
	var accountTo = "eostesttest1";
	var memo = "";
	eos.transaction(tr => {
		tr.transfer(accountFrom,accountTo,"1.0000 EOS",memo);
		}).then(r => {
			//返回成功结果
			console.log(r);
			res.send(r);
		}).catch(e => {
			//返回失败结果
			console.log(e);
			res.send(e);
		});
		*/
});

module.exports = router;
