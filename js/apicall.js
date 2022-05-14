

let previousTitle = ''
$(document).ready(function(){
    $(".btn").click(function(){
        const title = $(".my-title").val()
        
        if (title !== '') {
            // console.log(title);
            if (title != previousTitle) {
                previousTitle = title;
                tinymce.get('text').setContent('')
            }
            const content = tinymce.get('text').getContent({format: 'text'});
            console.log(content)
          
            // console.log(tinymce.activeEditor.getContent())
            // console.log('This is content', content)
            callAPI(previousTitle, title, content);

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




function callAPI(previousTitle, title, content) {
    $.ajax({
        url: 'https://46rc60js1j.execute-api.us-west-2.amazonaws.com/prod',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"body": {"model_name": "text-davinci-001","title": title, "content": content}}),
        headers : {"Content-Type": "application/json"},
        success: (result, status, xhr)=> {
   
            console.log('This is result', result);
            output = JSON.parse(result['body'])
            
            if (result['statusCode'] != 200) {
                alert(output['error'])
            } else {
                // content = content.replace(/<br><br>/g, '<br><br>')
                
                output['content'] = output['content'].replace(/\n\n/g, '<br>')

            
                if (content == "") {
                    console.log('Only Title was provided')
                    console.log(output['content'])
                    tinymce.get('text').setContent(output['content'])
             
                } else {
                    console.log('Title and content was provide')
                    console.log('-'*80);
                    
                    console.log(output['content'])
                    console.log('-'*80);
                    console.log(content + output['content'])
                    // if (title == previousTitle) {
                        console.log(tinymce.get('text').getContent())
                        console.log(output['content'])
                        tinymce.get('text').setContent(tinymce.get('text').getContent() + output['content']);
                        // tinymce.get('text').setContent(content +  '<br><br>' + output['content'])

                    // console.log(previousTitle, title)
                    // } else {
                    //     previousTitle = title;
                    //     tinymce.get('text').setContent(output['content'])
                    // }


                }
            }
        },
        error: (xhr, status, error)=> {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }

    });
};