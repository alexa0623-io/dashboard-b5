$(document).ready(function(){
    
    var App = {
        sideCanvas : $("#sideCanvas"),
        canvas : $("#canvas"),
        navCanvas : $("#navCanvas"),
        api     : Config.url + "/api",
        path    : Config.url + "/humano",
        username: localStorage.getItem("Username"),
        token   : localStorage.getItem("Token"),
		userType: localStorage.getItem("userType"),
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

    function clearPanel() {
        App.canvas.hide().fadeIn(200);
    }

    function attachUsernameInLink(){
        $(".nav-link-dashboard").attr('href','#/dashboard/'+App.username);
        $(".nav-link-profile").attr('href','#/profile/'+App.username);
        $(".nav-link-dependents").attr('href','#/dependents/'+App.username);
        $(".nav-link-workexp").attr('href','#/work-experience/'+App.username);
        $(".nav-link-education").attr('href','#/education/'+App.username);
        $(".nav-link-traindev").attr('href','#/training/development/'+App.username);
        $(".nav-link-loans").attr('href','#/loans/'+App.username);
        $(".nav-link-certificate").attr('href','#/certificate/'+App.username);
        $(".nav-link-memo").attr('href','#/memo/'+App.username);
        $(".nav-link-knowbased").attr('href','#/knowledgebased/'+App.username);
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
        attachUsernameInLink();
        
        Path.map('#/dashboard/:id').to(function(){
            var newsfeed = getJSONDoc(App.api + "/read/newsfeed/" + App.token);
			var newsfeedList = [];			
			$.each(newsfeed, function(i, item){
				var newsfeeds = {
					uid: item.uid,
					author: item.author,
					content: item.content,
					pubdate: item.pubdate
				}
				newsfeedList.push(newsfeeds);
			});

            var evaluations = getJSONDoc(App.api + "/get/employee/evaluations/");
            var evaluationList = [];          
            $.each(evaluations, function(i, item){
                // console.log(item)
                var evaluations = {
                    empNo: item.emp_uid,
                    fname: item.empfirstname,
                       lname: item.emplastname,
                    nextEval: item.next_evaluation,
                }
                evaluationList.push(evaluations);
            });
			
			var birthday = getJSONDoc(App.api + "/get/employee/birthdays/");
			var birthdayList = [];			
			$.each(birthday, function(i, item){
				var birthdays = {
					empNo: item.employeeNo,
					name: item.employeeName,
					birthday: item.birthday,
                    department: item.department,
					age: item.age
				}
				birthdayList.push(birthdays);
			});
			
			var newemployees = getJSONDoc(App.api + "/get/new/hired/employees/");
			var newemployeeList = [];			
			var ctr = 0;
			$.each(newemployees, function(i, item){
				ctr++;
				var newemployee = {
					count: ctr,
					empNo: item.employeeNo,
					name: item.employeeName,
					datehired: item.dateHired
				}
				newemployeeList.push(newemployee);
			});

            var countperdept = getJSONDoc(App.api + "/number/of/employees/per/dept/");
            var countList = [];
            var total=0;
            $.each(countperdept,function(i,item){
                var countemp = {
                    deptname : item.deptname,
                    count: item.count
                }
                countList.push(countemp);
            });
            for(i=0;i<countperdept.length;i++)
                {
                    total += countperdept[i].count
                }
                console.log(total);
			
			var templateData = {
				newsfeed: newsfeedList,
				birthday: birthdayList,
				newemployee: newemployeeList,
                evaluation: evaluationList,
                empcount : countList,
                totalemp : total
			}			
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("user-dash",templateData));
            var tableID = ['#table-birthday-celebration','#table-new-employee',];
            $.each(tableID,function(i,item){
                renderToDataTableDashboard(item);
            })
        });
        
        Path.map('#/profile/:id').to(function(){
            empUid = this.params['id'];
            var taxStatus = getJSONDoc(App.api + "/get/tax/status/" + App.token);
            var taxStatusList = [];
            var taxnum = 0;			
            $.each(taxStatus, function(i,item){
                taxnum ++;					
				var result = {
                    taxnum,
                    uid: item.uid,
					taxStatus: item.type
                }
                taxStatusList.push(result);
            });
			
			var nationality = getJSONDoc(App.api + "/json/nationality.json");
            var nationalList = [];
            var natnum = 0;			
			$.each(nationality, function(i, item){
				natnum ++;
				var nation = {
					natnum,
					name: item.name 
				}
				nationalList.push(nation);
			});
            var templateData = {
                taxStatusList:taxStatusList,
                nationalList:nationalList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("user-profile",templateData));
            
             var selectors = ["input[name=firstname]","input[name=middlename]","input[name=lastname]","select[name=gender]","select[name=marital]","select[name=status]","input[name=bday]","input[name=email]","input[name=nickname]","input[name=driverLicense]","input[name=expiryLicense]","input[name=sssNo]","input[name=taxNo]","input[name=philhealthNo]","input[name=pagibigNo]","select[name=nationality]","select[name=tax-status]","input[name='housenumber']","input[name='barangay']","input[name='city']","input[name='region']","input[name='height']","input[name='weight']","input[name='bloodtype']"];

            function disableFields(){
                $.each(selectors,function(i,selector){
                    $(selector).attr("disabled", "disabled");
                })
            }
            disableFields();
            function enableFields(){
                $.each(selectors,function(i,selector){
                    $(selector).removeAttr('disabled');
                })
            }
            function employeePersonalDetails(){
                disableFields();
                $.getJSON(App.api + "/hris/employee/data/get/" + empUid + "." + App.token, function(data) {
                    if (data.status == 1) {
                        var status = "Active";
                    } else {
                        var status = "Inactive";
                    }
                    $("input[name=firstname]").val(data.firstname);
                    $("input[name=middlename]").val(data.middlename);
                    $("input[name=lastname]").val(data.lastname);
                    if (data.gender != "") {
                        $("select[name=gender] option[value='" + data.gender + "']").remove();
                        $("select[name=gender]").prepend("<option value='" + data.gender + "' selected>" + data.gender + "</option>");
                    } else {
                        $("select[name=gender]").prepend("<option value='' selected></option>");
                    }

                    if (data.marital != "") {
                        $("select[name=marital] option[value='" + data.marital + "']").remove();
                        $("select[name=marital]").prepend("<option value='" + data.marital + "' selected>" + data.marital + "</option>");
                    } else {
                        $("select[name=marital]").prepend("<option value='' selected></option>");
                    }

                    $("select[name=status] option[value='" + data.status + "']").remove();
                    $("select[name=status]").prepend("<option value='" + data.status + "' selected>" + status + "</option>");
                    $("input[name=bday]").val(data.bday);
                    $("input[name=email]").val(data.email);
                    $("input[name=nickname]").val(data.nickname);
                    $("input[name=driverLicense]").val(data.driverLicense);
                    $("input[name=expiryLicense]").val(data.expiryLicense);
                    $("input[name=sssNo]").val(data.sssNo);
                    $("input[name=taxNo]").val(data.taxNo);
                    $("input[name=philhealthNo]").val(data.philhealthNo);
                    $("input[name=pagibigNo]").val(data.pagibigNo);
                    //$("input[name=nationality]").val(data.nationality);
                    //localStorage.setItem("nationality", data.nationality);
                    
                    $("select[name=nationality] option[value='" + data.nationality + "']").remove();
                    $("select[name=nationality]").prepend("<option value='" + data.nationality + "' selected>" + data.nationality + "</option>");
                    
                    $("select[name=tax-status] option[value='" + data.taxStatusUid + "']").remove();
                    $("select[name=tax-status]").prepend("<option value='" + data.taxStatusUid + "' selected>" + data.taxStatus + "</option>");
            
                    $("input[name='housenumber']").val(data.housenumber);
                    $("input[name='barangay']").val(data.barangay);
                    $("input[name='city']").val(data.city);
                    $("input[name='region']").val(data.region);
                    $("input[name='height']").val(data.height);
                    $("input[name='weight']").val(data.weight);
                    $("input[name='bloodtype']").val(data.bloodtype);
                });
            }
            employeePersonalDetails();

            $("#update-btn").on("click",function(e){
                e.preventDefault();
                enableFields();
                $("#update-cont").prop("hidden",true);
                $("#submit-cont").prop("hidden",false);
            });
            $("#cancel-btn").on("click",function(){
                disableFields();
                $("#update-cont").prop("hidden",false);
                $("#submit-cont").prop("hidden",true);
            });

            $(document).off("submit", "#updateProfile").on("submit", "#updateProfile", function(e) {
                e.preventDefault();
                var firstname     = $("input[name=firstname]").val();
                var middlename    = $("input[name=middlename]").val();
                var lastname      = $("input[name=lastname]").val();
                var gender        = $("select[name=gender]").val();
                var marital       = $("select[name=marital]").val();
                var nationality   = $("select[name=nationality]").val();
                var bday          = $("input[name=bday]").val();
                var email         = $("input[name=email]").val();
                var nickname      = $("input[name=nickname]").val();
                var driverLicense = $("input[name=driverLicense]").val();
                var expiryLicense = $("input[name=expiryLicense]").val();
                var sssNo         = $("input[name=sssNo]").val();
                var taxNo         = $("input[name=taxNo]").val();
                var philhealthNo  = $("input[name=philhealthNo]").val();
                var pagibigNo     = $("input[name=pagibigNo]").val();
                var status        = $("select[name=status]").val();
                var taxStatus     = $("select[name=tax-status]").val();
                var housenumber = $("input[name='housenumber']").val();
                var barangay = $("input[name='barangay']").val();
                var city = $("input[name='city']").val();
                var region = $("input[name='region']").val();
                var height = $("input[name='height']").val();
                var weight = $("input[name='weight']").val();
                var bloodtype = $("input[name='bloodtype']").val();

                if(!firstname || !lastname){
                    alert("Should Not be Empty!");
                }else{
                    $.ajax({
                        type: "POST",
                        url : App.api + "/hris/employee/update/" + empUid + "." + App.token,
                        data: {
                            firstname    : firstname,
                            middlename   : middlename,
                            lastname     : lastname,
                            gender       : gender,
                            marital      : marital,
                            nationality  : nationality,
                            bday         : bday,
                            email        : email,
                            nickname     : nickname,
                            driverLicense: driverLicense,
                            expiryLicense: expiryLicense,
                            sssNo        : sssNo,
                            taxNo        : taxNo,
                            philhealthNo : philhealthNo,
                            pagibigNo    : pagibigNo,
                            status       : status,
                            taxStatus	 : taxStatus,
                            housenumber  : housenumber,
                            barangay     : barangay,
                            city: city,
                            region: region,
                            height: height,
                            weight: weight,
                            bloodtype: bloodtype
                        },
                        success: function() {
                            $("#update-cont").prop("hidden",false);
                            $("#submit-cont").prop("hidden",true);
                            alert("Data Updated");
                            employeePersonalDetails();
                            disableFields();
                        }
                    });
                }
            });

        });
        
        Path.map('#/dependents/:id').to(function(){
            var empUid = this.params["id"]; 
            var dependents = getJSONDoc(App.api + "/employee/dependent/pages/get/" + empUid + "." + App.token);
            var dependentsList = [];
            var depctr = 0;
            $.each(dependents,function(i,item){
                depctr++;
                var dependent = {
                    depctr,
                    name:item.name,
                    number:item.number,
                    relationship:item.relationship,
                    uid:item.employeeDependentUid
                }
                dependentsList.push(dependent);
            });
            var templateData = {
                dependentsList:dependentsList
            }
            App.canvas.html("").append($.Mustache.render("user-dependents",templateData));
            var tableID = '#table-dependents';
            renderToDataTablePrint(tableID);
            
            $(document).off("submit", "#new-dependent-form").on("submit", "#new-dependent-form", function(e) {
                e.preventDefault();

                var dependentName = $("input[name=dependentName]").val();
                var dependentRelationship = $("select[name=dependentRelationship]").val();
                var dependentBday = $("input[name=dependentBday]").val();
                var dependentNumber = $("input[name=dependentNumber]").val();

                console.log(dependentName +" "+ dependentRelationship+" "+dependentBday+" "+dependentNumber)

                if(!dependentName || !dependentRelationship || !dependentBday || !dependentNumber){
                    alert("Please Fill All The Fields");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/employee/dependent/new/" + empUid + "." + App.token,
                        data: {
                            dependentName: dependentName,
                            dependentRelationship: dependentRelationship,
                            dependentBday: dependentBday,
                            dependentNumber: dependentNumber
                        },
                        success: function() {
                            alert("Successfully Added!");
                            $("#new-Dependents").modal("toggle");
                            $("input[name=dependentName]").val("");
                            $("select[name=dependentRelationship]").val("");
                            $("input[name=dependentBday]").val("");
                            $("input[name=dependentNumber]").val("");
                            window.location.reload();
                        }
                    });
                }
            });

            $("#table-dependents tbody").off("click",".edit-btn").on("click",".edit-btn", function(e){
                e.preventDefault();
                depUid = $(this).attr("data-uid");
                $.getJSON(App.api + "/employee/dependent/view/" + empUid + "." + depUid + "." + App.token, function(data) {
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("input[name=dependentNameUpdate]").val(data.name);
                    $("select[name=dependentRelationshipUpdate]").val(data.relationship)
                    $("input[name=dependentBdayUpdate]").val(data.bday);
                    $("input[name=dependentNumberUpdate]").val(data.number);
                });
                
                $(document).off("submit", "#edit-dependent-form").on("submit","#edit-dependent-form", function(e){
                    e.preventDefault();
                    var dependentName = $("input[name=dependentNameUpdate]").val();
                    var dependentRelationship = $("select[name=dependentRelationshipUpdate]").val();
                    var dependentBday = $("input[name=dependentBdayUpdate]").val();
                    var dependentNumber = $("input[name=dependentNumberUpdate]").val();
                    var status = 0;
                    if ($("input[name='status']").val()=="Enable") {
                        status = 1;
                    }
                    if(!dependentName || !dependentRelationship || !dependentBday || !dependentNumber){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employee/dependent/update/" + empUid + "." + depUid + "." + App.token,
                            data: {
                                dependentName: dependentName,
                                dependentRelationship: dependentRelationship,
                                dependentBday: dependentBday,
                                dependentNumber: dependentNumber,
                                status: status
                            },
                            success: function() {
                                alert("Successfully updated!");
                                $("#editEmpDependent").modal("toggle");
                                $("input[name=dependentNameUpdate]").val("");
                                $("select[name=dependentRelationshipUpdate]").val("");
                                $("input[name=dependentBdayUpdate]").val("");
                                $("input[name=dependentNumberUpdate]").val("");
                                window.location.reload();
                            }
                        });
                    }
                });
            });
        });
        
        Path.map('#/work-experience/:id').to(function(){
            empUid = this.params["id"];
            var workExperiences = getJSONDoc(App.api + "/get/employee/workexperience/" + empUid + "." + App.token);
            var workExperienceList = [];
            var workctr = 0;

            $.each(workExperiences, function(i,item){
                workctr ++;   
                var result = {
                    number: workctr,
                    uid:item.uid,
                    emp_uid: item.emp_uid,
                    employer: item.employer,
                    position: item.position,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status
                }
                workExperienceList.push(result);
            });
            console.log(workExperiences);
            var templateData = {
                workExperienceList:workExperienceList
            }
            App.canvas.html("").append($.Mustache.render("user-work-experience",templateData));
            var tableID = '#table-work-experience';
            renderToDataTablePrint(tableID);
            $("#form-add-workexperience").on("submit",function(e){
                e.preventDefault();
                var employerWE = $("input[name=employer-name]").val();
                var jobTitleWE = $("input[name=position]").val();
                var fromWE = $("input[name=fromWE]").val();
                var toWE = $("input[name=toWE]").val();
                var employmentStatus = $("input[name=employment-status").val();
                if(employerWE == "" || jobTitleWE == "" || fromWE == "" || employmentStatus == "" || toWE == ""){
                    alert("Please Fill All The Fields");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/work/experience/new/" + App.username + "." + App.token,
                        data: {
                            employerWE: employerWE,
                            jobTitleWE: jobTitleWE,
                            fromWE: fromWE,
                            toWE: toWE,
                            status: employmentStatus
                        },
                        success: function() {
                            window.location.reload();
                        }
                    });
                }
            });

            $("#table-work-experience").off("click",".edit-btn").on("click",".edit-btn",function(){
                workexpuid = $(this).attr("data-uid");

                $.getJSON(App.api + "/work/experience/details/get/" + workexpuid + "." + App.token, function(data) {
                    console.log(data);
                    if (data.status == 1) {
                        $("input[name=status][value=Enable]").prop("checked", true);
                    } else {
                        $("[name=status][value=Disable]").prop("checked", true);
                    }

                    $("input[name=employerWEx]").val(data.employerWE);
                    $("input[name=jobTitleWEx").val(data.jobTitleWE);
                    $("input[name=fromWEx]").val(data.fromWE);
                    $("input[name=toWEx]").val(data.toWE);
                });

                $("#form-edit-workexp").on("submit",function(){
                    var employerWEx = $("input[name=employerWEx]").val();
                    var jobTitleWEx = $("input[name=jobTitleWEx]").val();
                    var fromWEx = $("input[name=fromWEx]").val();
                    var toWEx = $("input[name=toWEx]").val();
                    var status = 0;

                    console.log($("input[name=status]").val())
                    // if($("input[name=status]").val()=="Enable")
                    // {
                    //     status = 1
                    // }
    
                    if(employerWEx == "" || jobTitleWEx == "" || fromWEx == "" || toWEx == ""){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/work/experience/update/" + workexpuid + "." + App.token,
                            data: {
                                employerWEx: employerWEx,
                                jobTitleWEx: jobTitleWEx,
                                fromWEx: fromWEx,
                                toWEx: toWEx,
                                status: status
                            },
                            success: function(data) {
                                // console.log(data);
                                window.location.reload();
                            }
                        });
                    }
                });

            });

        });
        
        Path.map('#/education/:id').to(function(){
            uid = this.params["id"];
            console.log(uid);
            var educbackgrounds = getJSONDoc(App.api + "/educational/background/" + App.username + "." + App.token);
            var educbackgroundList = [];
            var educctr = 0;
            console.log(educbackgrounds);
            $.each(educbackgrounds, function(i,item){
                educctr ++;   
                var result = {
                    number: educctr,
                    uid:item.uid,
                    emp_uid: item.emp_uid,
                    level: item.level,
                    school: item.school,
                    major: item.major,
                    year: item.year,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status
                }
                educbackgroundList.push(result);
            });

            var educationLevels = getJSONDoc(App.api + "/get/education/level/" + App.token);
            var educationLevelList = [];
            $.each(educationLevels,function(i,item){
                var educationLevel = {
                    educLevelUid:item.uid,
                    level:item.level
                }
                educationLevelList.push(educationLevel)
            });

            var templateData = {
                educbackgroundList:educbackgroundList,
                educationLevelList:educationLevelList
            }
            App.canvas.html("").append($.Mustache.render("user-education",templateData));
            var tableID = '#table-education';
            renderToDataTablePrint(tableID);
            console.log(educbackgroundList);

            $("#newEducationForm").on("submit", function(e) {
                e.preventDefault();

                $(".empLoading").show();

                var level = $("select[name='employeeLevel']").val();
                var school = $("input[name='employeeSchool']").val();
                var major = $("input[name='employeeMajor']").val();
                var year = $("input[name='employeeYear']").val();
                var dstart = $("input[name='employeeDatestart']").val();
                var dend = $("input[name='employeeDateend']").val();

                $.ajax({
                    type: "POST",
                    url: App.api + "/educational/addnew/" + App.username + "." + App.token,
                    dataType: "json",
                    data: {
                        empid: uid,
                        level: level,
                        school: school,
                        major: major,
                        year: year,
                        dstart: dstart,
                        dend: dend
                    },
                    success: function(data){                        
                        if(parseInt(data.success) === 1) {
                            $(".empLoading").hide();
                            alert("Successfully added record!");
                            window.location.reload();   
                        }                    
                    }
                });
            });

            $(tableID).off("click",".edit-btn").on("click",".edit-btn",function(){
                var educationUid = $(this).attr("data-uid");
                console.log(educationUid);
                $.getJSON(App.api + "/education/details/get/" + educationUid + "." + App.token, function(data) {
                    console.log(data);
                    if (data.status = 1) {
                        $("input[name='status'][value='Enable']").prop("checked", true);
                    } else {
                        $("input[name='status'][value='Disable']").prop("checked", true);
                    }
                    $("select[name=edit-level]").val(data.educationLevelUid);
                    $("input[name=edit-school]").val(data.school);
                    $("input[name=edit-year]").val(data.year);
                    $("input[name=edit-major]").val(data.major);
                    $("input[name=edit-start]").val(data.startDate);
                    $("input[name=edit-end]").val(data.endDate);
                });

                $("#form-edit-education").on("submit",function(e){
                    e.preventDefault();
                    var levelDegree = $("select[name=edit-level]").val();
                    var school = $("input[name=edit-school]").val();
                    var year = $("input[name=edit-year]").val();
                    var major = $("input[name=edit-major]").val();
                    var score = 0;
                    var startDate = $("input[name=edit-start]").val();
                    var endDate = $("input[name=edit-end]").val();
                    var stat = $("input[name='status']").val()
                    var status = 0;
                    console.log(stat);
                    if($("input[name='status']").val() == "Enable")
                    {
                        status = 1;
                    }
                    if(levelDegree == "" || school == "" || year == "" || major == "" || startDate == "" || endDate == ""){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/education/update/" + educationUid + "." + App.token,
                            data: {
                                levelDegree: levelDegree,
                                school: school,
                                year: year,
                                major: major,
                                score: score,
                                startDate: startDate,
                                endDate: endDate,
                                status: status
                            },
                            success: function(data) {
                                window.location.reload();
                            }
                        });
                    }
                });
            });
        });

        Path.map("#/users/logout/").to(function(){
            $.ajax({
                type: "POST",
                url: App.api + "/users/logout/" + App.token,
                data: {
                    user: localStorage.getItem("Username")
                },
                success: function() {
                    localStorage.clear();
                    window.location.href = "../auth/#/login/";
                }
            });
        }).enter(clearPanel);


        Path.root();
        Path.listen();
    });
});


