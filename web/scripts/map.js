/* global AjaxPostPromise */

//(() => {
var $ = (id)=> {return document.getElementById(id);};
const apiLink = "10.18.198.148:4567";
window.onload = function(){
    $("send").onClick = buttonPost;
};
var arr_msg;
var longlat;
function buttonPost() {
    var text = $("text").value;
    var radios = document.getElementsByName("level");
    var value;
    for (var i = 0, length = radios.length; i < length; i++)
    {
         if (radios[i].checked)
         {
             value = radios[i].value;
             break;
         }
    }
    var postPara = {
        user_id : Math.floor(Math.random() * 1000),
        lon: longlat["lng"],
        lat: longlat["lat"],
        color: value,
        msg : text
    };

    var ajaxPromise = new AjaxPostPromise(apiLink+"/message/", postPara);
    ajaxPromise
        .then((response)=>{
            console.log("stufff posttted, let goo dudde");
            var obj = {
                user_id : Math.floor(Math.random() * 1000),
                msg_id : response,
                long: longlat["long"],
                lat: longlat["lat"],
                color: value,
                msg : text
            }
            arr_msg.push(obj);
        })
        .catch((error)=>{
            console.log(error);
        });

//})();
