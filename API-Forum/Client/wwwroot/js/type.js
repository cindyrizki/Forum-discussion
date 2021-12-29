$(document).ready(function () {
    $('#tableType').DataTable({
        'ajax': {
            'url': "/TypeDiscussions/GetAll",
            'order': [[0, 'asc']],
            'dataSrc': ''
        },
        'columns': [
            {
                data: 'no', name: 'id', render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "typeId"
            },
            {
                "data": "typeName"
            },
            {
                "data": " ",
                "render": function (data, type, row, meta) {
                    var button = '<td>' +
                        '<button type="button" onclick="getType(' + row['typeId'] + ');"  class="btn btn-success text-center" data-toggle="modal" href="#modalType"><i class="fa fa-edit"></i></button>' + ' ' +
                        '<button type="button" onclick="deleteType(' + row['typeId'] + ');" class="btn btn-danger text-center"><i class="fa fa-trash"></i></button>' +
                        '</td > ';
                    return button;
                }
            }
        ]
    });
});

$(document).ready(function () {
    $("#formType").validate({
        rules: {
            typeName: "required"
        },
        messages: {
            typeName: "Please input Type Name"
        },
        submitHandler: function () {
            var obj = new Object();
            obj.TypeName = $('#typeName').val();
            console.log(obj);
            $.ajax({
                url: "/TypeDiscussions/TypeDiscussion",
                'type': 'POST',
                'data': { entity: obj },
                'dataType': 'json',
            }).done((result) => {
                if (result == 200) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Data Berhasil Ditambahkan!!",
                        icon: "success",
                        button: "Okey!",
                    }).then(function () {
                        window.location = "/TypeDiscussions";
                    });
                    $('#typeName').val("");
                } else if (result == 400) {
                    Swal.fire({
                        title: "Failed!",
                        text: "Data Gagal Dimasukan!!",
                        icon: "error",
                        button: "Close",
                    });
                }
            }).fail((error) => {
                Swal.fire({
                    title: "Failed!",
                    text: "Data Gagal Dimasukan!!",
                    icon: "error",
                    button: "Close",
                });
            });
        }
    });
});

function getType(TypeId) {
    $.ajax({
        url: "/TypeDiscussions/Get/" + TypeId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            $('#typeId').val(result.typeId);
            $('#typeName').val(result.typeName);
            $('#formType1').show();
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            Swal.fire({
                title: "FAILED",
                text: "DATA TIDAK DITEMUKAN!",
                icon: "error"
            });
        }
    });
    return false;
}

function updateType() {
    var typeId = $('#typeId').val();
    var obj = new Object();
    obj.TypeId = $("#typeId").val();
    obj.TypeName = $("#typeName").val();
    $.ajax({
        url: "/TypeDiscussions/Put/",
        type: "PUT",
        data: { id: typeId, entity: obj },
        success: function (result) {
            console.log(obj);
            $('#typeName').val("");
            Swal.fire({
                title: "Good job!",
                text: "DATA BERHASIL DIUPDATE!!",
                icon: "success",
                button: "Okey!",
            })
            $('#tableType').DataTable().ajax.reload();
        },
        error: function (errormessage) {
            Swal.fire({
                title: "Failed!",
                text: "DATA GAGAL DIUPDATE!!",
                icon: "error",
                button: "Close",
            });
        }
    });
}

function deleteType(TypeId) {
    Swal.fire({
        title: "Are you sure?",
        text: "Hapus Data Ini !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/TypeDiscussions/Delete/" + TypeId,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                dataType: "json",
                data: { "": TypeId },
                success: function (result) {
                    Swal.fire({
                        title: "Good job!",
                        text: "DATA BERHASIL DIHAPUS!!",
                        icon: "success",
                        button: "Okey!",
                    }).then(function () {
                        window.location = "/TypeDiscussions";
                    });
                },
                error: function (errormessage) {
                    Swal.fire({
                        title: "Failed!",
                        text: "DATA GAGAL DIHAPUS!!",
                        icon: "error",
                        button: "Close",
                    });
                }
            });
        } else {
            Swal.fire({
                text: "DATA GAGAL DIHAPUS!!"
            });
        }
    });
}