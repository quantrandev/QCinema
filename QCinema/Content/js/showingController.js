var showingController = {
    init: function () {
        showingController.generalSetting();
        showingController.initialStep();
        showingController.defaultStyle();
        showingController.events();
    },
    events: function () {
        showingController.stepChanged();
        showingController.toNextStep();
        showingController.toggleSelectMovieButton();
        showingController.chooseSuggestedShowing();
        showingController.suggestShowing_chooseDay();
    },
    //default setting
    initialStep: function () {
        $("#add-showing-step-wrapper")
            .children("nav")
            .children("ul")
            .children("li:nth-child(1)")
            .addClass("tab-current");
        $("#add-showing-step-wrapper")
            .children(".content-wrap")
            .children("section:nth-child(1)")
            .addClass("content-current");
    },
    defaultStyle: function () {
        $("section").css("overflow", "auto");
    },
    generalSetting: function () {
        $(".btn-complete-step").hide();
        $("#add-showing-step-wrapper").find(".search-result-wrapper").hide();
        $("#add-showing-step-wrapper").find(".btn-search-movie").on("click", function () {
            $("#add-showing-step-wrapper").find(".search-result-wrapper").fadeIn(200);
            $('#demo-foo-pagination').footable();
        });

        //hide suggested showings
        $("#tbl-suggest-showing").hide();
    },
    //events
    toNextStep: function () {
        $(document).on("click", ".btn-complete-step", function () {
            var currentStep = showingController.getPrevStep($(this).attr("data-target"));
            $(currentStep).addClass("step-completed");
        });
    },
    stepChanged: function () {
        $(document).on("click", "[data-target]", function () {
            var dataTarget = $(this).attr("data-target");

            if ($(this).hasClass("btn-complete-step")) {
                showingController.changeStep(dataTarget);
            } else {
                if (showingController.isValidStepChange(dataTarget)) {
                    showingController.changeStep(dataTarget);
                }
            }
        });
    },
    toggleSelectMovieButton: function () {
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
        });
    },
    chooseSuggestedShowing: function () {
        $(document).on("click", ".btn-select-showing", function () {
            //reset all button
            showingController.clearAllSelectedShowing();

            $(this).removeClass("btn-info");
            $(this).addClass("btn-success");
            $(this).addClass("selected-showing");

            $("#btn-save-showing").removeClass("hide");
        });
    },
    suggestShowing_chooseDay: function () {
        $("#suggest-showing-wrapper").find("select#sl-day").on("change", function () {
            //if user choose a valid value
            if ($(this).val() != 0) {
                $("#tbl-suggest-showing").fadeIn();
                $("#tbl-suggest-showing").footable();
            } else {
                $("#tbl-suggest-showing").fadeOut();
            }
            //hide save button
            showingController.clearAllSelectedShowing();
        });
    },
    //helper function
    isValidStepChange: function (dataTarget) {
        var stepToChange = $("[data-target='" + dataTarget + "']");
        if ($(stepToChange).closest("li").prev("li").hasClass("step-completed") || $(stepToChange).closest("li").hasClass("step-completed")) {
            return true;
        }
        return false;
    },
    getPrevStep: function (currentDataTarget) {
        var currentStep = $("[data-target='" + currentDataTarget + "']").closest("li");
        return $(currentStep).prev("li");
    },
    changeStep: function (dataTarget) {
        //change step
        $("#add-showing-step-wrapper").children("nav").children("ul").children("li").each(function () {
            if ($(this).children("a").attr("data-target") == dataTarget) {
                $(this).addClass("tab-current");
                $(this).children("a").removeClass("ti-lock");
                $(this).children("a").addClass("ti-check-box");
            } else {
                $(this).removeClass("tab-current");
            }
        });
        $("#add-showing-step-wrapper").children(".content-wrap").children("section").each(function () {
            if ($(this).attr("id") == dataTarget) {
                $(this).addClass("content-current");
            } else {
                $(this).removeClass("content-current");
            }
        });
    },
    clearAllSelectedShowing: function () {
        $(".btn-select-showing").removeClass("btn-success");
        $(".btn-select-showing").addClass("btn-info");
        $(".btn-select-showing").removeClass("selected-showing");

        $("#btn-save-showing").addClass("hide");
    }
};

showingController.init();
