console.log("Brand running");


function getBrandUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/brand";
}

//BUTTON ACTIONS
// function addBrand(event){
// 	//Set the values to update
// 	var $form = $("#brand-form");
// 	var json = toJson($form);
// 	var url = getBrandUrl();

// 	$.ajax({
// 	   url: url,
// 	   type: 'POST',
// 	   data: json,
// 	   headers: {
//        	'Content-Type': 'application/json'
//        },
// 	   success: function(response) {
// 	   		getBrandList();
// 	   },
// 	   error: handleAjaxError
// 	});

// 	return false;
// }

//BUTTON ACTIONS
function addBrand(event){
	//Set the values to update
	var $form = $("#brand-add-form");
	var json = toJson($form);
	var url = getBrandUrl();

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },
	   success: function(response) {
			$('#add-brand-modal').modal('toggle');
			$form[0].reset();
	   		getBrandList();
	   },
	   error: handleAjaxError
	});

	return false;
}

function createBrand(event){
	$('#add-brand-modal').modal('toggle');
}

function updateBrand(event){

	$('#edit-brand-modal').modal('toggle');
	//Get the ID
	var id = $("#brand-edit-form input[name=id]").val();
	var url = getBrandUrl() + "/" + id;


	//Set the values to update
	var $form = $("#brand-edit-form");
	var json = toJson($form);

	$.ajax({
	   url: url,
	   type: 'PUT',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },
	   success: function(response) {
	   		getBrandList();
	   },
	   error: handleAjaxError
	});

	return false;
}


function getBrandList(){
	var url = getBrandUrl();
	console.log(url);
	console.log("getting brand")
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayBrandList(data);
	   },
	   error: handleAjaxError
	});
}

function deleteBrand(id){
	var url = getBrandUrl() + "/" + id;

	$.ajax({
	   url: url,
	   type: 'DELETE',
	   success: function(data) {
	   		getBrandList();
	   },
	   error: handleAjaxError
	});
}

//// FILE UPLOAD METHODS
//var fileData = [];
//var errorData = [];
//var processCount = 0;
//
//
//function processData(){
//	var file = $('#employeeFile')[0].files[0];
//	readFileData(file, readFileDataCallback);
//}
//
//function readFileDataCallback(results){
//	fileData = results.data;
//	uploadRows();
//}
//
//function uploadRows(){
//	//Update progress
//	updateUploadDialog();
//	//If everything processed then return
//	if(processCount==fileData.length){
//		return;
//	}
//
//	//Process next row
//	var row = fileData[processCount];
//	processCount++;
//
//	var json = JSON.stringify(row);
//	var url = getEmployeeUrl();
//
//	//Make ajax call
//	$.ajax({
//	   url: url,
//	   type: 'POST',
//	   data: json,
//	   headers: {
//       	'Content-Type': 'application/json'
//       },
//	   success: function(response) {
//	   		uploadRows();
//	   },
//	   error: function(response){
//	   		row.error=response.responseText
//	   		errorData.push(row);
//	   		uploadRows();
//	   }
//	});
//
//}
//
//function downloadErrors(){
//	writeFileData(errorData);
//}

//UI DISPLAY METHODS

function displayBrandList(data){
console.log("displaying brand")
	let index=1;
	var $tbody = $('#brand-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];
		// var buttonHtml = '<button onclick="deleteBrand(' + e.id + ')">delete</button>'
		var buttonHtml = ' <button title="Edit" class="btn" onclick="displayEditBrand(' + e.id + ')"><img src="'+getBaseUrl()+'/static/images/edit1.png" alt="Edit" /></button>'
		var row = '<tr>'
		+ '<td>' + index++ + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td>'  + e.category + '</td>'
		+ '<td class="supervisor-only text-center">' + buttonHtml + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
	verifyRole();
}

function displayEditBrand(id){
	var url = getBrandUrl() + "/" + id;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayBrand(data);
	   },
	   error: handleAjaxError
	});
}

//function resetUploadDialog(){
//	//Reset file name
//	var $file = $('#employeeFile');
//	$file.val('');
//	$('#employeeFileName').html("Choose File");
//	//Reset various counts
//	processCount = 0;
//	fileData = [];
//	errorData = [];
//	//Update counts
//	updateUploadDialog();
//}
//
//function updateUploadDialog(){
//	$('#rowCount').html("" + fileData.length);
//	$('#processCount').html("" + processCount);
//	$('#errorCount').html("" + errorData.length);
//}
//
//function updateFileName(){
//	var $file = $('#employeeFile');
//	var fileName = $file.val();
//	$('#employeeFileName').html(fileName);
//}
//
function displayUploadData(){
 	resetUploadDialog();
	$('#upload-employee-modal').modal('toggle');
}

function displayBrand(data){
	$("#brand-edit-form input[name=name]").val(data.name);
	$("#brand-edit-form input[name=category]").val(data.category);
	$("#brand-edit-form input[name=id]").val(data.id);
	$('#edit-brand-modal').modal('toggle');
}




//INITIALIZATION CODE
function init(){
	$('#add-brand-confirm').click(addBrand);
	$('#update-brand').click(updateBrand);
	$('#create-brand').click(createBrand);
	$('#refresh-data').click(getBrandList);
	$('#upload-data').click(displayUploadData);
//	$('#process-data').click(processData);
//	$('#download-errors').click(downloadErrors);
//    $('#employeeFile').on('change', updateFileName)
	let element = document.querySelector("#brand-link");
	element.classList.add("active");
	
}

$(document).ready(init);
$(document).ready(getBrandList);

