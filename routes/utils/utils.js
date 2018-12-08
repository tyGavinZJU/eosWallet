var util = require('util');

function amountConvert(amount){
	if (typeof(amount) == "number"){
		return amount.toFixed(4) + " EOS";
	}
	else 
		return "error";
}

function stakeNetCpu(eos,payerAccount,receiverAccount,netAmount,cpuAmount,callback){
	eos.transaction(tr => {
		tr.delegatebw({
	    from: payerAccount,
	    receiver: receiverAccount,
	    stake_net_quantity: netAmount,
	    stake_cpu_quantity: cpuAmount,
	    transfer: 0
		});
	}).then(r => {
		//返回成功结果
		console.log(r);
		callback(r);
	}).catch(e => {
		//返回失败结果
		console.log(e);
		callback("error");
	});
}


function buyRam(eos,payerAccount,receiverAccount,ramAmount,callback){
		eos.transaction(tr => {

		tr.buyrambytes({
		    payer: payerAccount,
		    receiver: receiverAccount,
		    bytes: ramAmount
			});
		}).then(r => {
			//返回成功结果
			console.log(r);
			callback("ok");
		}).catch(e => {
			//返回失败结果
			console.log(e);
			callback("error");
		});
}


function JsonCircularStructure(obj){
	return util.inspect(obj);
}


module.exports = {
 amountConvert,
 stakeNetCpu,
 JsonCircularStructure,
 buyRam
}