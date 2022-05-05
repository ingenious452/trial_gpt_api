


$(document).ready(function(){
    $(".btn").click(function(){
        const title = $(".my-title").val()
        if (title !== '') {
            console.log(title);
            content = tinymce.get('text').getContent({format: 'text'});
            // console.log(tinymce.activeEditor.getContent())
            console.log('This is content', content)
            callAPI(title);
            $('#text').val()
        } else {
            console.log('title is empty');
        }
    });
    $(document).ajaxStart(function () {
        $("#spinner").show();
        $("#spinner-text").hide();
    });
  
    $(document).ajaxStop(function () {
        $("#spinner").hide();
        $("#spinner-text").show();
    });
  });




function callAPI(title) {
    $.ajax({
        url: 'https://7j1jbr1066.execute-api.us-west-2.amazonaws.com/dev',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"prompt": title}),
        headers : {"Content-Type": "application/json"},
        success: (result, status, xhr)=> {
            console.log('This is result', result);
            // console.log(JSON.parse(result))
            // console.log(JSON.parse(result))
            tinymce.get('text').setContent(result['text'])
            // console.log($('#text').val())

        },
        error: (xhr, status, error)=> {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }

    });
};