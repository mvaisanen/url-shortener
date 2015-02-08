$( document ).ready(function() {
    console.log( "ready!" );

    $('form').submit(function (event) {
    	event.preventDefault();

        var valid = true,
            message = "";
        // Get data without any spaces.
        var data = $('form input[type=text]').val().replace(/\s/g, ''); 

        if (data == "") {
            message = ('<p>I see no url. Where is it?</p>')
            valid = false;
        }
        else if (data.slice(0,7) !== "http://" && data.slice(0,8) !== "https://" && data.slice(0,6) !== "ftp://") {
            message = '<p>No protocol (http://).</p>'
            valid = false;
        }
        
        if (!valid) {
            $('.tiny-url').html('<p><strong>ERROR:</strong>' + message).addClass('error');
        }
        else {
            $.ajax({
                // url: 'http://localhost:5000/shorten/', // Development
                url: 'http://ur1s.herokuapp.com/shorten/', // Production
                type: 'POST',
                data: $('form').serialize(),
                cache: 'false',
                success: function(data) {
                    console.log(data);
                    $('.tiny-url').html(data).removeClass('error');
                },
                error: function(err) {
                    console.log(err.responseText);
                    console.log("Err");
                    $('.tiny-url').html(err.responseText).addClass('error');
                }
            });
        }
    	
    });
});
