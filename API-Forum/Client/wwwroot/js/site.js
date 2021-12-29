$.ajax({
    url: "https://localhost:44312/API/Users",
    success: function (result) {
        console.log(result);
    }
});

$(document).ready(function () {
    $("#register").validate({
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            phone: {
                required: true
            },
            birthDate: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true
            }
        },
        errorPlacement: function (error, element) { },
        highlight: function (element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-control').removeClass('is-invalid');
        }
    });

    $("#reset").validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: true
            }
        },
        errorPlacement: function (error, element) { },
        highlight: function (element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-control').removeClass('is-invalid');
        }
    });


});



function Valid() {
    var ini = $("#register").valid();
    console.log(ini);

    if (ini === true) {
        insertData();
    }
    else {
        Swal.fire(
            'Failed!',
            'Please enter all fields.',
            'error'
        );
    }
}

function ValidR() {
    var ini = $("#reset").valid();
    console.log(ini);

    if (ini === true) {
        resetPassword();
    }
    else {
        Swal.fire(
            'Failed!',
            'Please enter all fields.',
            'error'
        );
    }
}

function clearTextBox() {
    $('#firstName').val("");
    $('#lastName').val("");
    $('#phone').val("");
    $('#birthDate').val("");
    $('#gender').val(0);
    $('#email').val("");
    $('#password').val("");
    $('#firstName').css('border-color', 'lightgrey');
    $('#lastName').css('border-color', 'lightgrey');
    $('#phone').css('border-color', 'lightgrey');
    $('#birthDate').css('border-color', 'lightgrey');
    $('#gender').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#password').css('border-color', 'lightgrey');
}

function insertData() {
    var obj = new Object();

    obj.FirstName = $('#firstName').val();
    obj.LastName = $('#lastName').val();
    obj.Phone = $('#phone').val();
    obj.BirthDate = $('#birthDate').val();
    obj.Gender = parseInt($('#gender').val());
    obj.Email = $('#email').val();
    obj.Password = $('#password').val();

    console.log(obj);
    $.ajax({
        url: "Registers/Register",
        type: "POST",
        data: { entity: obj },
        dataType: 'json'
    }).done((result) => {
        console.log(result);
        Swal.fire(
            'Your account has been created.',
            'Please sign in to enter forum',
            'success'
        );
        clearTextBox();
    }).fail((error) => {
        console.log(error);
    });
}

function resetPassword() {
    var obj = new Object();

    obj.Email = $('#email').val();
    obj.Password = $('#password').val();

    console.log(obj);
    $.ajax({
        url: "ResetPassword",
        type: "PUT",
        data: { entity: obj },
        dataType: 'json'
    }).done((result) => {
        console.log(result);
        if (result == 200) {
            Swal.fire(
                'Your password has been updated.',
                'Please sign in to enter forum',
                'success'
            ).then(function () {
                window.location = "/Logins";
            });
            clearTextBox();
        } else if (result == 404) {
            Swal.fire(
                'Failed!',
                'Your email is not registered.',
                'error'
            ).then(function () {
                window.location = "/Logins/Reset";
            });
            clearTextBox();
        }
    }).fail((error) => {
        console.log(error);
    });
}