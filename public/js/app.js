$(["data-click=save"]).on("click", () => {
    const thisId = $(this).attr("data-id");

    // TODO: Store article to database

    // The code below would be used for adding notes
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#note-title").val(),
            body: $("#note-body").val()
        }
    })
    .then((data) => {
        console.log(data);
    })
})