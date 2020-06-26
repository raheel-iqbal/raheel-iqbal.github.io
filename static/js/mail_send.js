function validateEmail(email)
{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function send_mail() {
    var name = jQuery("#form_name").val();
    var email = jQuery("#form_email").val();
    var message = jQuery("#form_message").val();
    var flag = 0;

    console.log(validateEmail(email))

    if (name == "") {
        jQuery("#form_name").addClass('invalid');
        flag = 1;
    } else {
        jQuery("#form_name").removeClass('invalid');
        jQuery("#val_user_name").html("");
    }

    if (email == "") {
        jQuery("#form_email").addClass('invalid');
        flag = 1;
    } else if (!validateEmail(email)) {
        jQuery("#form_email").addClass('invalid');
        flag = 1;
    } else {
        jQuery("#form_email").removeClass('invalid');
    }

    if (message == "") {
        jQuery("#form_message").addClass('invalid');
        flag = 1;
    } else {
        jQuery("#form_message").removeClass('invalid');
    }

    if (flag == 1) {
        return false;
    }

    return fetch("https://nodesendmailer.herokuapp.com/",
        {
            headers:
                {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                },
            method: "POST",
            body: JSON.stringify(
                {
                    from: document.getElementById("form_email").value,
                    name: document.getElementById("form_name").value,
                    text: document.getElementById("form_message").value
                })
        }).then(function (e)
    {
        jQuery("#contact-form").find(".messages").html('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Message Sent!</div>');
        jQuery("#contact-form")[0].reset();
    }).catch(function (e)
    {
        jQuery("#contact-form").find(".messages").html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Error Sending!</div>');
        jQuery("#contact-form")[0].reset();
    })

}


