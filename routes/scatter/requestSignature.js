var express = require('express');
var router = express.Router();
var Eos = require('eosjs');
var bodyParser = require('body-parser');
var config = require('../utils/config.js');
var db = require('../utils/db.js');
var respJson = require('../utils/responseJson.js');
var utils = require('../utils/utils.js')
var ecc = require('eosjs-ecc');

/* GET home page. */
router.post('/', function(req, resp, next) {
	var UID = req.body.UID;
	var buf = req.body.buf;
	//库表查
	var name = "gtygavintest";
	var publicKey = "EOS8ivzcSu6Co6hJXaTfPjGyXUX2jnrK5VKrsQ9DXhKcBPF9TZj8p";
	var priv = "5Hrj3KDQLMu615gp1XW9uiEczr4wFe7ZBsJmnF6MYe4eq5MwGRH"
	
	if (typeof(buf) == "string"){
		buf = JSON.parse(buf);
	}
	/*
	console.log(bufstr,typeof bufstr);
	var buf = JSON.parse(bufstr);
	console.log(buf,typeof(buf));
	*/
	
	let signature = ecc.sign(Buffer.from(buf, 'utf8'), priv);
	console.log(signature);
	var result = {
	        	    "result":{
	                    "signatures":[signature],
                        "returnedFields":{}
	                },
	                cpuData:{
		                systemRestTimes: 1,
		                status: 1,  // 1.cpu充足 2.cpu不充足，系统剩余次数足够，系统已经帮你质押了一次 3.cpu不充足，系统剩余次数不足，请求用户自己花钱质押
		                amount: 0.02  // "0.02 EOS" 质押消耗的eos数量 （运营常量）
		            }
            	};

    resp.send(respJson.generateJson(1,0,"请求成功",result));

	//var EosRamAmount = utils.amountConvert(RamAmount);


	
});

module.exports = router;
