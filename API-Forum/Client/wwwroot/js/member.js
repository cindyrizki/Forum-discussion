$.ajax({
    url: "/Users/GetLanding/",
    success: function (result) {
        console.log(result);
        var listSerah = "";
        $.each(result, function (key, val) {
            listSerah += `
<section class="py-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="h2 font-weight-bold">${val.title}</h6>
                        <div class="d-flex justify-content-between py-3 px-5">
                          <div class="row comment">
                                <span class="text-body font-weight-bold">By. ${val.firstName} ${val.lastName}</span>
                          </div>
                          <div class="row time text-muted align-self-center">
                                <span class="text-body pt-1 mr-3">${val.categoryName}</span>
                          </div>
                          <div class="row time text-muted align-self-center">
                                <i class="far fa-clock pr-2"><span class="align-self-center"> ${val.dateDis.substr(0, 10)}</span></i>
                          </div>
                        </div>
                        <hr>
                        <p class="text-muted">
                            <h5>${val.content}</h5>
                        </p>
                        <hr>
                        <div class="d-flex justify-content-between py-3 px-5">
                            <div class="row comment">
                                <button onclick="getDiskusi(${val.disId})" class="btn btn-primary">Detail Discussion >></button>
                            </div>
                            <div class="row comment">
                                <span class="text-body pt-1 mr-3">${val.views} Views</span>
                            </div>
                        </div>
                    </div>
                </div>
</section>
`
        });
        $('#diskusi').html(listSerah);
    },
    error: function (errormessage) {
        alert(errormessage.responseText);
    }
});

$.ajax({
    url: "/Categories/GetAll",
    success: function (result) {
        console.log(result);
        var listSerah = "";
        $.each(result, function (key, val) {
            listSerah += `
<button class="btn" onclick="getDiskusiCat(${val.categoryId})">${val.categoryName}</button><br>
`
        });
        $('#category').html(listSerah);
    },
    error: function (errormessage) {
        alert(errormessage.responseText);
    }
});

function getDiskusiCat(id) {
    $.ajax({
        url: "/Users/GetDiscussionByCat/" + id,
        success: function (result) {
            console.log(result);
            var listSerah = "";
            $.each(result, function (key, val) {
                listSerah += `
<section class="py-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="h2 font-weight-bold">${val.title}</h6>
                        <div class="d-flex justify-content-between py-3 px-5">
                          <div class="row comment">
                                <span class="text-body font-weight-bold">By. ${val.firstName} ${val.lastName}</span>
                          </div>
                          <div class="row time text-muted align-self-center">
                                <span class="text-body pt-1 mr-3">${val.categoryName}</span>
                          </div>
                          <div class="row time text-muted align-self-center">
                                <i class="far fa-clock pr-2"><span class="align-self-center"> ${val.dateDis.substr(0, 10)}</span></i>
                          </div>
                        </div>
                        <hr>
                        <p class="text-muted">
                            <h5>${val.content}</h5>
                        </p>
                        <hr>
                        <div class="d-flex justify-content-between py-3 px-5">
                            <div class="row comment">
                                <button onclick="getDiskusi(${val.disId})" class="btn btn-primary">Detail Discussion >></button>
                            </div>
                            <div class="row comment">
                                <span class="text-body pt-1 mr-3">${val.views} Views</span>
                            </div>
                        </div>
                    </div>
                </div>
</section>
`
            });
            $('#diskusi').html(listSerah);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getDiskusi(id) {
    $.ajax({
        url: "/Users/GetDiscussion/" + id,
        success: function (result) {
            console.log(result);
            var listSerah = "";
            $.each(result, function (key, val) {
                var obj = new Object();
                obj.disId = val.disId;
                obj.title = val.title;
                obj.content = val.content;
                obj.dateDis = val.dateDis;
                obj.statusComt = val.statusComt;
                obj.views = parseInt(val.views + 1);
                obj.userId = parseInt(val.userId);
                obj.categoryId = parseInt(val.categoryId);
                obj.typeId = parseInt(val.typeId);
                obj.status = parseInt(val.status);

                console.log(obj);
                $.ajax({
                    url: "Discussions/Put/",
                    type: "PUT",
                    data: { id: id, entity: obj },
                    dataType: 'json'
                }).done((result) => {
                    console.log(result);
                }).fail((error) => {
                    console.log(error);
                })
                listSerah += `
<section class="py-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="h2 font-weight-bold">${val.title}</h6>
                        <div class="d-flex justify-content-between py-3 px-5">
                          <div class="row comment">
                                <span class="text-body font-weight-bold">By. ${val.firstName} ${val.lastName}</span>
                          </div>
                          <div class="row time text-muted align-self-center">
                                <span class="text-body pt-1 mr-3">${val.categoryName}</span>
                          </div>
                          <div class="row time text-muted align-self-center">
                                <i class="far fa-clock pr-2"><span class="align-self-center"> ${val.dateDis.substr(0, 10)}</span></i>
                          </div>
                        </div>
                        <hr>
                        <p class="text-muted">
                            <h5>${val.content}</h5>
                        </p>
                        <hr>
                        <div class="d-flex justify-content-between py-3 px-5">
                            <div class="row comment">
                                <button type="button" class="btn btn-secondary" onclick=window.location.reload();>Back</button>
                            </div>
                            <div class="row comment">
                                <span class="text-body pt-1 mr-3">${val.views} Views</span>
                            </div>
                        </div>
                    </div>
                </div>
</section>
`
            });
            $('#diskusi').html(listSerah);
            $.ajax({
                url: "/Users/GetCountReply/" + id,
                success: function (result) {
                    console.log(result);
                    var value = "";
                    $.each(result, function (key, val) {
                        for (let i = 0; i < result.length; i++) {
                            value += `<span class="text-body pt-1 mr-3">${val.value} Comments</span>`;
                        }
                    });
                    $('#jumlahKomen').html(value);
                    $.ajax({
                        url: "/Users/GetReplyById/" + id,
                        success: function (result) {
                            console.log(result);
                            var listSerah = "";
                            $.each(result, function (key, val) {
                                listSerah += `
                                            <section class="py-4">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="d-flex justify-content-between py-3 px-5">
                                                            <div class="row comment">
                                                                <span class="text-body font-weight-bold">By. ${val.firstName} ${val.lastName}</span>
                                                            </div>
                                                            <div class="row time text-muted align-self-center">
                                                                <i class="far fa-clock pr-2"><span class="align-self-center"> ${val.dateCom.substr(0, 10)}</span></i>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <p class="text-muted">
                                                            <h5>${val.content}</h5>
                                                        </p>
                                                    </div>
                                                </div>
                                            </section>`
                            });
                            $('#tampilKomen').html(listSerah);
                        },
                        error: function (errormessage) {
                            alert(errormessage.responseText);
                        }
                    });
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


$(document).ready(function () {
    $('#tableMember').DataTable({
        'ajax': {
            'url': "Users/GetProfile",
            'dataSrc': ''
        },
        'columns': [
            {
                "data": "userId",
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['firstName'] + ' ' + row['lastName'];
                }
            },
            {
                "data": "email",
            },
            {
                'data': '',
                'render': function (data, type, row, meta) {
                    var date = row['birthDate'].substr(0, 10);
                    var newDate = date.split('-');
                    return newDate[2] + '-' + newDate[1] + '-' + newDate[0];
                }
            },
            {
                'data': '',
                'render': function (data, type, row, meta) {
                    if (row['gender'] == 0) {
                        return 'Male';
                    } else {
                        return 'Female';
                    }
                }
            },
            {
                'data': '',
                'render': function (data, type, row, meta) {
                    if (row['phone'].substr(0, 1) == '0') {
                        return '+62' + row['phone'].substr(1);
                    }
                    else {
                        return '+62' + row['phone'];
                    }
                }
            },
            {
                "data": " ",
                "render": function (data, type, row, meta) {
                    var button = '<td>' +
                        '<button type="button" onclick="deleteUser(' + row['userId'] + ');" class="btn btn-danger text-center"><i class="fa fa-trash"></i></button>' +
                        '</td > ';
                    return button;
                }
            }
        ]
    });
});

function deleteUser(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Hapus Data Ini !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "Users/DeleteUser/" + id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                dataType: "json",
                data: { id: id },
                success: function (result) {
                    Swal.fire({
                        title: "Good job!",
                        text: "DATA BERHASIL DIHAPUS!!",
                        icon: "success",
                        button: "Okey!",
                    }).then(function () {
                        window.location = "/Users";
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

$.ajax({
    url: "/Users/GetProfile",
    success: function (result) {
        console.log(result);
        var name = "";
        $.each(result, function (key, val) {
            name = `<span class="text-body pt-1 mr-3">${result.length} People</span>`
        });
        $("#hitungUser").html(name);
    }
})

$.ajax({
    url: "/Users/GetLanding",
    success: function (result) {
        console.log(result);
        var name = "";
        $.each(result, function (key, val) {
            name = `<span class="text-body pt-1 mr-3">${result.length} Discussions</span>`
        });
        $("#hitungDiskusi").html(name);
    }
})

$.ajax({
    url: "/Categories/GetAll",
    success: function (result) {
        console.log(result);
        var name = "";
        $.each(result, function (key, val) {
            name = `<span class="text-body pt-1 mr-3">${result.length} Categories</span>`
        });
        $("#hitungCategory").html(name);
    }
})

$.ajax({
    url: "/Comments/GetAll",
    success: function (result) {
        console.log(result);
        var name = "";
        $.each(result, function (key, val) {
            name = `<span class="text-body pt-1 mr-3">${result.length} Comments</span>`
        });
        $("#hitungComments").html(name);
    }
})

$.ajax({
    url: "https://localhost:44312/API/Users/CheckAccountRole/" + document.getElementById("userId").innerHTML,
    success: function (result) {
        console.log(result);
        if (result < 2) {
            var name = `<i class="fas fa-layer-group fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Add Member Account`;
            $("#addMember").html(name);
        }  
    }
})

function addMember(id) {
    var obj = new Object();
    obj.UserId = parseInt(id);
    obj.RoleId = 2;
    console.log(obj);
    $.ajax({
        url: "https://localhost:44312/API/AccountRoles/",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(obj),
        dataType: 'json',
    }).done((result) => {
        console.log(result);
        window.location = "/Admins/Dashboard"
    }).fail((error) => {
        console.log(error);
    });
}