$(document).ready(function () {
    // Initialize the modal
    $('.modal').modal();
});

// When the favorites icon is clicked, mark the article as saved in the database
// TODO: Look into how this behaves in an arrow function
$(document).on("click", ".saveArticle", function () {
    const thisId = $(this).attr("data-id");

    // Change saved property to true
    $.ajax({
        method: "POST",
        url: "/article/" + thisId,
        data: {
            saved: true
        }
    })
        .then((data) => {
            console.log(data);
            // TODO: Add a materialize toast to let the user know the article has been saved
            $(".saveArticle").text("favorite");
        });
});

// TODO: When the Save Note button is clicked, create the ajax post route to the datbase
$(document).on("click", ".save-note", function () {
    const thisId = $(this).attr("data-id");

    // Change saved property to true
    $.ajax({
        method: "POST",
        url: "/article/" + thisId,
        data: {
            title: $("#noteTitle").val(),
            body: $("#noteBody").val()
        }
    })
        .then((data) => {
            console.log("note saved")
            console.log(data);
            // TODO: Add note content to note div in the modal
        });
});