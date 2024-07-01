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
               $('#construction-btn').on('click', function(){
                    $("#construction-arrow").toggleClass("rotate");
               })

                $(".sidebar-link:not(#construction-btn)").click(function() {
                    $("#construction-arrow").removeClass("rotate");
                });
            });
        },
        

        // Mobile view arrow
        mobileArrow: function() {
            $(document).ready(() => {
               $('.mconstruction-btn').on('click', function(){
                    $("#mconstruction-arrow").toggleClass("rotate");
               })

                $(".nav-link:not(.mconstruction-btn)").click(function() {
                    $("#mconstruction-arrow").removeClass("rotate");
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
            var tableID = ['#table-birthday-celebration','#table-new-employee',];
            $.each(tableID,function(i,item){
                renderToDataTableDashboard(item);
            })
        });
        
        Path.map('#/profile/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-profile"));

        });
        
        Path.map('#/dependents/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-dependents"));
            var tableID = '#table-dependents';
            renderToDataTablePrint(tableID);
        });
        
        Path.map('#/work-experience/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-work-experience"));
            var tableID = '#table-work-experience';
            renderToDataTablePrint(tableID);
        });
        
        Path.map('#/education/').to(function(){
            App.canvas.html("").append($.Mustache.render("user-education"));
            var tableID = '#table-education';
            renderToDataTablePrint(tableID);
        });


        Path.root();
        Path.listen();
    });
});


