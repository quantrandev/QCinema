var calendarController = {
    weekdays: [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
    ],
    months: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
    ],
    init: function () {
        calendarController.generalSetting();
        calendarController.events();
    },
    events: function () {
        calendarController.selectedDayChanged();
        calendarController.selectedAuditoriumChanged();
    },
    generalSetting: function () {
        $("#datepicker-inline").datepicker({
            todayHighlight: true
        });

        //show today list of showings
        calendarController.showTodayShowings();

        //hide tbl-list-showings by default
        $("#tbl-list-showings").hide();
    },
    //events
    selectedDayChanged: function () {
        $("#datepicker-inline").datepicker().on("changeDate", function (e) {
            var selectedDate = e.date;
            var dateString = "";
            var today = new Date();

            if (e.date.getDate() == today.getDate() && e.date.getMonth() == today.getMonth() && e.date.getFullYear() == today.getFullYear()) {
                dateString = "Hôm nay, " + calendarController.weekdays[today.getDay()] + ", ngày " + today.getDate() + " tháng " + calendarController.months[today.getMonth()] + " năm " + today.getFullYear();

                //toggle panel
                calendarController.togglePanelColor("today");
            } else {
                dateString = calendarController.weekdays[selectedDate.getDay()] + ", ngày " + selectedDate.getDate() + " tháng " + calendarController.months[selectedDate.getMonth()] + " năm " + selectedDate.getFullYear();

                //toggle panel
                calendarController.togglePanelColor("others");
            }

            $("#selected-date").text(dateString);

            //show list-showings-wrapper
            $("#list-showings-wrapper").fadeIn();

            //reset list-showing panel
            calendarController.resetListShowingsPanel();
        });
    },
    selectedAuditoriumChanged: function () {
        $("#sl-auditorium").on("changed.bs.select", function (e, newValue) {
            if (newValue != 0) {
                $("#tbl-list-showings").fadeIn();
            } else {
                $("#tbl-list-showings").fadeOut();
            }
        });
    },
    //helper function
    showTodayShowings: function () {
        var today = new Date();
        var dateString = "";

        dateString = "Hôm nay, " + calendarController.weekdays[today.getDay()] + ", ngày " + today.getDate() + " tháng " + calendarController.months[today.getMonth()] + " năm " + today.getFullYear();

        $("#selected-date").text(dateString);

        //toggle panel
        calendarController.togglePanelColor("today");
    },
    togglePanelColor: function (type) {
        if (type == "today") {
            $("#list-showings-wrapper").addClass("panel-danger");
            $("#list-showings-wrapper").removeClass("panel-primary");
        }
        if (type == "others") {
            $("#list-showings-wrapper").addClass("panel-primary");
            $("#list-showings-wrapper").removeClass("panel-danger");
        }
    },
    resetListShowingsPanel: function () {
        $("#sl-auditorium").selectpicker("val", 0);
        //hide table
        $("#tbl-list-showings").hide();
    }

};
calendarController.init();
