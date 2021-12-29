$.ajax({
    url: "/Users/GetLanding/",
    success: function (result) {
        console.log(result);
        var listSerah = "";
        var comment = "";
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
    url: "/Users/GetCountReply/" + 1,
    success: function (result) {
        console.log(result);
        var value = "";
        $.each(result, function (key, val) {
            value += `<span class="text-body pt-1 mr-3">${val.value} Comments</span>`
        });
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
            $.each(result, function (key, val) {
                var obj = new Object();
                obj.disId = val.disId;
                obj.title = val.title;
                obj.content = val.content;
                obj.dateDis = val.dateDis;
                obj.statusComt = val.statusComt;
                obj.views = parseInt(val.views+1);
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
                                <button type="button" class="btn btn-warning" onclick="window.location.href='/Logins';">Comment</button>
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

function getTrend() {
    $.ajax({
        url: "/Users/GetTrending",
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

function getNewThread() {
    $.ajax({
        url: "/Users/GetNewByDate/",
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
