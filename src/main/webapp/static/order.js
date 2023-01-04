console.log("Order running");

let orderForm = document.querySelector("#order-form");
let addItem = document.querySelector("#add-item");
var index=2;

addItem.addEventListener("click", (e) => {
    let newItem = `<div class="form-group">
                                      <div class="form-group">
                                          <label for=${"inputBarcode-"+index} class="col-sm-2 col-form-label">Barcode</label>
                                          <div class="col-sm-10">
                                              <input type="text" class="form-control input-barcode" name="barcode" id=${"inputBarcode-"+index}
                                                     placeholder="enter barcode">
                                          </div>
                                      </div>
                                      <div class="form-group">
                                          <label for=${"inputQuantity-"+index} class="col-sm-2 col-form-label">Quantity</label>
                                          <div class="col-sm-10">
                                              <input type="number" class="form-control input-quantity" name="quantity" id=${"inputQuantity-"+index}
                                                     placeholder="enter quantity">
                                          </div>
                                      </div>
                                      <button type="button" class="btn btn-warning remove-item" id=${"removeItem-"+index}> - </button>
                                  </div>`;

    let orderForm = document.querySelector("#order-form");
    console.log(orderForm.lastEme)
    orderForm.lastElementChild.insertAdjacentHTML("beforebegin",newItem);
    index++;

    //removing parameter
    let removeItem=document.getElementsByClassName("remove-item");
    console.log(removeItem);
    for(elem of removeItem){
        elem.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
        })
    }
})



function getOrderUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/order";
}

//BUTTON ACTIONS
function addOrder(event){
	//Set the values to update
	var $rawForm = $("#order-form");	

	var json = convertJson($rawForm);
	var url = getOrderUrl();
	console.log(json);

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
	   		getOrderList();  
	   },
	   error: handleAjaxError
	});
//	location.reload();

	return false;
}

// function orderDetails(event){

//     console.log("update running...");
// 	$('#order-items-modal').modal('toggle');
// 	//Get the ID
// 	var id = $("#brand-edit-form input[name=id]").val();
// 	var url = getBrandUrl() + "/" + id;


// 	//Set the values to update
// 	var $form = $("#brand-edit-form");
// 	var json = toJson($form);

// 	$.ajax({
// 	   url: url,
// 	   type: 'PUT',
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


function getOrderList(){
	var url = getOrderUrl();
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayOrderList(data);  
	   },
	   error: handleAjaxError
	});
}

//HELPER FUNCTIONS
function convertJson($form){
    var serialized = $form.serializeArray();
    console.log("look ",serialized);
    var s = '';
	var arr = [];
    
    for(let i=0;i<serialized.length;i+=2){
		let data = {};
        data[serialized[i]['name']] = serialized[i]['value'];
		data[serialized[s+1]['name']] = serialized[i+1]['value'];
		arr.push(data);
    }
    var json = JSON.stringify(arr);
    return json;
}

//UI DISPLAY METHODS

function displayOrderList(data){
	var $tbody = $('#order-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];

		var newDate = new Date(e.date);
		var buttonHtml = '<button onclick="displayOrderDetails(' + e.id + ')">Details</button>'
		buttonHtml += ' <button onclick="displayEditOrder(' + e.id + ')">Edit</button>'
		var row = '<tr>'
		+ '<td>' + e.id + '</td>'
		+ '<td>' + newDate.toString() + '</td>'
		+ '<td>'  + e.amount + '</td>'
		+ '<td>' + buttonHtml + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
}
function displayOrderDetails(id){
	var url = getOrderUrl() + "/" + id;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayOrder(data);
	   },
	   error: handleAjaxError
	});
}

function displayUploadData(){
 	resetUploadDialog(); 	
	$('#upload-order-modal').modal('toggle');
}

function displayOrder(data){
	console.log(data);
	var $orderId = document.querySelector("#order-id")
	console.log($orderId);
	$orderId.innerText = `Order Id: ${data[0].orderId}`;
	var $tbody = $('#order-items-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];
		var row = '<tr>'
		+ '<td>' + e.barcode + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td>'  + e.quantity + '</td>'
		+ '<td>'  + e.amount + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}	
	$('#order-items-modal').modal('toggle');
}


//INITIALIZATION CODE
function init(){
	$('#add-order').click(addOrder);
	$('#refresh-data').click(getOrderList);
	$('#upload-data').click(displayUploadData);
	// $('#process-data').click(processData);
	// $('#download-errors').click(downloadErrors);
    // $('#orderFile').on('change', updateFileName)
}

$(document).ready(init);
$(document).ready(getOrderList);













