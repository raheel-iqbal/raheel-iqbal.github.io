function validateEmail(email)
{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function send_mail() {
    var name = jQuery("#name").val();
    var email = jQuery("#email").val();
    var message = jQuery("#message").val();
    var flag = 0;
    
    if (name == "") {
        jQuery("#name").addClass('invalid');
        flag = 1;
    } else {
        jQuery("#name").removeClass('invalid');
        jQuery("#val_user_name").html("");
    }

    if (email == "") {
        jQuery("#email").addClass('invalid');
        flag = 1;
    } else if (!validateEmail(email)) {
        jQuery("#email").addClass('invalid');
        flag = 1;
    } else {
        jQuery("#email").removeClass('invalid');
    }

    if (message == "") {
        jQuery("#message").addClass('invalid');
        flag = 1;
    } else {
        jQuery("#message").removeClass('invalid');
    }

    if (flag == 1) {
        return false;
    }

    

}


