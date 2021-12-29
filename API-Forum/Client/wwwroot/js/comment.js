$.ajax({
    url: "/Users/GetAll",
    success: function (result) {
        console.log(result);
        var name = "";
        $.each(result, function (key, val) {
            name += `<option value="${val.userId}">${val.firstName}</option>`
        });
        $("#userId").html(name);
    }
})

$.ajax({
    url: "/Discussions/GetAll",
    success: function (result) {
        console.log(result);
        var content = "";
        $.each(result, function (key, val) {
            content += `<option value="${val.disId}">${val.content}</option>`
        });
        $("#disId").html(content);
    }
})

$(document).ready(function () {
    $("#formComment").validate({
        rules: {
            contentComment: "required",
            dateCom: "required",
            userId: "required",
            disId: "required"
        },
        messages: {
            contentComment: "isi",
            dateCom: "isi",
            userId: "isi",
            disId: "isi"
        },
        submitHandler: function () {
            var obj = new Object();
            obj.Content = $("#contentComment").val();
            obj.DateComment = $("#dateCom").val();
            obj.UserId = $("#userId").val();
            obj.DisId = $("#disId").val();
            console.log(obj);
            $.ajax({
                url: "/Comments/Comment/",
                'type': 'POST',
                'data': { entity: obj },
                'dataType': 'json',
            }).done((result) => {
                if (result == 200) {
                    swal({
                        title: "Good job!",
                        text: "Data Berhasil Ditambahkan!!",
                        icon: "success",
                        button: "Okey!",
                    }).then(function () {
                        window.location = "/Comments";
                    });
                    $("#contentComment").val("");
                    $("#dateCom").val("");
                    $("#userId").val("");
                    $("#disId").val("");
                } else if (result == 400) {
                    swal({
                        title: "Failed!",
                        text: "Data Gagal Dimasukan!!",
                        icon: "error",
                        button: "Close",
                    });
                }
            }).fail((error) => {
                swal({
                    title: "Failed!",
                    text: "Data Gagal Dimasukan!!",
                    icon: "error",
                    button: "Close",
                });
            });
        }
    });
});

