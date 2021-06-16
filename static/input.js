function get_inputs(inputs){
    console.log(inputs)
    document.getElementById("sing_or_multi").value = inputs["sing_or_multi"]
    if (inputs["sing_or_multi"] == "single"){
        bring_single();
        document.getElementById("input_data").value = inputs["input"]
        document.getElementById("str_date_1").value = inputs["str_date_1"]
        document.getElementById("end_date_1").value = inputs["end_date_1"]
        document.getElementById("str_date_2").value = inputs["str_date_2"]
        document.getElementById("end_date_2").value = inputs["end_date_2"]
    }
    else{
        bring_multiple();
        document.getElementById("input_data_1").value = inputs["input1"]
        document.getElementById("input_data_2").value = inputs["input2"]
        document.getElementById("input_data_3").value = inputs["input3"]
        document.getElementById("start_date").value = inputs["str_date"]
        document.getElementById("end_date").value = inputs["end_date"]
    }
}

window.onload = function(){
    var myInputs = JSON.parse(document.getElementById("pass_input").value);
    get_inputs(myInputs)
}

function bring_single(){
    document.getElementById("sing_or_multi").value = "single";
    single = document.getElementById("single_input");
    multi = document.getElementById("mutliple_input");
    multi.setAttribute('style',"display:none;");
    single.setAttribute('style',"display:block;");
    input = document.getElementById("input_data").setAttribute("required","");
    input1 = document.getElementById("input_data_1").removeAttribute("required");
    input2 = document.getElementById("input_data_2").removeAttribute("required");
}

function bring_multiple(){
    document.getElementById("sing_or_multi").value = "multi";
    single = document.getElementById("single_input");
    multi = document.getElementById("mutliple_input");
    single.setAttribute('style',"display:none;");
    multi.setAttribute('style',"display:block;");
    input1 = document.getElementById("input_data_1").setAttribute("required","");
    input2 = document.getElementById("input_data_2").setAttribute("required","");
    input = document.getElementById("input_data").removeAttribute("required");
}