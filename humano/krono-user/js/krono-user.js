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
        },
    }

    $.Mustache.load('templates/krono-user.html').done(function(){
        App.toggleSidebar();
        App.sidebarLink();
        App.navbarLinkDropdown();
        App.uploadImage();
        App.formValidation();
        App.sideCanvas.html("").append($.Mustache.render("side-nav"));
        App.navCanvas.html("").append($.Mustache.render("admin-nav"));

        // DASHBOARD
        Path.map('#/dashboard/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-dash"));
            var tableID = ['#table-birthday-celebration','#table-new-employee',];
            $.each(tableID,function(i,item){
                renderToDataTableDashboard(item);
            })
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
            var tableID = '#table-krono-user-time-sheet';
            renderToDataTablePrint(tableID);
        });

        // LEAVE / ABSENT
        Path.map('#/leave-absent/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-leave-absent"));
            var tableID = '#table-krono-user-leave-absent';
            renderToDataTablePrint(tableID);
        });

        // OVERTIME
        Path.map('#/overtime/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-overtime"));
            var tableID = '#table-krono-user-overtime';
            renderToDataTablePrint(tableID);
        });

        // HOLIDAY & RESTDAY
        Path.map('#/holiday-restday/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-holiday-restday"));
            var tableID = '#table-krono-user-holiday-restday';
            renderToDataTablePrint(tableID);
        });

        // PAYSLIP
        Path.map('#/payslip/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-payslip"));
            var tableID = '#table-krono-user-payslip';
            renderToDataTablePrint(tableID);
        });

        // BILLING
        Path.map('#/user-billing/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-billing"));
            var tableID = '#table-krono-billing';
            renderToDataTablePrint(tableID);
        });

        Path.root();
        Path.listen();
    });
});


