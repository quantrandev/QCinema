var movieDetailController = {
    init: function () {
        //hide new cast and buttons in it by default
        $("#add-casts-wrapper").find("button").hide();
        $("#add-casts-wrapper").hide();

        //hide clear txt-movie-casts button by default
        $("#btn-clear-casts").hide();

        //cast input style by default
        $("#movie-casts-wrapper").css("position", "relative");
        $("#movie-casts-wrapper").find(".btn-group").css({
            "position": "absolute",
            "bottom": "0",
            "right": "0"
        });
        movieDetailController.events();
    },
    events: function () {
        movieDetailController.btnToggleNewCastsClick();
        movieDetailController.newCastsTextChanged();
        movieDetailController.clearNewCastClick();
        movieDetailController.addNewCastClick();
        movieDetailController.clearCastsClick();
        movieDetailController.resetForm();
    },
    btnToggleNewCastsClick: function () {
        $("#btn-toggle-new-cast").on("click", function () {
            $("#add-casts-wrapper").slideToggle();
            $(this).children("span").toggleClass("fa-plus");
            $(this).children("span").toggleClass("fa-minus");
            $("#add-casts-wrapper").find("input").focus();
        });
    },
    newCastsTextChanged: function () {
        $("#add-casts-wrapper").find("input").on("input", function () {
            movieDetailController.newCastButtonStatus();
        });
    },
    clearNewCastClick: function () {
        $("#btn-clear-new-cast").on("click", function () {
            $("#txt-new-cast").val("");
            $("#txt-new-cast").focus();

            //hide new cast buttons
            $("#add-casts-wrapper").find("button").hide();

        });
    },
    clearCastsClick: function () {
        $("#btn-clear-casts").on("click", function () {
            $("#txt-movie-casts").val("");

            //hide clear button
            movieDetailController.castsButtonStatus();

            //focus txt-new-cast
            $("#txt-new-cast").focus();
        });
    },
    addNewCastClick: function () {
        $("#btn-save-new-cast").on("click", function () {
            var currentValue = "";
            if (movieDetailController.castsHasValue()) {
                var originalValue = $("#txt-movie-casts").val();
                currentValue = originalValue + ", " + $("#txt-new-cast").val();
            } else {
                currentValue = $("#txt-new-cast").val();
            }

            //bind data to txt-movie-casts
            $("#txt-movie-casts").val(currentValue);
            //refresh txt-new-cast
            $("#txt-new-cast").val("");
            $("#txt-new-cast").focus();
            //change casts buttons status
            movieDetailController.castsButtonStatus();
            movieDetailController.newCastButtonStatus();
        });
    },
    resetForm: function () {
        $("[type='reset']").on("click", function () {
            $(".select2-selection__rendered").html("");
        });
    },
    newCastHasValue: function () {
        if ($("#txt-new-cast").val() == "") {
            return false;
        }
        return true;
    },
    newCastButtonStatus: function () {
        if (movieDetailController.newCastHasValue()) {
            $("#add-casts-wrapper").find("button").show();
        } else {
            $("#add-casts-wrapper").find("button").hide();
        }
    },
    castsButtonStatus: function () {
        if (movieDetailController.castsHasValue()) {
            $("#btn-clear-casts").show();
        } else {
            $("#btn-clear-casts").hide();
        }
    },
    castsHasValue: function () {
        if ($("#txt-movie-casts").val() != "") {
            return true;
        }
        return false;
    }
};

movieDetailController.init();
