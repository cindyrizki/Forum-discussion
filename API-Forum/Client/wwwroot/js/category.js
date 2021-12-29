$(document).ready(function () {
    $('#tableCategory').DataTable({
        'ajax': {
            'url': "/Categories/GetAll",
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
                "data": "categoryId"
            },
            {
                "data": "categoryName"
            },
            {
                "data": " ",
                "render": function (data, type, row, meta) {
                    var button = '<td>' +
                        '<button type="button" onclick="getCategory(' + row['categoryId'] + ');"  class="btn btn-success text-center" data-toggle="modal" href="#modalCategory"><i class="fa fa-edit"></i></button>' + ' ' +
                        '<button type="button" onclick="deleteCategory(' + row['categoryId'] + ');" class="btn btn-danger text-center"><i class="fa fa-trash"></i></button>' +
                        '</td > ';
                    return button;
                }
            }
        ]
    });
});

$(document).ready(function () {
    $("#formCategory").validate({
        rules: {
            categoryName: "required"
        },
        messages: {
            categoryName: "Please input Category Name"
        },
        submitHandler: function () {
            var obj = new Object();
            obj.CategoryName = $('#categoryName').val();
            console.log(obj);
            $.ajax({
                url: "/Categories/Category",
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
                        window.location = "/Categories";
                    });

                    $('#categoryName').val("");
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

function getCategory(CategoryId) {
    $.ajax({
        url: "/Categories/Get/" + CategoryId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            $('#categoryId').val(result.categoryId);
            $('#categoryName').val(result.categoryName);
            $('#formCat').show();
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

function updateCategory() {
    var categoryId = $('#categoryId').val();
    var obj = new Object();
    obj.CategoryId = $("#categoryId").val();
    obj.CategoryName = $("#categoryName").val();
    $.ajax({
        url: "/Categories/Put/",
        type: "PUT",
        data: { id: categoryId, entity: obj },
        success: function (result) {
            console.log(obj);
            $('#categoryName').val("");
            Swal.fire({
                title: "Good job!",
                text: "DATA BERHASIL DIUPDATE!!",
                icon: "success",
                button: "Okey!",
            })
            $('#tableCategory').DataTable().ajax.reload();
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

function deleteCategory(CategoryId) {
    Swal.fire({
        title: "Are you sure?",
        text: "Hapus Data Ini !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Categories/Delete/" + CategoryId,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                dataType: "json",
                data: { "": CategoryId }
            }).done((result) => {
                console.log(result);
                Swal.fire({
                    title: "Good job!",
                    text: "DATA BERHASIL DIHAPUS!!",
                    icon: "success",
                    button: "Okey!"
                }).then(function () {
                    window.location = "/Categories";
                });
            }).fail((error) => {
                console.log(error);
                Swal.fire({
                    title: "Failed!",
                    text: "DATA GAGAL DIHAPUS!!",
                    icon: "error",
                    button: "Close"
                });
            });
        }
        else {
            Swal.fire({
                text: "DATA GAGAL DIHAPUS!!"
            });
        }
    });
}