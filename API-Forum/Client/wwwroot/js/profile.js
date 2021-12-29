
$(document).ready(function () {
    console.log(id);
    $.ajax({
        url: "/Users/ProfileUser/" + $('#id').val(),
        success: function (result) {
            console.log(result);/*
            $('#id').val(result.userId);*/
            $('#firstName').val(result.firstName);
            $('#lastName').val(result.lastName);
            $('#phone').val(result.phone);
            var date = result.birthDate.substr(0, 10);
            $('#birthDate').val(date);
            $('#email').val(result.email);
            if (result.gender == 0) {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            }
        }
    })
})

function ValidateUpdate(id) {
    var ini = $("#update1").valid();
    console.log(ini);

    if (ini === true) {
        update(id);
    }
    else {
        Swal.fire(
            'Failed!',
            'Please enter all fields.',
            'error'
        );
    }
};

function update(id) {
    console.log(id);
    var obj = new Object();

    obj.userId = id;
    obj.firstName = $('#firstName').val();
    obj.lastName = $('#lastName').val();
    obj.phone = $('#phone').val();
    obj.birthDate = $('#birthDate').val();
    obj.email = $('#email').val();
    obj.gender = parseInt($('#gender').val());

    console.log(obj);
    $.ajax({
        url: "Put/",
        type: "PUT",
        data: { id: id, entity: obj },
        dataType: 'json'
    }).done((result) => {
        console.log(result);
        if (result == 200) {
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            ).then(function () {
                window.location = "/Users/Profile";
            });
        }
    }).fail((error) => {
        console.log(error);
        Swal.fire(
            'Failed!',
            'Your file has been fail to updated.',
            'error'
        );
    })
}

function ValidateUpdateA(id) {
    var ini = $("#update1").valid();
    console.log(ini);

    if (ini === true) {
        updateAdmin(id);
    }
    else {
        Swal.fire(
            'Failed!',
            'Please enter all fields.',
            'error'
        );
    }
};

function updateAdmin(id) {
    console.log(id);
    var obj = new Object();

    obj.userId = id;
    obj.firstName = $('#firstName').val();
    obj.lastName = $('#lastName').val();
    obj.phone = $('#phone').val();
    obj.birthDate = $('#birthDate').val();
    obj.email = $('#email').val();
    obj.gender = parseInt($('#gender').val());

    console.log(obj);
    $.ajax({
        url: "Put/",
        type: "PUT",
        data: { id: id, entity: obj },
        dataType: 'json'
    }).done((result) => {
        console.log(result);
        if (result == 200) {
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            ).then(function () {
                window.location = "/Users/ProfileAdmin";
            });
        }
    }).fail((error) => {
        console.log(error);
        Swal.fire(
            'Failed!',
            'Your file has been fail to updated.',
            'error'
        );
    })
}