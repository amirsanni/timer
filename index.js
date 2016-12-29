function startCounterDown(timeInSec, callback){
	var hrElem = document.querySelector("#countHrDown");
    var minElem = document.querySelector("#countMinDown");
    var secElem = document.querySelector("#countSecDown");
	
    //get the number of hours in 'timeInSec'
    var hr = (timeInSec < 3600) ? 0 : parseInt(timeInSec/3600);
	
    //get the number of seconds left after getting the hour
    var numOfSecsLeft = timeInSec >= 3600 ? parseInt(timeInSec%3600) : timeInSec;

    //now get the number of minutes we have in 'numOfSecsLeft'
    var min = numOfSecsLeft > 60 ? parseInt(numOfSecsLeft/60) : 0;

    //get the number of secs we have left based on the value in 'numOfSecsLeft'
    var sec = numOfSecsLeft <= 60 ? numOfSecsLeft : parseInt(numOfSecsLeft%60);
    
	hrElem.innerHTML = hr < 10 ? "0"+hr : hr;
    minElem.innerHTML = min < 10 ? "0"+min : min;
    secElem.innerHTML = sec < 10 ? "0"+sec : sec;
        
    var displayTimer = setInterval(function(){
        //display seconds and decrement it by a sec
        --sec;
		secElem.innerHTML = sec < 0 ? "59" : (sec < 10 ? "0"+sec : sec);
        
        if(sec < 0){
            //decrease minute and reset secs to 59 if min is not yet zero
            if(min >= 1 || hr >= 1){
                sec = 59;//set secs to 59 if less than 1
                --min;//decrease minute
                minElem.innerHTML = min < 0 ? "59" : (min < 10 ? "0"+min : min);//and decrement min by 1
            }
            
            else{
                secElem.innerHTML = "00";//set secs to 00
            }
        }
        
        else if(min < 0){
            //decrease hour and set min to 59 if hour is not yet zero
            //else just decrease hour and do nothing to hour
            
            if(hr >= 1){
                min = 59;//reset min to 59 since we have at least one hour left
                minElem.innerHTML = min;
                --hr;//decrease hour
                hrElem.innerHTML = hr < 10 ? "0"+hr : hr;
            }
            
            else{
				minElem.innerHTML = "00";//set minute as zero if there is no hour left i.e. this is the last minute
            }
        }
        
        if((hr <= 0) && (min <= 0) && (sec <= 0)){
            //time is up, so stop counting
			hrElem.innerHTML = "00";
			minElem.innerHTML = "00";
			secElem.innerHTML = "00";
            
            clearInterval(displayTimer);
			
			//call callback
			if(typeof callback === 'function'){
				callback();
			}
        }
        
    }, 1000);
}





function startCounterUp(){
    var sec = "00";
    var min = "00";
    var hr = "00";
    
    var hrElem = document.querySelector("#countHrUp");
    var minElem = document.querySelector("#countMinUp");
    var secElem = document.querySelector("#countSecUp");
    
    hrElem.innerHTML = hr;
    minElem.innerHTML = min;
    secElem.innerHTML = sec;
        
    setInterval(function(){
        //display seconds and increment it by a sec
        ++sec;
        
        secElem.innerHTML = sec >= 60 ? "00" : (sec < 10 ? "0"+sec : sec);
        
        if(sec >= 60){
            //increase minute and reset secs to 00
            ++min;
            minElem.innerHTML = min < 10 ? "0"+min : min;
            
            sec = 0;
            
            if(min >= 60){
                //increase hr by one and reset min to 00
                ++hr;
                hrElem.innerHTML = hr < 10 ? "0"+hr : hr;
                
                min = 0;
            }
        }
        
    }, 1000);
}


window.addEventListener('load', function(){
	startCounterDown('3600', function(){
		//do something
		console.log("time up");
	});
	
	startCounterUp();
});