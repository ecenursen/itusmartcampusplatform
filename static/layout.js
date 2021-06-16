function getsessionvalue() {
    var login= '<%= session["login"].ToString() %>';
    return login;
}

var date = new Date();
var hour = date.getHours()
var log_in = getsessionvalue()
console.log("log_in")
console.log(log_in)
if (hour >= 20 || hour <= 6 ){
    console.log("night")
    if (log_in != null){
        document.body.style.backgroundImage = "url('/../static/itu_night.jpg')";
    }
    else{
        document.body.style.backgroundImage = "url('static/itu_night.jpg')";
    }
    
}
else if(hour < 20 && hour >= 15){
    console.log("lib")
    if (log_in!= null){
        document.body.style.backgroundImage = "url('/../static/itu_library.jpg')";
    }
    else{
        document.body.style.backgroundImage = "url('static/itu_library.jpg')";
    }
}
else{
    console.log("day")
    if (log_in != null){
        document.body.style.backgroundImage = "url('/../static/itu_day.jpg')";
    }
    else{
        document.body.style.backgroundImage = "url('static/itu_day.jpg')";
    }
}