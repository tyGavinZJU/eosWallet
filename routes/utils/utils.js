
function amountConvert(amount){
	if (typeof(amount) == "string"){
		amount = parseFloat(amount);
	}
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
		callback(e);
	});
}

function unstakeNetCpu(eos,payerAccount,receiverAccount,netAmount,cpuAmount,callback){
	eos.transaction(tr => {
		tr.undelegatebw({
	    from: payerAccount,
	    receiver: receiverAccount,
	    unstake_net_quantity: netAmount,
	    unstake_cpu_quantity: cpuAmount,
	    transfer: 0
		});
	}).then(r => {
		//返回成功结果
		console.log(r);
		callback(r);
	}).catch(e => {
		//返回失败结果
		console.log(e);
		callback(e);
	});
}


function buyRam(eos,payerAccount,receiverAccount,ramAmount,callback){
		eos.transaction(tr => {
		//console.log(tr);
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
			callback(e);
		});
}

function sellRam(eos,Account,ramAmount,callback){
		eos.transaction(tr => {
		//console.log(tr);
			tr.sellram({
			    account:Account,
			    bytes: ramAmount
			});
		}).then(r => {
			//返回成功结果
			console.log(r);
			callback("ok");
		}).catch(e => {
			//返回失败结果
			console.log(e);
			callback(e);
		});
}


function getAccountExists(eos,accountName,callback){
	eos.getAccount(accountName,(error, result) =>
		{
			if(!error) {
				console.log(result);

		  		callback("ok")
			}
			else{
				callback("error");
			}
		});
}

function randomString(length){
	var chars = 'abcdefghijklmnopqrstuvwxyz12345';
	var maxPos = chars.length;
	var rs = '';
	for (i = 0; i < length; i++) {
		rs += chars.charAt(Math.floor(Math.random() * maxPos));
	}

	return rs;
}


function JsonCircularStructure(obj){
	return util.inspect(obj);
}


module.exports = {
 amountConvert,
 stakeNetCpu,
 unstakeNetCpu,
 JsonCircularStructure,
 buyRam,
 sellRam,
 getAccountExists,
 randomString
}