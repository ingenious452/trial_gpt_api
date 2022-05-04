


$(document).ready(function(){
    $(".btn").click(function(){
        const title = $(".my-title").val()
        if (title !== '') {
            console.log(title);
        } else {
            console.log('title is empty');
        }
    });
  });


  function addData(){
    $.ajax({
            type: "POST",
            url: "http://example.com",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                alert(success);
            },

            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail' + status.code);
            }
         });
   }
