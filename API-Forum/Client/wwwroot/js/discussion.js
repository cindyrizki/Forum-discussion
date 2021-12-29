//const { error } = require("jquery");


$(document).ready(function () {
    $("#postDiskusi").validate({
        rules: {
            title: {
                required: true
            },
            contentD: {
                required: true
            },
            dateDis: {
                required: true
            },
            statusComt: {
                required: true
            },
            userId: {
                required: true
            },
            categoryId: {
                required: true
            },
            typeId: {
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



function valid() {
    var ini = $("#postDiskusi").valid();
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
    url: "/Categories/GetAll",
    success: function (result) {
        console.log(result);
        var categoryName = "";
        $.each(result, function (key, val) {
            categoryName += `<option>${val.categoryName}</option>`
        });
        $("#suggestion").html(categoryName);
    }
})

$.ajax({
    url: "/TypeDiscussions/GetAll",
    success: function (result) {
        console.log(result);
        var typeName = "";
        $.each(result, function (key, val) {
            typeName += `<option value="${val.typeId}">${val.typeName}</option>`
        });
        $("#typeId").html(typeName);
    }
})

/*$.ajax({
    url: "https://localhost:44312/API/Users/GetCategory/" + "Web Development",
    type: "GET",
    success: function (result) {
        console.log(result);
    }
})*/

function clearTextBox() {
    $('#title').val("");
    $('#contentD').val("");
    $('#dateDis').val("");
    $('#statusComt').val("");
    $('#userId').val(0);
    $('#categoryId').val("");
    $('#typeId').val(0);
    $('#title').css('border-color', 'lightgrey');
    $('#contentD').css('border-color', 'lightgrey');
    $('#dateDis').css('border-color', 'lightgrey');
    $('#statusComt').css('border-color', 'lightgrey');
    $('#userId').css('border-color', 'lightgrey');
    $('#categoryId').css('border-color', 'lightgrey');
    $('#typeId').css('border-color', 'lightgrey');
}

function insertData() {
    var obj = new Object();
    $.ajax({
        url: "https://localhost:44312/API/Users/GetCategory/" + $("#categoryId").val(),
        type: "GET",
    }).done((result) => {
        console.log(result);
        obj.CategoryId = result.categoryId;
        obj.Title = $('#title').val();
        obj.Content = $('#contentD').val();
        obj.DateDis = $('#dateDis').val();
        obj.StatusComt = $('#statusComt').val();
        obj.Views = 0;
        obj.UserId = parseInt($('#userId').val());
        obj.TypeId = parseInt($('#typeId').val());

        console.log(obj);
        $.ajax({
            url: "/Discussions/Discussion",
            type: "POST",
            data: { entity: obj },
            dataType: 'json'
        }).done((result) => {
            console.log(result);
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
            }).then(function () {
                window.location = "/Discussions/CreateDiskusi";
            });
            clearTextBox();
        }).fail((error) => {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        });
    }).fail((error) => {
            var data = new Object();
            data.categoryName = $("#categoryId").val();
            console.log(data);
            $.ajax({
                url: "/Categories/Category",
                type: "POST",
                data: { entity: data },
                dataType: "json",
            }).done((result) => {
                console.log(result);
                if (result == 200) {
                    console.log(result);
                    $.ajax({
                        url: "https://localhost:44312/API/Users/GetCategory/" + $("#categoryId").val(),
                        type: "GET",
                    }).done((result) => {
                        obj.CategoryId = result.categoryId;
                        obj.Title = $('#title').val();
                        obj.Content = $('#contentD').val();
                        obj.DateDis = $('#dateDis').val();
                        obj.StatusComt = $('#statusComt').val();
                        obj.Views = 0;
                        obj.UserId = parseInt($('#userId').val());
                        obj.TypeId = parseInt($('#typeId').val());

                        console.log(obj);
                        $.ajax({
                            url: "/Discussions/Discussion",
                            type: "POST",
                            data: { entity: obj },
                            dataType: 'json'
                        }).done((result) => {
                            console.log(result);
                            Swal.fire({
                                icon: 'success',
                                title: 'Your work has been saved',
                            }).then(function () {
                                window.location = "/Discussions/CreateDiskusi";
                            });
                            clearTextBox();
                        }).fail((error) => {
                            console.log(error);
                            Swal.fire({
                                title: 'Error!',
                                text: 'Do you want to continue',
                                icon: 'error',
                                confirmButtonText: 'Cool'
                            });
                        });
                    }).fail((error) => {
                        console.log(error);
                    });
                }
            }).fail((error) => {
                console.log(error);
            });
        console.log(error);
    });  
}

function deleteDiscussion(DisId) {
    Swal.fire({
        title: "Are you sure?",
        text: "Hapus Data Ini !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Discussions/DeleteDis/" + DisId,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                dataType: "json",
                data: { "": DisId },
            }).done((result) => {
                console.log(result);
                Swal.fire({
                    title: "Good job!",
                    text: "DATA BERHASIL DIHAPUS!!",
                    icon: "success",
                    button: "Okey!"
                }).then(function () {
                    window.location = "/Discussions";
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

function getDiskusi(id) {
    $.ajax({
        url: "/Users/GetDiscussion/" + id,
        success: function (result) {
            console.log(result);
            var listSerah = "";
            var button = "";
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
                    url: "Put/",
                    type: "PUT",
                    data: { id: id, entity: obj },
                    dataType: 'json'
                }).done((result) => {
                    console.log(result);
                }).fail((error) => {
                    console.log(error);
                })
                if (val.statusComt == 0) {
                    button += `<button type="button" class="btn btn-warning" href="#postKomen" data-toggle="collapse">Comment</button>`
                } else if (val.statusComt == 1) {
                    button += `<button type="button" class="btn btn-warning btn-disabled" href="#postKomen" data-toggle="collapse" disabled>Comment</button>`
                }
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
                                ${button}
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
                $("#dis").val(val.disId);
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

$.ajax({
    url: "/Users/GetDiscussionByUser/" + document.getElementById("userId").innerHTML,
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
                                <button onclick="getDiskusiUser(${val.disId})" class="btn btn-primary">Detail Discussion >></button>
                            </div>
                            <div class="row comment">
                                <span class="text-body pt-1 mr-3">${val.views} Views</span>
                                <button type="button" onclick="deleteDiscussion(${val.disId});" class="btn btn-danger text-center"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
</section>
`
        });
        $('#diskusi1').html(listSerah);
    },
    error: function (errormessage) {
        alert(errormessage.responseText);
    }
});

function getDiskusiUser(id) {
    $.ajax({
        url: "/Users/GetDiscussion/" + id,
        success: function (result) {
            console.log(result);
            var listSerah = "";
            var button = "";
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
                /*if (val.statusComt == 0) {
                    button += `<button type="button" class="btn btn-warning" href="#postKomen" data-toggle="collapse">Comment</button>`
                } else if (val.statusComt == 1) {
                    button += `<button type="button" class="btn btn-warning btn-disabled" href="#postKomen" data-toggle="collapse" disabled>Comment</button>`
                }*/
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
                $("#dis").val(val.disId);
            });
            $('#diskusi1').html(listSerah);
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
                    $('#jumlahKomen1').html(value);
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
                            $('#tampilKomen1').html(listSerah);
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
    $("#formComment").validate({
        rules: {
            contentComment: {
                required: true
            },
            dateCom: {
                required: true
            },
            userId: {
                required: true
            },
            disId: {
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

function validComment() {
    var ini = $("#formComment").valid();
    console.log(ini);

    if (ini === true) {
        insertComment();
    }
    else {
        Swal.fire(
            'Failed!',
            'Please enter all fields.',
            'error'
        );
    }
}

function insertComment() {
    var obj = new Object();
    obj.Content = $("#contentComment").val();
    obj.DateComment = $("#dateCom").val();
    obj.UserId = $("#user").val();
    obj.DisId = $("#dis").val();

    console.log(obj);
    $.ajax({
        url: "/Comments/Comment/",
        type: "POST",
        data: { entity: obj },
        dataType: 'json'
    }).done((result) => {
        console.log(result);
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
        }).then(function () {
            window.location = "/Discussions/LihatDiskusi";
        });
        clearTextBoxx();
    }).fail((error) => {
        console.log(error);
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        });
    });
}

