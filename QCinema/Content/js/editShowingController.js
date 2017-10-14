var editShowingController = {
    init: function () {
        editShowingController.generalSetting();
        editShowingController.events();
    },
    events: function () {
        editShowingController.btnSearchMovieClick();
        editShowingController.selectedAuditoriumChanged();
        editShowingController.movieSelectedChange();
    },
    generalSetting: function () {
        $("#tbl-search-movie-result").hide();
        $("#btn-save-auditorium").hide();
         $("#btn-save-movie").hide();
    },
    //events
    btnSearchMovieClick: function () {
        $("#btn-search-movie").on("click", function () {
            $("#tbl-search-movie-result").fadeIn();
        });
    },
    selectedAuditoriumChanged: function () {
        $("#sl-auditorium").on("changed.bs.select", function (e, newValue) {
            if (newValue != $(e.target).attr("data-original-value")) {
                $("#btn-save-auditorium").fadeIn();
            } else {
                $("#btn-save-auditorium").fadeOut();
            }
        });
    },
    movieSelectedChange: function () {
        $(document).on("click", ".btn-select-movie", function () {
            //reset other buttons
            $(".btn-select-movie").addClass("btn-info");
            $(".btn-select-movie").removeClass("btn-success");
            $(".btn-select-movie").text("Chọn");
            $(".btn-complete-step").hide();

            //toggle this button
            $(this).addClass("btn-success");
            $(this).removeClass("btn-info");
            $(this).text("Đã chọn");
            $(this).siblings("a").fadeIn(200);
            
            $("#btn-save-movie").fadeIn();
        });
    }
};
editShowingController.init();
