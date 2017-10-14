var listReservationController = {
    init: function () {
        listReservationController.generalSetting();
        listReservationController.events();
    },
    events: function () {
        listReservationController.ckbSearchGroup_CheckChanged();
        //listReservationController.btnToggleSearchGroup_OnClick();
        listReservationController.tabSelected_OnChange();
        listReservationController.btnSearchMovie_OnClick();
        listReservationController.txtSearchMovieName_OnInput();
        listReservationController.btnSelectSearchItem_OnClick();
        listReservationController.btnSearchUser_OnClick();
        listReservationController.txtSearchUserInputs_OnInput();
    },
    generalSetting: function () {
        //hide search group box and button to show it
        $("#search-group-box").hide();

        //hide movie search result table
        $("#tbl-search-movie-result").hide();
        //hide movie search result table
        $("#tbl-search-user-result").hide();

        //disable search button button 
        $("#btn-search-movie").attr("disabled", true);
        $("#btn-search-user").attr("disabled", true);
        $("#btn-search-reservation").hide();
    },
    //events
    ckbSearchGroup_CheckChanged: function () {
        $("#ckb-search-group").find("input[type='checkbox']").on("change", function () {
            if (listReservationController.isAtleastOneChecked()) {
                var itemsToShow = listReservationController.getCheckedValues();
                listReservationController.showSearchGroupBox(itemsToShow);

                //reset all tabs
                listReservationController.resetAllTabs();

                //set first item to be the current tab
                $("[data-target='" + itemsToShow[0] + "']").closest("li").addClass("tab-current");
                $(itemsToShow[0]).addClass("content-current");
            } else {
                $("#search-group-box").fadeOut();
            }

            listReservationController.searchEnableStatus();
        });
    },
    tabSelected_OnChange: function () {
        $("#search-group-box").children("nav").children("ul").children("li").children("a").on("click", function () {
            //reset all tab
            listReservationController.resetAllTabs();

            //highlight current tab
            $(this).closest("li").addClass("tab-current");
            //show selected content tab
            $($(this).attr("data-target")).addClass("content-current");
        });
    },
    btnSearchMovie_OnClick: function () {
        $("#btn-search-movie").on("click", function () {
            $("#tbl-search-movie-result").fadeIn();
            $("#tbl-search-movie-result").footable(); //belong to service

            listReservationController.toggleEnableSearch($(this), "false");
            listReservationController.searchEnableStatus();
        });
    },
    btnSearchUser_OnClick: function () {
        $("#btn-search-user").on("click", function () {
            $("#tbl-search-user-result").fadeIn();

            listReservationController.toggleEnableSearch($(this), "false");
            listReservationController.searchEnableStatus();
        });
    },
    txtSearchMovieName_OnInput: function () {
        $("#txt-movie-name").on("input", function () {
            if ($(this).val() != "") {
                //enable search button
                $("#btn-search-movie").attr("disabled", false);
            } else {
                $("#btn-search-movie").attr("disabled", true);
            }
        });
    },
    txtSearchUserInputs_OnInput: function () {
        $("#txt-user-name").on("input", function () {
            //all inputs are empty
            if ($(this).val() == "" && $("#txt-user-identity").val() == "") {
                //disable search button
                $("#btn-search-user").attr("disabled", true);
            } else {
                $("#btn-search-user").attr("disabled", false);
            }
        });
        $("#txt-user-identity").on("input", function () {
            //all inputs are empty
            if ($(this).val() == "" && $("#txt-user-name").val() == "") {
                //disable search button
                $("#btn-search-user").attr("disabled", true);
                listReservationController.toggleEnableSearch($(this), "false");
            } else {
                $("#btn-search-user").attr("disabled", false);
                listReservationController.toggleEnableSearch($(this), "true");
            }
        });
    },
    btnSelectSearchItem_OnClick: function () {
        $(document).on("click", ".btn-select-search-item", function () {
            if (listReservationController.toggleSelectedSearchItem($(this))) {
                listReservationController.toggleEnableSearch($(this), "true");
            } else {
                listReservationController.toggleEnableSearch($(this), "false");
            }

            listReservationController.searchEnableStatus();
        });
    },
    //helper functions
    toggleSelectedSearchItem: function (e) {
        if ($(e).hasClass("selected")) {
            $(e).addClass("btn-info");
            $(e).removeClass("btn-success");
            $(e).removeClass("selected");
            $(e).text("Chọn");
        } else {
            $(e).addClass("btn-success");
            $(e).removeClass("btn-info");
            $(e).addClass("selected");
            $(e).text("Đã chọn");
        }
        return listReservationController.isAtLeastOneSelected(e);
    },
    isAtLeastOneSelected: function (e) {
        var result = false;
        $(e).closest("table").find(".btn-select-search-item").each(function () {
            if ($(this).hasClass("selected")) {
                result = true;
            }
        });
        
        return result;
    },
    isAtleastOneChecked: function () {
        var result = false;
        //iterate over all checkboxes and check if at least one checkbox is checked
        $("#ckb-search-group").find("input[type='checkbox']").each(function () {
            if ($(this).is(":checked")) {
                result = true;
                return;
            }
        });
        return result;
    },
    getCheckedValues: function () {
        var result = [];
        //iterate over all checkboxes and get all checked values
        $("#ckb-search-group").find("input[type='checkbox']").each(function () {
            if ($(this).is(":checked")) {
                result.push($(this).val());
            }
        });

        return result;
    },
    showSearchGroupBox: function (itemsToShow) {
        $("#search-group-box").fadeIn();

        $("#search-group-box").children("nav").children("ul").children("li").children("a").each(function () {
            if (itemsToShow.indexOf($(this).attr("data-target")) == -1) {
                $(this).closest("li").addClass("hide");
            } else {
                $(this).closest("li").removeClass("hide");
            }
        });
    },
    resetAllTabs: function () {
        //reset all tab toggler
        $("#search-group-box").children("nav").children("ul").children("li").removeClass("tab-current");
        //hide all content tabs
        $("#search-group-box").find("section").removeClass("content-current");
    },
    toggleEnableSearch: function (e, isEnabled) {
        if (isEnabled == "true") {
            $(e).closest("section").attr("data-enable-search", "true");
        }
        if (isEnabled == "false") {
            $(e).closest("section").attr("data-enable-search", "false");
        }
    },
    isEnabledSearch: function () {
        var checkedItems = listReservationController.getCheckedValues();
        for (i = 0; i < checkedItems.length; i++) {
            if ($(checkedItems[i]).attr("data-enable-search") == "true") {
                return true;
            }
        }
        return false;
    },
    searchEnableStatus: function () {
        if (listReservationController.isEnabledSearch()) {
            $("#btn-search-reservation").fadeIn();
        } else {
            $("#btn-search-reservation").fadeOut();
        }
    }
};
listReservationController.init();
