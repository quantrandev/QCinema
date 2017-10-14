var searchAccountController = {
    init: function () {
        //hide roles select tag by default
        $("#select-roles-wrapper").hide();
        
        searchAccountController.events();
    },
    events: function () {
        searchAccountController.accountCategorySelectedIndexChanged();
    },
    accountCategorySelectedIndexChanged: function () {
        $("#select-account-category").on("change", function () {
            if ($(this).val() == 1) {
                $("#select-roles-wrapper").slideDown();
            } else {
                $("#select-roles-wrapper").slideUp();
            }
        });
    }
};
searchAccountController.init();

