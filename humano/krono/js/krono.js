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
                $('#request-btn').on('click', function(){
                        $("#request-arrow").toggleClass("rotate");
                        $("#report-arrow").removeClass("rotate");
                        $("#setting-arrow").removeClass("rotate");
                })

                $('#report-btn').on('click', function(){
                    $("#report-arrow").toggleClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                    $("#setting-arrow").removeClass("rotate");
                })

                $('#setting-btn').on('click', function(){
                    $("#setting-arrow").toggleClass("rotate");
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                 })

                $(".sidebar-link:not(#request-btn):not(#report-btn):not(#setting-btn)").click(function() {
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                    $("#setting-arrow").removeClass("rotate");
                });
            });
        },
        

        // Mobile view arrow
        mobileArrow: function() {
            $(document).ready(() => {
                $('.mrequest-btn').on('click', function(){
                        $("#mrequest-arrow").toggleClass("rotate");
                        $("#mreport-arrow").removeClass("rotate");
                        $("#msetting-arrow").removeClass("rotate");
                })

                $('.mreport-btn').on('click', function(){
                    $("#mreport-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                    $("#msetting-arrow").removeClass("rotate");
                })

                $('.msetting-btn').on('click', function(){
                    $("#msetting-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                    $("#mreport-arrow").removeClass("rotate");
                })

                $(".nav-link:not(.mrequest-btn):not(.mreport-btn):not(.msetting-btn)").click(function() {
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
                    const input = $('#tab-input-file')[0];
                    const file = input.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = $('<img>', {
                                src: e.target.result,
                                class: 'img-fluid rounded-2',
                                css: {
                                    'width': '100%', 
                                    'height': '100%'
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
        
        uploadFile: function() {
            $(document).ready(function() {
                // Function to handle file input change
                $(document).on('change', '.file-input', function() {
                    var files = $(this)[0].files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var reader = new FileReader();
                        
                        reader.onload = (function(file) {
                            return function(e) {
                                var removeButton = $('<button>', {
                                    text: 'Remove',
                                    class: 'btn btn-danger btn-sm mt-2 remove-btn',
                                    click: function() {
                                        $(this).closest('.file-preview').remove();
                                    }
                                });
                                
                                var img = $('<img>', {
                                    src: e.target.result,
                                    class: 'img-fluid rounded-2 mb-2',
                                    css: {
                                        'width': '20%',
                                        'height': '150px'
                                    }
                                });
                                
                                var preview = $('<div>', {
                                    class: 'file-preview mb-3',
                                }).append(img).append(removeButton);
                                
                                $('#file-upload-container').append(preview);
                            };
                        })(file);
                        
                        reader.readAsDataURL(file);
                    }
                });
                
                // Trigger file input click when upload button is clicked
                $('#upload-button').click(function() {
                    $('.file-input').click();
                });
            });
        },

        
        removeDrag: function() { 
            // REMOVE
            $(document).ready(function() {
                Dropzone.options.myGreatDropzone = {
                    addRemoveLinks: true,
                    dictRemoveFile: 'Remove File',
                    init: function() {
                        this.on("success", function(file, response) {
                            // Success event handling
                        });
            
                        this.on("removedfile", function(file) {
                            // Removed file event handling
                        });
                    }
                };
            
                $("#dropZone button").on("click", function() {
                    $("#my-great-dropzone").click();
                });
            });    
            
            $(document).ready(function() {
                var myDropzone = new Dropzone("#my-great-dropzone", {
                    url: "/file-upload", 
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
        App.uploadFile();
        App.formValidation();
        App.removeDrag();
        App.sideCanvas.html("").append($.Mustache.render("side-nav"));
        App.navCanvas.html("").append($.Mustache.render("admin-nav"));

        // DASHBOARD
        Path.map('#/dashboard/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-dash"));
            var tableID = ['#table-birthday-celebration','#table-new-employee',];
            $.each(tableID,function(i,item){
                renderToDataTableDashboard(item);
            })
        });

        // MASTER FILE
        Path.map('#/master-file/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-master-file"));
            var tableID = '#table-master-file';
            renderToDataTablePrint(tableID);
        });

        // MASTER FILE / MODAL 
        Path.map('#/master-file-modal/').to(function(){
            
            App.canvas.html("").append($.Mustache.render("krono-master-file-modal"));
            var tableID = ['#table-master-file-modal','#table-krono-employee-status','#table-krono-department','#table-krono-salary','#table-krono-rules','#table-krono-cost-center','#table-krono-dependents','#table-krono-allowance','#table-krono-loans','#table-krono-documents',];
            $.each(tableID,function(i,item){
                renderToDataTable(item);
            })
            
        });

        // SCHEDULING
        Path.map('#/scheduling/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-scheduling"));
            var tableID = ['#table-scheduling-listing','#table-scheduling-employee','#table-scheduling-group'];
            $.each(tableID,function(i,item){
                renderToDataTablePrint(item);
            })
            
        });

        // REQUEST
        Path.map('#/timesheet/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-timesheet"));
            var tableID = ['#table-timesheet-all','#table-timesheet-employee'];
            $.each(tableID,function(i,item){
                renderToDataTablePrint(item);
            })
        });

        Path.map('#/leave-absent/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-leave-absent"));
            var tableID = '#table-leave-absent';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/overtime/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-overtime"));
            var tableID = '#table-overtime';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/holiday-restday/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-holiday-restday"));
            var tableID = '#table-holiday-restday';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/adjustment/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-adjustment"));
            var tableID = '#table-adjustment';
            renderToDataTablePrint(tableID);
        });

        // REPORT
        Path.map('#/import-dtr/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-import-dtr"));
            var tableID = '#table-import-dtr';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/time-summary/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-time-summary"));
            var tableID = '#table-time-summary';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/time-logs/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-time-logs"));
            var tableID = '#table-time-logs';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/time-logs-view/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-time-logs-view"));
            var tableID = '#table-time-logs-view';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/event-logs/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-event-logs"));
            var tableID = '#table-event-logs';
            renderToDataTablePrint(tableID);
        });

        // SETTINGS
        Path.map('#/location/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-location"));
            var tableID = '#table-location';
            renderToDataTablePrint(tableID);

        });

        // LOADING
        Path.map('#/loading/').to(function(){
            App.canvas.html("").append($.Mustache.render("loading"));
            
        });
        

        Path.root();
        Path.listen();
    });
});


