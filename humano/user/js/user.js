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
               })

               $('#report_btn').on('click', function(){
                    $("#report-arrow").toggleClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                })

                $(".sidebar-link:not(#request_btn):not(#report_btn)").click(function() {
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                });
            });
        },
        

        // Mobile view arrow
        mobileArrow: function() {
            $(document).ready(() => {
               $('.mrequest_btn').on('click', function(){
                    $("#mrequest-arrow").toggleClass("rotate");
                    $("#mreport-arrow").removeClass("rotate");
               })

               $('.mreport_btn').on('click', function(){
                    $("#mreport-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                })

                $(".nav-link:not(.mrequest_btn):not(.mreport_btn)").click(function() {
                    $("#mreport-arrow").removeClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
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

    $.Mustache.load('templates/user.html').done(function(){
        App.toggleSidebar();
        App.sidebarLink();
        App.deskArrow();
        App.mobileArrow();
        App.navbarLinkDropdown();
        App.uploadImage();
        App.formValidation();
        App.sideCanvas.html("").append($.Mustache.render("side-nav"));
        App.navCanvas.html("").append($.Mustache.render("admin-nav"));

        
        Path.map('#/dashboard/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-dash"));
            
            $('#table-announcement').DataTable({
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
        
        Path.map('#/profile/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-profile"));
            
            $('#table-announcement').DataTable({
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
        
        Path.map('#/dependents/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-dependents"));
            
            $('#table-dependents').DataTable({
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
        
        Path.map('#/work-experience/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-work-experience"));
            
            $('#table-work-experience').DataTable({
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
        
        Path.map('#/education/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-education"));
            
            $('#table-education').DataTable({
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


