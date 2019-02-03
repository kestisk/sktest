
var VEHICLE_ROW_TEMPLATE = '<tr><td>#PLATE</td><td>#NICKNAME</td><td>#BRAND</td><td>#MODEL</td><td>#YEAR</td><td>#TYPE</td><td>#COLOR</td><td style="width:8%!important;text-align:center!important"><i id="#ID" style="cursor:pointer;" class="fas fa-trash orangered"></i></td><td> <input id="#IDM" type="button" value="UPDATE" /></td></tr>';

jQuery(document).ready(function () {
    makeAjaxGetRequest(API_BASE_ADDRESS + 'GetVehicle', null, successfull, errorOccured);
});
function Save() {
    let requestData = GetRequestData();
    if (validateRequestData(requestData)) {
        makeAjaxPostRequest(API_BASE_ADDRESS + 'Save', GetRequestData(), SaveSuccessfull, errorOccured);
    }
}
function SaveSuccessfull() {
    makeAjaxGetRequest(API_BASE_ADDRESS + 'GetVehicle', null, successfull, errorOccured);
}
function GetRequestData() {
    var request = {
        Plate: document.getElementById("Plate_Text").value,
        Nickname: document.getElementById("Nickname_Text").value,
        Brand: document.getElementById("Brand_Text").value,
        Model: document.getElementById("Model_Text").value,
        Year: document.getElementById("Year_Text").value,
        Type: document.getElementById("Type_Text").value,
        Color: document.getElementById("Color_Text").value
    };
    return request;
}
function validateRequestData() {
    let plate = document.getElementById("Plate_Text").value;
    if (!plate) {
        alert("Plate cannot be empty!");
        return false;
    }
   let nickname= document.getElementById("Nickname_Text").value;
    if (!nickname) {
        alert("Nickname cannot be empty!");
        return false;
    }
  let  brand= document.getElementById("Brand_Text").value;
    if (!brand) {
        alert("Brand cannot be empty!");
        return false;
    }
  let  model= document.getElementById("Model_Text").value;
     if (!model) {
         alert("Model cannot be empty!");
         return false;
    }  
    let  year=document.getElementById("Year_Text").value;
    if (!year) {
        alert("Year cannot be empty!");
        return false;
    }         
   let type= document.getElementById("Type_Text").value;
    if (!type) {
        alert("Type cannot be empty!");
        return false;
    }
  let  color= document.getElementById("Color_Text").value;
    if (!color) {
        alert("Color cannot be empty!");
        return false;
    }
    return true;
}

    function search() {
        var input, filter, tr, td, i;
        input = $("#searchInput");
        filter = input.val().toUpperCase();

        tr = document.getElementById("Vehicle_Table").getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            tr[i].style.backgroundColor = "white";
            td = tr[i].getElementsByTagName("td")[1]; // By Nickname
            if (td && filter) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.backgroundColor = "red";
                }
            }
        }
    }
    function errorOccured(response) {
        alert("Hata oluştu");
    }

    function successfull(response) {

        $("#Vehicle_Table").find("tr:gt(0)").remove();
        for (var i = 0; i < response.length; i++) {
            var newRow = VEHICLE_ROW_TEMPLATE.replace("#PLATE", response[i].Plate)
                .replace("#NICKNAME", response[i].Nickname)
                .replace("#BRAND", response[i].Brand)
                .replace("#MODEL", response[i].Model)
                .replace("#YEAR", response[i].Year)
                .replace("#TYPE", response[i].Type)
                .replace("#ID", response[i].Id)
                .replace("#IDM", response[i].Id)
                .replace("#COLOR", response[i].Color);
            $("#Vehicle_Table").append(newRow);
        }
        $("#Vehicle_Table i").click(function (event) {
            let recordIdToBeCancelled = event.target.id;
            makeAjaxPostRequest(API_BASE_ADDRESS + 'Delete', { Id: recordIdToBeCancelled }, deleteSuccessfull, deleteFailed);
        });
        $("#Vehicle_Table input").click(function (event) {
            let recordIdToBeUpdate = event.target.id;
            makeAjaxPostRequest(API_BASE_ADDRESS + 'UpdateVehicle', { Id: recordIdToBeUpdate }, Updatesuccessfull, UpdateerrorOccured);
        });
    }

    function deleteSuccessfull(response) {
        alert("OK");
        makeAjaxGetRequest(API_BASE_ADDRESS + 'Getvehicle', null, successfull, errorOccured);
    }

    function deleteFailed(response) {
        alert("Hata oluştu");

    }

    function Updatesuccessfull(response) {
        document.getElementById("Plate_Text").value = response[0].Plate;
        document.getElementById("Nickname_Text").value = response[0].Nickname;
        document.getElementById("Brand_Text").value = response[0].Brand;
        document.getElementById("Model_Text").value = response[0].Model;
        document.getElementById("Year_Text").value = response[0].Year;
        document.getElementById("Type_Text").value = response[0].Type;
        document.getElementById("Color_Text").value = response[0].Color;
        makeAjaxGetRequest(API_BASE_ADDRESS + 'Getvehicle', 5, successfull, errorOccured);
    }
    function UpdateerrorOccured() {
        alert("Hata oluştu");
    }