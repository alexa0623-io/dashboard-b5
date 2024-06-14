$(document).ready(function(){
    
    var App = {
        sideCanvas : $("#sideCanvas"),
        canvas : $("#canvas"),
        navCanvas : $("#navCanvas"),
        api     : Config.url + "/api",
        path    : Config.url + "/humano",
        toggleSidebar : function(){
            $(document).ready(function(){
                $('#toggle-sidebar').on('click', function(){
                    $('#sideCanvas').toggleClass("d-md-none"); // Toggle sidebar visibility
            
                    // Adjust margin-left for main content based on sidebar visibility
                    if ($('#sideCanvas').hasClass("d-md-none")) {
                        $('#navCanvas').css('margin-left', '0'); // Move main content back to the left
                        $('#canvas').css('margin-left', '0');
                    } else {
                        $('#navCanvas').css('margin-left', '300px'); // Move main content to the right to make space for sidebar
                        $('#canvas').css('margin-left', '300px');
                    }
                });
            });
                        
        },
        
    
        sidebarLink : function(){
            $(document).ready(function() {
                $(".sidebar-link").click(function(event) {
                    $(".sidebar-link").removeClass("active");
                    $(".collapse.show").removeClass("show");
                    
                    $(this).addClass("active");
                    
                    var dropdown = $(this).next();
                    if (dropdown.hasClass("collapse")) {
                        dropdown.toggleClass("show");
                    }
                });
            });
        },
        
        // NAVBAR DROPDOWN
        navbarLinkDropdown : function(){
            $(document).ready(function() {
                $('.dropdown-menu').click(function(e) {
                    e.stopPropagation();
                });
            });
        },

        // Desktop view arrow
        deskArrow: function() {
            $(document).ready(() => {
                $('#request_btn').on('click', function(){
                        $("#request-arrow").toggleClass("rotate");
                        $("#report-arrow").removeClass("rotate");
                        $("#setting-arrow").removeClass("rotate");
                })

                $('#report_btn').on('click', function(){
                    $("#report-arrow").toggleClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                    $("#setting-arrow").removeClass("rotate");
                })

                $('#setting_btn').on('click', function(){
                    $("#setting-arrow").toggleClass("rotate");
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                 })

                $(".sidebar-link:not(#request_btn):not(#report_btn):not(#setting_btn)").click(function() {
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                    $("#setting-arrow").removeClass("rotate");
                });
            });
        },
        

        // Mobile view arrow
        mobileArrow: function() {
            $(document).ready(() => {
                $('.mrequest_btn').on('click', function(){
                        $("#mrequest-arrow").toggleClass("rotate");
                        $("#mreport-arrow").removeClass("rotate");
                        $("#msetting-arrow").removeClass("rotate");
                })

                $('.mreport_btn').on('click', function(){
                    $("#mreport-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                    $("#msetting-arrow").removeClass("rotate");
                })

                $('.msetting_btn').on('click', function(){
                    $("#msetting-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                    $("#mreport-arrow").removeClass("rotate");
                })

                $(".nav-link:not(.mrequest_btn):not(.mreport_btn):not(.msetting_btn)").click(function() {
                    $("#mreport-arrow").removeClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                    $("#msetting-arrow").removeClass("rotate");
                });
            });
        },

        // FORM VALIDATION
        formValidation: function() {
            $(document).ready(function() {
                $('.needs-validation').on('submit', function(event) {
                  var form = $(this)[0];
                  if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    $(this).addClass('was-validated');
                });
            });
        },

        uploadImage: function() {
            $(document).ready(function() {
                $('#savePhoto').on('click', function() {
                    const input = $('#tab_input_file')[0];
                    const file = input.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = $('<img>', {
                                src: e.target.result,
                                class: 'img-fluid rounded-2',
                                css: {
                                    'width': '100%', // Adjust as necessary
                                    'height': '100%' // Adjust as necessary
                                }
                            });
                            
                            const tabDrop = $('#tab-drop');
                            
                            // Clear existing content
                            tabDrop.empty();
                            
                            // Append the new image
                            tabDrop.append(img);
                            
                            // Hide the modal
                            $('#changeProfile').modal('hide');
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });
        }
    }

    $.Mustache.load('templates/krono-user.html').done(function(){
        App.toggleSidebar();
        App.sidebarLink();
        App.deskArrow();
        App.mobileArrow();
        App.navbarLinkDropdown();
        App.uploadImage();
        App.formValidation();
        App.sideCanvas.html("").append($.Mustache.render("side-nav"));
        App.navCanvas.html("").append($.Mustache.render("admin-nav"));

        // DASHBOARD
        Path.map('#/dashboard/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-dash"));
            
            $('#table-krono-user-dash').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });
        });

        // PROFILE
        Path.map('#/profile/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-profile"));
            
            $('#table-krono-user-profile').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            }); 
        });

        // TIME SHEET
        Path.map('#/timesheet/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-time-sheet"));
            
            $('#table-krono-user-time-sheet').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });
        });

        // LEAVE / ABSENT
        Path.map('#/leave-absent/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-leave-absent"));
            
            $('#table-krono-user-leave-absent').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });
        });

        // OVERTIME
        Path.map('#/overtime/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-overtime"));
            
            $('#table-krono-user-overtime').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });
        });

        // HOLIDAY & RESTDAY
        Path.map('#/holiday-restday/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-holiday-restday"));
            
            $('#table-krono-user-holiday-restday').DataTable({

                layout: {
                    topStart: {
                        buttons: ['copy', 'excel', 'pdf', 'colvis']
                    }
                }
                
                // "language": {
                //     "paginate": {
                //         "first": "Start",
                //         "previous": "Previous",
                //         "next": "Next",
                //         "last": "Last"
                //     }
                // }
            });
        });

        // PAYSLIP
        Path.map('#/payslip/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-payslip"));
            
            $('#table-krono-user-payslip').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });
        });

        // BILLING
        Path.map('#/user-billing/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-billing"));
            
            $('#table-krono-billing').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });
        });

        

        Path.root();
        Path.listen();
    });
});


