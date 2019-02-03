var API_BASE_ADDRESS = "../api/test/";
function makeAjaxGetRequest(service, successfull) {
    debugger;
    makeAjaxCall(service, successfull,'GET');
}
function makeAjaxPostRequest(service, successfull) {
    makeAjaxCall(service, successfull,'POST');
}

function makeAjaxCall(service, successfull, methodType) {
    $.ajax({
        type: methodType ? methodType : 'POST',
        url: service,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (successfull) {
                successfull(response);
            }
        },
        error: function (error) {
            if (errorCallBack) {
                var response = {
                    IsSuccessful: false,
                    Result: error
                }
                errorCallBack(response);
            }
        }
    });
}


