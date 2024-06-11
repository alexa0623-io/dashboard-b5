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
            $(document).ready(function () {
                $('#tab_input_file').on('change', function (e) {
                    var file = e.target.files[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('#preview_image').attr('src', e.target.result);
                            $('#tab_img_view p').hide(); // Hide the "Image not available" text
                        }
                        reader.readAsDataURL(file);
                    }
                });
        
            });

        }
    }

    $.Mustache.load('templates/krono.html').done(function(){
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
            App.canvas.html("").append($.Mustache.render("krono-dash"));
            
            $('#table-krono-dash').DataTable({
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

        // MASTER FILE
        Path.map('#/master-file/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-master-file"));
            
            $('#table-master-file').DataTable({
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

        // MASTER FILE / MODAL 
        Path.map('#/master-file-modal/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-master-file-modal"));
            
            $('#table-master-file-modal').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-employee-status').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-department').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-salary').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-rules').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-cost-center').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-dependents').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-allowance').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-loans').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-krono-documents').DataTable({
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

        // SCHEDULING
        Path.map('#/scheduling/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-scheduling"));
            
            $('#table-scheduling-listing').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-scheduling-employee').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-scheduling-group').DataTable({
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

        // REQUEST
        Path.map('#/timesheet/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-timesheet"));
            
            $('#table-timesheet-all').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-timesheet-employee').DataTable({
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

        Path.map('#/leave-absent/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-leave-absent"));
            
            $('#table-leave-absent').DataTable({
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

        Path.map('#/overtime/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-overtime"));
            
            $('#table-overtime').DataTable({
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

        Path.map('#/holiday-restday/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-holiday-restday"));
            
            $('#table-holiday-restday').DataTable({
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

        Path.map('#/adjustment/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-adjustment"));
            
            $('#table-adjustment').DataTable({
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

        // REPORT
        Path.map('#/import-dtr/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-import-dtr"));
            
            $('#table-import-dtr').DataTable({
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

        Path.map('#/time-summary/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-time-summary"));
            
            $('#table-time-summary').DataTable({
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

        Path.map('#/time-logs/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-time-logs"));
            
            $('#table-time-logs').DataTable({
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

        Path.map('#/time-logs-view/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-time-logs-view"));
            
            $('#table-time-logs-view').DataTable({
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

        Path.map('#/event-logs/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-event-logs"));
            
            $('#table-event-logs').DataTable({
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

        // SETTINGS
        Path.map('#/location/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-location"));
            
            $('#table-location').DataTable({
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


