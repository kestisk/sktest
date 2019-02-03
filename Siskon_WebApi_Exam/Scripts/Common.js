var API_BASE_ADDRESS = "../api/Vehicle/";

function makeAjaxGetRequest(service, requestMessage, successfulCallBack, errorCallBack) {
    makeAjaxCall(service, requestMessage, successfulCallBack, errorCallBack, 'GET');
}

function makeAjaxPostRequest(service, requestMessage, successfulCallBack, errorCallBack) {
    makeAjaxCall(service, requestMessage, successfulCallBack, errorCallBack, 'POST');
}

function makeAjaxCall(service, requestMessage, successfulCallBack, errorCallBack, methodType) {
    
    $.ajax({
        type: methodType ? methodType : 'POST',
        url: service,
        dataType: 'json',
        data: JSON.stringify(requestMessage),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
           if (successfulCallBack) {
                successfulCallBack(response);
            }
        },
        error: function (error) {
            if (errorCallBack) {
                var response = {
                    IsSuccessful: false,
                    Result: error
                };
                errorCallBack(response);
            }
        }
    });
}


