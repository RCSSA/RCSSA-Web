const url = `https://script.google.com/macros/s/AKfycbxMXgoSXNJGEArO19HRujlalL1q2qPa8-rMqeG3bYv7eDqGCoQ_NrHJNZrYqO9oJLLXhw/exec`
fetch(url)
.then(res => res.json())
.then(data => {
    $.each(data, function (index,item) {
        console.log(item.Title);
        $("#article-area").append(
            "<div class='row'>"+
            "<div class='container-sm card-item'>"+
                "<div class='row'>"+
                    "<div class='col-md-4 col-sm-6'>"+
                        "<img src="+item[1]+" class='img-responsive img-centered img-border-radius' alt=''>"+
                    "</div>"+
                    "<div class='col-md-8 col-sm-10'>"+
                        "<div class='portfolio-caption'>"+
                            "<a href="+item[2]+" target='_blank'>"+
                                "<h3>"+item[0]+"</h3>"+
                            "</a>"+
                            "<h5 class='text-muted'>"+item[3]+"</h5>"+
                            "</h5>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"+
        "</br>"
        );
    });
});
