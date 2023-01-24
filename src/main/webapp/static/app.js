
//HELPER METHOD
function toJson($form){
    var serialized = $form.serializeArray();
    console.log(serialized);
    var s = '';
    var data = {};
    for(s in serialized){
        data[serialized[s]['name']] = serialized[s]['value']
    }
    var json = JSON.stringify(data);
    return json;
}

const getBaseUrl = () => $("meta[name=baseUrl]").attr("content");
const getRole = () => $("meta[name=role]").attr("content");


function handleAjaxError(response){
	var response = JSON.parse(response.responseText);
	// alert(response.message);
    $.notify.defaults( {clickToHide:true,autoHide:false} );
    $.notify(response.message + " ❌", 'error');
}

function handleAjaxSuccess(response){
    $.notify(response, 'success');
}

function readFileData(file, callback){
	var config = {
		header: true,
		delimiter: "\t",
		skipEmptyLines: "greedy",
		complete: function(results) {
			callback(results);
	  	}	
	}
	Papa.parse(file, config);
}


function writeFileData(arr){
	var config = {
		quoteChar: '',
		escapeChar: '',
		delimiter: "\t"
	};
	
	var data = Papa.unparse(arr, config);
    var blob = new Blob([data], {type: 'text/tsv;charset=utf-8;'});
    var fileUrl =  null;

    if (navigator.msSaveBlob) {
        fileUrl = navigator.msSaveBlob(blob, 'download.tsv');
    } else {
        fileUrl = window.URL.createObjectURL(blob);
    }
    var tempLink = document.createElement('a');
    tempLink.href = fileUrl;
    tempLink.setAttribute('download', 'download.tsv');
    tempLink.click(); 
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const verifyRole = () => {
    console.log(getRole());
    if(getRole() !== "supervisor") {
        $(".supervisor-only").hide();
    }
}
verifyRole();
