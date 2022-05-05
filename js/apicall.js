


$(document).ready(function(){
    $(".btn").click(function(){
        const title = $(".my-title").val()
        if (title !== '') {
            console.log(title);
            callAPI(title);
        } else {
            console.log('title is empty');
        }
    });
  });




function callAPI(title) {
    $.ajax({
        url: 'https://l3y9dqs7gc.execute-api.us-west-2.amazonaws.com/dev',
        type: 'POST',
        dataType: 'json',
        data: {'prompt': title},
        success: (result, status, xhr)=> {
            console.log(result);
            console.log(typeof(result));
        },
        error: (xhr, status, error)=> {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }

    });
};