


$(document).ready(function(){
    $(".btn").click(function(){
        const title = $(".my-title").val()
        if (title !== '') {
            // console.log(title);
            const content = tinymce.get('text').getContent({format: 'text'});
            // console.log(tinymce.activeEditor.getContent())
            // console.log('This is content', content)
            callAPI(title, content);

        } else {
            console.log('title is empty');
        }
    });
    $(document).ajaxStart(function () {
        $("#spinner").css('display', 'block');
        $("#spinner-text").css('display', 'none');
    });
  
    $(document).ajaxStop(function () {
        $("#spinner").css('display', 'none');
        $("#spinner-text").css('display', 'block');
    });
  });




function callAPI(title, content) {
    $.ajax({
        url: 'https://46rc60js1j.execute-api.us-west-2.amazonaws.com/prod',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"body": {"model_name": "davinci","title": title, "content": content}}),
        headers : {"Content-Type": "application/json"},
        success: (result, status, xhr)=> {
            console.log('This is result', result);
            output = JSON.parse(result['body'])

            if (result['statusCode'] != 200) {
                alert(output['error'])
            }
            tinymce.get('text').setContent(output['output'])
        },
        error: (xhr, status, error)=> {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }

    });
};