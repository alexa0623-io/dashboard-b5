$(document).ready(function(){
    
    var App = {
        sideCanvas : $("#sideCanvas"),
        canvas : $("#canvas"),
        navCanvas : $("#navCanvas"),
        api     : Config.url + "/api",
        path    : Config.url + "/humano",
        token   : localStorage.getItem("Token"),
        username: localStorage.getItem("Username"),
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
                
        },
        navPillTimesheet:function(){
            $("#pills-all").on("click",function(){
                window.location.href = "#/timesheet/";
            });
            $("#pills-employee").on("click",function(){
                window.location.href = "#/timesheet/employee/";
            })
        },
        navPillListing:function(){
            $("#pills-employee").on("click",function(){
                window.location.href  = "#/scheduling/employee/"
            });

            $("#pills-group").on("click",function(){
                window.location.href = "#/scheduling/group/"
            });

            $("#pills-listing").on("click",function(){
                window.location.href = "#/scheduling/"
            });
        },
        calendar:function(){
            console.log("This is the calendar render function");
            const currentDate = $(".current-date");
            const daysTag = $(".days");
            const prevNextIcon = document.querySelectorAll(".icon-nav");
            
            const months = ["January","February","March","April","May","June","July","August","September","October","November", "December"]
            let date = new Date(),
            currYear = date.getFullYear(),
            currMonth = date.getMonth();
            const calendarRender = () => {
                let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
                lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
                lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
                lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
                let liTag = "";

                for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
                    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
                }

                for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
                    // adding active class to li if the current day, month, and year matched
                    let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                                && currYear === new Date().getFullYear() ? "active" : "";
                    liTag += `<li class="${isToday}">${i}</li>`;
                }

                for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
                    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
                }
                currentDate.text(`${months[currMonth]} ${currYear}`); // passing current mon and yr as currentDate text
                daysTag.html(liTag);
            }
            calendarRender();
            
            $(document).off("click",".icon-nav").on("click",".icon-nav",function(){
                var iconId = $(this).attr("id");
                if(iconId === "prev")
                {
                    currMonth--
                }
                else
                {
                    currMonth++;
                }
                console.log(iconId, currMonth);
                if(currMonth < 0 || currMonth > 11) {
                    date = new Date(currYear, currMonth, new Date().getDate());
                    currYear = date.getFullYear(); 
                    currMonth = date.getMonth(); 
                } else {
                    date = new Date();
                }
                calendarRender();
            });
            
        }
    }

    function clearPanel() {
        App.canvas.hide().fadeIn(200);
    }

    $.Mustache.load('templates/krono.html').done(function(){
        var data = getJSONDoc(App.api + "/get/user/data/" + App.username);
        var templateData = {
            empUid:App.username,
            empName:data.name
        }
        App.toggleSidebar();
        App.sidebarLink();
        App.deskArrow();
        App.mobileArrow();
        App.navbarLinkDropdown();
        App.uploadImage();
        App.uploadFile();
        App.formValidation();
        App.removeDrag();
        App.sideCanvas.html("").append($.Mustache.render("side-nav",templateData));
        App.navCanvas.html("").append($.Mustache.render("admin-nav",templateData));

        // DASHBOARD
        Path.map('#/dashboard/').to(function(){
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
            App.canvas.html("").append($.Mustache.render("krono-dash",templateData));
            App.calendar();
            var tableID = ['#table-birthday-celebration','#table-new-employee',];
            $.each(tableID,function(i,item){
                renderToDataTableDashboard(item);
            })
        });

        // MASTER FILE
        Path.map('#/master-file/').to(function(){
            var number = 0;
            var employees = getJSONDoc(App.api + "/employees/pages/get/" + App.token);
			var employeesList = [];			
			$.each(employees, function(i, item){
                number++;
				var employeeData = {
                    number:number,
					empNo:item.empNo,
					empUid:item.empUid,
                    empNickname:item.nickname,
                    gender:item.gender,
                    empName:item.lastname + ", " + item.firstname + " " + item.middlename,
                    costcenter:item.costcenter,
                    access:item.type,
                    rule:item.rule,
				}
				employeesList.push(employeeData);
			});
            console.log(employeesList);
            var templateData = {
                employeesList:employeesList
            }
            App.canvas.html("").append($.Mustache.render("krono-master-file",templateData));
            var tableID = '#table-master-file';
            renderToDataTablePrint(tableID);

            $("#table-master-file tbody").off("click", "td .edit-emp-num").on("click", "td .edit-emp-num", function(e) {
                e.preventDefault();
                // validationForEdit();

                var empUid = $(this).attr("data-index");
                console.log(empUid);
                $.getJSON(App.api + "/employee/data/get/" + empUid + "." + App.token, function(data) {
                    $("input[name=curEmpNo]").val(data.empNumber);
                    console.log(data);
                });

                $(document).off("submit", "#updateEmployeeNumberForm").on("submit", "#updateEmployeeNumberForm", function(e){
                    e.preventDefault();
                    var empNumber = $("input[name=empNo]").val();

                    if(!empNumber){
                        alert("Please Fill all The Fields!");
                    }else{
                        $.ajax({
                            type    : "POST",
                            url     : App.api + "/update/emp/number/" + empUid,
                            dataType: "json",
                            data    : {
                                empNumber: empNumber
                            },
                            success: function(data){
                                if(data.prompt == 0){
                                    $("form")[0].reset();
                                    window.location.reload();
                                }else{
                                    alert("Employee Number " + data.num + " is Taken.");
                                }
                            }
                        });
                    }
                });
            });

            $("#table-master-file tbody").off("click", "td .edit-emp-type").on("click", "td .edit-emp-type", function(e) {
                e.preventDefault();

                var empUid = $(this).attr("data-index");

                $.getJSON(App.api + "/employee/data/get/" + empUid + "." + App.token, function(data) {
                    // $("select[name=usertypes]").val(data.type);
                    // if(data.type == "Administrator"){
                    //     $("select[name=usertypes]").prop("selected", true);
                    // }else{
                    //     $("select[name=usertypes]").prop("selected", false);
                    // }
                    $("select[name=usertypes] option[value='"+data.type+"']").attr("selected", "selected");
                });

                $(document).off("submit", "#newEmployeeTypeForm").on("submit", "#newEmployeeTypeForm", function(e){
                    e.preventDefault();
                    var empType = $("select[name=usertypes]").val();

                    if(!empType){
                        alert("Please Fill all The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/update/emp/type/" + empUid,
                            data: {
                                empType: empType
                            },
                            success: function(data){
                                alert("Success!");
                                window.location.reload();
                            }
                        });
                    }
                });
            });

        });

        // MASTER FILE / MODAL 
        Path.map('#/master/file/modal/name/:empUid').to(function(){
            empUid = this.params["empUid"];
            
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

            var employeeStatus = getJSONDoc(App.api + "/get/emp/employment/status/" + empUid);
			var employeeStatusList = [];
			var empnum = 0;
			$.each(employeeStatus, function(i, item){
				empnum++;
				var employee = {
					no: empnum,
					type: item.type,
					dateHired: item.dateHired,
                    dateStarted: item.dateStarted,
					dateResigned: item.dateResigned,
					empStatusUid: item.empStatusUid
				}
				employeeStatusList.push(employee);
			});

            var departments = getJSONDoc(App.api + "/employee/departments/view/" + empUid + "." + App.token).list;
			var departmentList = [];
			var deptctr = 0;
			var kick = null;
			$.each(departments, function(i, item){
				deptctr++;
				var department = {
					no: deptctr,
					uid: item.uid,
					dept:item.dept,
					name: item.department,
                    post:item.position,
					status: item.status
				}
				kick = item.status;
				departmentList.push(department);
			});

            var salaries = getJSONDoc(App.api + "/employee/salary/get/" + empUid + "." + App.token);
			var salaryList = [];
			var salctr = 0;
			
			$.each(salaries, function(i, item){
				salctr++;
				var salary = {
					no: salctr,
					uid: empUid,
					baseSalary:item.baseSalary,
					payPeriodUid: item.payPeriodUid,
					salaryUid: item.salaryUid
				}
				salaryList.push(salary);
			});

            var empRules = getJSONDoc(App.api + "/emp/rules/data/" + empUid);
            var empRulesList = [];
            var rulectr = 0;
            $.each(empRules,function(i,item){
                rulectr++
                var empRule = {
                    rulectr,
                    ruleName:item.ruleName,
                    ruleUid:empUid+"."+item.ruleUid
                }
                empRulesList.push(empRule);
            });

            var empCostCenters = getJSONDoc(App.api + "/employee/costcenter/data/" + empUid);
            var empCostCenterList = [];
            var costctr = 0;
            $.each(empCostCenters,function(i,item){
                costctr++;
                var empCostCenter = {
                    ccname:item.ccName,
                    ccdesc:item.ccDesc,
                    empCostUid:item.empCostUid
                }
                empCostCenterList.push(empCostCenter)
            });

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
                    bday:item.bday,
                    uid:item.employeeDependentUid
                }
                dependentsList.push(dependent);
            });

            var educbackgrounds = getJSONDoc(App.api + "/educational/background/" + empUid + "." + App.token);
            var educbackgroundList = [];
            var educctr = 0;

            $.each(educbackgrounds, function(i,item){
                educctr ++;   
                var result = {
                    number: educctr,
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

            var workExperiences = getJSONDoc(App.api + "/get/employee/workexperience/" + empUid + "." + App.token);
            var workExperienceList = [];
            var workctr = 0;

            $.each(workExperiences, function(i,item){
                workctr ++;   
                var result = {
                    number: workctr,
                    emp_uid: item.emp_uid,
                    employer: item.employer,
                    position: item.position,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status
                }
                workExperienceList.push(result);
            });

            var statusOptions = getJSONDoc(App.api + "/employment/status/get/" + App.token);
            var statusOptList = [];
            $.each(statusOptions,function(i,item){
                var statusOption = {
                    statusUid:item.employmentStatusUid,
                    statusName:item.name
                }
                statusOptList.push(statusOption);
            });
            
            var deptOptions = getJSONDoc(App.api + "/departments/view/" + App.token);
            var deptOptList = [];
            $.each(deptOptions,function(i,item){
                var deptOption = {
                    deptUid:item.uid,
                    department:item.department
                }
                deptOptList.push(deptOption);
            });

            var frequencyOptions = getJSONDoc(App.api + "/employee/salary/frequency/get/");
                var frequencyList = [];
                $.each(frequencyOptions,function(i,item){
                    var frequency = {
                        frequencyUid:item.frequencyUid,
                        frequencyName:item.frequencyName
                    }
                    frequencyList.push(frequency);
                });
            var rulesOptions = getJSONDoc(App.api + "/get/rules/number/");
            var rulesList = [];
            $.each(rulesOptions,function(i,item){
                var rule = {
                    ruleUid:item.ruleUid,
                    ruleName:item.ruleName
                }
                rulesList.push(rule)
            });

            var costCeneterOptions = getJSONDoc(App.api + "/get/costcenter/");
            var ccOptionList = []
            $.each(costCeneterOptions,function(i,item){
                ccOpts = {
                    costCenterUid:item.uid,
                    costCenterName:item.name,
                    costCenterDesc:item.description
                }
                ccOptionList.push(ccOpts);
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
                taxStatusList:taxStatusList,
                nationalList:nationalList,
                employeeStatusList:employeeStatusList,
                departmentList:departmentList,
                salaryList:salaryList,
                empRulesList:empRulesList,
                empCostCenterList:empCostCenterList,
                dependentsList:dependentsList,
                educbackgroundList:educbackgroundList,
                workExperienceList:workExperienceList,
                statusOptList:statusOptList,
                deptOptList:deptOptList,
                frequencyList:frequencyList,
                rulesList:rulesList,
                ccOptionList:ccOptionList,
                educationLevelList:educationLevelList
            }

            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-master-file-modal",templateData));
            var tableID = ['#table-master-file-modal','#table-krono-employee-status','#table-krono-department','#table-krono-salary','#table-krono-rules','#table-krono-cost-center','#table-krono-dependents','#table-krono-allowance','#table-krono-loans','#table-krono-documents',];
            $.each(tableID,function(i,item){
                renderToDataTable(item);
            })

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

            $(document).off("submit", "#updateEmployee").on("submit", "#updateEmployee", function(e) {
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

            //Employment status start
            $("#table-employee-status tbody").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var uid = $(this).attr("data-uid");

                $.getJSON(App.api + "/get/single/emp/employment/status/" + uid, function(data){
                    console.log(data);
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("input[name=employeeStatusDateHiredEdit]").val(data.dateHired);
                    $("input[name=employeeStatusDateStartedEdit]").val(data.dateStarted);
                    $("input[name=employeeStatusDateResignedEdit]").val(data.dateResigned);
                    $("select[name=employeeStatusEdit]").val(data.statusUid);
                });

                function getEmploymentStatusPages(uid){
                    $.getJSON(App.api + "/get/emp/employment/status/" + uid, function(data){
                        $.each(data, function(i, item){
                            $("#td-type").text(item.type);
                            $("#td-datehired").text(item.dateHired);
                            $("#td-datestarted").text(item.dateStarted);
                            $("#td-dateresigned").text(item.dateResigned);
                        });
                        console.log(data);
                    });
                }

                $(document).off("submit", "#editEmpStatusForm").on("submit", "#editEmpStatusForm", function(e){
                    e.preventDefault();
                    var employeeStatus = $("select[name=employeeStatusEdit]").val();
                    var dateHired = $("input[name=employeeStatusDateHiredEdit]").val();
                    var dateStarted = $("input[name=employeeStatusDateStartedEdit]").val();
                    var dateResigned = $("input[name=employeeStatusDateResignedEdit]").val();
                    var status = 0;
                    if ($("input[name='status']").val()==="Enable"){
                        status = 1;
                    }

                    if(!employeeStatus || !dateHired){
                        alert("Please Fill the required Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/update/emp/employment/status/" + uid,
                            data: {
                                employeeStatus : employeeStatus,
                                dateHired : dateHired,
                                dateStarted: dateStarted,
                                dateResigned : dateResigned,
                                status : status
                            },
                            success: function(){
                                alert("Success!");
                                $("#edit-modal").modal("toggle");
                                $("#editEmpStatusForm")[0].reset();
                                getEmploymentStatusPages(empUid);
                            }
                        });
                    }
                });
            });
            //Employment status 
            // Departments start
            $(document).off("click", ".edit-department").on("click", ".edit-department", function(e){
                e.preventDefault();
				var uid = $(this).attr("data-uid");
				var dept = $(this).attr("data-dept");
                var post = $(this).attr("data-post");
				
                $("select[name=edit-department]").val(dept);
                $("input[name=edit-position]").val(post);

                $("#form-editDepartment").on('submit',function(e){
                    e.preventDefault();
                    var department = $("select[name=edit-department]").val();
                    var position = $("input[name=edit-position]").val();
                   
                    $.ajax({
                        type: "POST",
                        url: App.api + "/employee/department/edit/" + uid + "." + App.token,
                        dataType: "json",
                        data: {
                            uid: uid,
                            department: department,
                            position: position
                        },
                        success: function(data){
                            if(parseInt(data.success) === 1){
                                $("#edit-department").modal("toggle");
                                $("#form-editDepartment")[0].reset();
                                getDepartmentDetails(empUid);
                            }
                        }
                    });
                });
			});

            function getDepartmentDetails(empUid){
                $.getJSON(App.api + "/employee/departments/view/" + empUid + "." + App.token,function(data){
                    console.log(data.list);
                    $.each(data.list, function(i, item) {
                        $("#td-deptname").text(item.department);
                        $("#editBtn").attr("data-uid",item.uid);
                        $("#editBtn").attr("data-dept",item.dept);
                        $("#editBtn").attr("data-post",item.position);
                    });
                });
            }
            //Department End
            $("#table-salary tbody").off("click",".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();

                // validationForEdit();

                var data = $(this).attr("data-salary-uid");
                var dataIndex = data.split(".");

                var uid = dataIndex[0];
                var salaryUid = dataIndex[1];

                $.getJSON(App.api + "/salary/details/get/" + salaryUid + "." + App.token, function(data) {
                    console.log(data);
                    if (data.status == 1) {
                        $("input[name='status']").prop("checked", true);
                    } else {
                        $("input[name='status']").prop("checked", false);
                    }

                    $("input[name=employee-salary-base-salary-edit]").val(data.baseSalary);
                    $("select[name=pay-period-edit]").val(data.frequencyUid);
                });

                $(document).off("submit", "#editSalaryForm").on("submit", "#editSalaryForm", function(e) {
                    e.preventDefault();
                    var baseSalary = $("input[name=employee-salary-base-salary-edit]").val();
                    var payPeriodUid = $("select[name=pay-period-edit]").val();
                    var status = 0;
                    if ($("[name='status']").is(":checked")) {
                        status = 1;
                    }
                    console.log(baseSalary+" "+payPeriodUid+" "+status);
                    if(!baseSalary || !payPeriodUid){
                        alert("Please Fill All The Fields!");
                    }
                    else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employee/salary/update/" + salaryUid + "." + App.token,
                            data: {
                                uid: uid,
                                baseSalary: baseSalary,
                                payPeriodUid: payPeriodUid,
                                status: status
                            },
                            success: function(data) {  
                                alert("Successfully Updated!");
                                $("#edit-salary").modal("toggle");
                                employeeSalary(empUid)
                            }
                        });
                    }
                });
            });
            function employeeSalary(empUid){
                $.getJSON(App.api + "/employee/salary/get/" + empUid + "." + App.token, function(data){
                    $.each(data,function(i,item){
                        $("#td-baseSalary").text(item.baseSalary);
                        $("#td-payPeriodUid").text(item.payPeriodUid);
                        $("#editSalbtn").attr('data-salary-uid',empUid+"."+item.salaryUid);
                    });
                });
            }

            function getEmpRulesDetails(empuid){
                $.getJSON(App.api + "/emp/rules/data/" + empuid, function(data){
                    console.log(data)
                    $.each(data,function(i,item){
                        $("#td-ruleName").text(item.ruleName);
                        $(".edit-btn").attr("data-uid",empUid+"."+item.ruleUid);
                    });
                });
            }

            $("#table-rules tbody").on("click","td .edit-btn",function(e){
                e.preventDefault();
                var datauid = $(this).attr("data-uid");
                var dataUids = datauid.split(".");
                var empuid = dataUids[0];
                var ruleUid = dataUids[1];

                $.getJSON(App.api + "/employee/rules/data/" + ruleUid, function(data){
                    console.log(data.status);
                    if (data.status = 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("select[name=employeeRulesEdit]").val(data.ruleUid);
                });

                $(document).off("submit", "#edit-rule-form").on("submit", "#edit-rule-form", function(e){
                    e.preventDefault();

                    var rule = $("select[name=employeeRulesEdit]").val();
                    var status = 0;
                    if($("input[name=status]").val()==="Enable"){
                        status = 1;
                    }
                    console.log(rule + " " + status);

                    $.ajax({
                        type: "POST",
                        url: App.api + "/employee/rules/update/" + ruleUid,
                        data: {
                            rule: rule,
                            status: status
                        },
                        beforeSend: function(){
                            $(".pLoading").show();                      
                        },
                        success: function(){
                            $(".pLoading").hide();
                            getEmpRulesDetails(empuid);                   
                            alert("Successfully Updated!");
                            $("#edit-rules").modal("toggle");
                        }
                    });
                });
            });

            $("#table-cost-center tbody").on("click",".edit-btn", function(){
                var datauid = $(this).attr("data-uid");
                console.log(datauid);
                $.getJSON(App.api + "/employee/costcenter/single/data/" + datauid, function(data){
                    if (data.status = 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("select[name=edit-cost-center]").val(data.costUid);
                });

                $(document).off("submit", "#edit-costcenter-form").on("submit", "#edit-costcenter-form", function(e){
                    e.preventDefault();
                    var costcenter = $("select[name=edit-cost-center]").val();
                    var status = 0;
                    if($("input[name=status]").val()==="Enable"){
                        status = 1;
                    }

                    if(!costcenter){
                        alert("Please Fill all the fields!");
                    }else{
                        console.log(costcenter + "  " + status);
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employee/update/costcenter/" + datauid,
                            data: {
                                costcenter : costcenter,
                                status     : status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(){
                                alert("Successfully Updated!");
                                $("#edit-cost-center").modal("toggle");
                                getEmpCostCenter(empUid);
                            }
                        });
                    }
                });
            });
            function getEmpCostCenter(empUid){
                $.getJSON(App.api + "/employee/costcenter/data/" + empUid, function(data){
                    $.each(data,function(i,item){
                        $("#td-ccname").text(item.ccName);
                        $("#td-ccdesc").text(item.ccDesc);
                        $(".edit-btn").attr("data-uid",item.empCostUid);
                    });
                });
            }
            //Dependent Start
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
                            $("#new-dependent-form")[0].reset();
                            getEmployeeDependentPages(empUid);
                        }
                    });
                }
            });

            function getEmployeeDependentPages(empUid){
                var num = 0
                var dependents = getJSONDoc(App.api + "/employee/dependent/pages/get/" + empUid + "." + App.token);
                $(".remove-on-edit").remove();
                $.each(dependents,function(i,item){
                    num++;
                    var html = "<tr class='remove-on-edit'>";
                        html += "<td>" + num + "</td>";
                        html += "<td>" + item.name + "</td>";
                        html += "<td>" + item.number + "</td>";
                        html += "<td>" + item.relationship + "</td>";
                        html += "<td>" + item.bday + "</td>";
                        html += "<td class='text-md-start text-end'>"+
                        "<button class='edit-btn btn btn-outline-success' data-bs-dismiss='modal' data-bs-toggle='modal' aria-label='Close' data-bs-target='#edit-Dependent' data-uid='"+item.employeeDependentUid+"'>Edit</button></td>";
                        html += "</tr>";
                    $("#table-dependents tbody").append(html);
                });
            };

            $("#table-dependents tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var depUid = $(this).attr("data-uid");
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
                
                $(document).on("submit", "#edit-dependent-form", function(e){
                    e.preventDefault();
                    var dependentName = $("input[name=dependentNameUpdate]").val();
                    var dependentRelationship = $("select[name=dependentRelationshipUpdate]").val();
                    var dependentBday = $("input[name=dependentBdayUpdate]").val();
                    var dependentNumber = $("input[name=dependentNumberUpdate]").val();
                    var status = 0;
                    console.log(dependentName+" "+dependentRelationship+" "+dependentBday+" "+dependentNumber);
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
                                alert("Successfully Added!");
                                $("#edit-Dependent").modal("toggle");
                                $("#edit-dependent-form")[0].reset();
                                $("#edit-dependent-form").removeClass('was-validated');
                                getEmployeeDependentPages(empUid);
                            }
                        });
                    }
                });
            });
        });
        //Dependents End

        // SCHEDULING
        Path.map('#/scheduling/').to(function(){
            var schedule = getJSONDoc(App.api + "/work_schedule/view/" + App.token).list;
            var scheduleList = [];
            var number = 0;
            $.each(schedule, function(i,item){
                number ++;
                var scheduled = {
                    no: number,
					uid: item.uid,
                    schedule_uid: item.schedule_uid,
                    schedule_type: item.schedule_type,
                    from_date: item.from_date,
                    to_date: item.to_date,
					shift_uid: item.shift_uid,
					type: item.type,
					status: item.status,
					group: item.group
                }                
                scheduleList.push(scheduled);
            });

            var departments = getJSONDoc(App.api + "/departments/view/" + App.token);
            var departmentList = [];
            var ctr = 0;
            $.each(departments, function(i,item){
                ctr++;
                var department = {
                    uid: item.uid,
                    department: item.department
                }
                departmentList.push(department);
            });

            var shifts = getJSONDoc(App.api + "/shift/get/data/" + App.token);
            var shiftsList= [];
            $.each(shifts, function(i,item){
                var shift = {
                    shiftuid: item.shiftUid,
                    shiftname: item.name,
                    shift: item.shift,
                    start: item.start,
                    end: item.end,
                    grace: item.grace,
                    batch: item.batch
                }
                shiftsList.push(shift);
            });

            var scheduleTypes = getJSONDoc(App.api + "/schedule_type/view/" + App.token);
            var scheduleTypesList = [];
            $.each(scheduleTypes, function(i,item){
                var schedtype = {
                    schedtypeUid:item.uid,
                    schedtype:item.type
                }
                scheduleTypesList.push(schedtype);
            });

            var employees = getJSONDoc(App.api + "/get/employee/name/" + App.token);
            var employeeList = [];
            $.each(employees, function(i,item){
                var employee = {
                    empUid:item.uid,
                    empNumber:item.employee_number,
                    firstname:item.firstname,
                    lastname:item.lastname,
                    middlename:item.middlename
                }
                employeeList.push(employee);
            });

            var templateData = {
                schedules: scheduleList,
                departments: departmentList,
                shifts: shiftsList,
                shiftType:scheduleTypesList,
                employees:employeeList
            }

            App.canvas.html("").append($.Mustache.render("krono-scheduling",templateData));
            App.navPillListing();

            var tableID = ['#table-scheduling-listing','#table-scheduling-employee','#table-scheduling-group'];
            $.each(tableID,function(i,item){
                renderToDataTablePrint(item);
            });

            $('#optGroup').on("click",function(){
                $("select[name=group]").fadeIn();
                $("select[name=individual]").hide();
            })

            $('#optIndividual').on("click",function(){
                $("select[name=group]").hide();
                $("select[name=individual]").removeAttr('hidden',false);
                $("select[name=individual]").fadeIn();
            })

            $("#newScheduleForm").on("submit", function(e){
				e.preventDefault();
				
				var sched = "";
				var sched_type = "";
				if ($('#optGroup').is(':checked') == true) {
					sched = $("select[name=group]").val();
					sched_type = "Group";
				}
				else if ($('#optIndividual').is(':checked') == true) {
					sched = $("select[name=individual]").val();
					sched_type = "Individual";
				}
				
				var fromDate = $("input[name=fromDate]").val();
				var toDate = $("input[name=toDate]").val();
				var shift = $("select[name=shift-type]").val();
				var type = $("select[name=schedule-type]").val();
				console.log(sched_type +" "+ sched +" "+ fromDate +" "+ toDate +" "+ shift +" "+ type)
				// schedule_uid, schedule_type, from_date, to_date, shift_uid, shift_type
				$.ajax({
						type: "POST",
						url: App.api + "/work_schedule/new/" + App.token,
						dataType: "json",
						data: {
							schedule_type: sched_type,	
							schedule_uid: sched,
							from_date: fromDate,
							to_date: toDate,
							shift_uid: shift,
							shift_type: type
						},
						success: function(data) {
							$.each(data, function(i, item) {
								if(parseInt(item.date_error) === 1) {
									$('.error-message').empty();
									$('.error-message').append("<strong>Sorry, we could not process your request, you put in an invalid date!</strong>");
								}
								else{
									$('.error-message').empty();
									if(parseInt(item.verified) === 1) {
										window.location.hash = "/scheduling/";
										window.location.reload();
									}
								}
							});
						}
				});
			});

            $(document).off("click", ".edit-btn-schedule").on("click", ".edit-btn-schedule", function(e){
                e.preventDefault();
				
				var uid = $(this).attr("data-uid");
				$("#edit-uid").val(uid);
				
				var sched_uid = null;
				
				$.getJSON(App.api + "/work_schedule/view/edit/" + uid + "." + App.token, function(data){
					$.each(data, function(i, item){
						$("input[name=edit-fromDate]").val(item.from_date);
						$("input[name=edit-toDate]").val(item.to_date);
                        if(item.schedule_type === "Group")
                        {
                            $("#edit-optGroup").attr('checked',true);
                            $("select[name=edit-group]").fadeIn();
                            $("select[name=edit-group]").val(item.schedule_uid);
                        }
                        else
                        {
                            $("#edit-optIndividual").attr('checked',true);
                            $("select[name=edit-group]").attr('hidden',true);
                            $("select[name=edit-individual]").removeAttr('hidden');
                            $("select[name=edit-individual]").fadeIn();
                            $("select[name=edit-individual]").val(item.schedule_uid);
                        }
						$("select[name=edit-shift-type]").val(item.shift_uid);
                        $("select[name=edit-schedule-type").val(item.shift_type);
					});
				});

                $("#editScheduleForm").on("submit", function(e) {
                    e.preventDefault();
                    var sched = "";
                    var sched_type = "";
                    if ($('#edit-optGroup').is(':checked') == true) {
                        sched = $("select[name=edit-group]").val();
                        sched_type = "Group";
                    }
                    else if ($('#edit-optIndividual').is(':checked') == true) {
                        sched = $("select[name=edit-individual]").val();
                        sched_type = "Individual";
                    }
                    
                    var fromDate = $("input[name=edit-fromDate]").val();
                    var toDate = $("input[name=edit-toDate]").val();
                    var shift = $("select[name=edit-shift-type]").val();
                    var type = $("select[name=edit-schedule-type]").val();
                    
                    $.ajax({
                            type: "POST",
                            url: App.api + "/work_schedule/edit/" + uid + "." + App.token,
                            dataType: "json",
                            data: {
                                schedule_type: sched_type,	
                                schedule_uid: sched,
                                from_date: fromDate,
                                to_date: toDate,
                                shift_uid: shift,
                                shift_type: type
                            },
                            success: function(data) {
                                $.each(data, function(i, item) {
                                    if(parseInt(item.date_error) === 1) {
                                        $('.error-message').empty();
                                        $('.error-message').append("<strong>Sorry, we could not process your request, you put in an invalid date!</strong>");
                                    }
                                    else{
                                        $('.error-message').empty();
                                        if(parseInt(item.verified) === 1) {
                                            window.location.hash = "/scheduling/";
                                            window.location.reload();
                                        }
                                    }
                                });
                            }
                    });
                });
			});

            $(document).off("click", ".delete-btn-schedule").on("click", ".delete-btn-schedule", function(e) {
                e.preventDefault();				
				var uid = $(this).attr("data-uid");
                $("#deleteScheduleForm").on("submit", function(e) {
                    e.preventDefault();						
                    $.ajax({
                        type: "POST",
                        url: App.api + "/work_schedule/delete/" + uid + "." + App.token,
                        dataType: "json",
                        success: function(data) {
                            if(parseInt(data.success) === 1) {
                                window.location.reload();
                            }
                            else {
                                alert("Error encountered, process failed!");
                            }
                        }
                    });
                });
			});
        });

        Path.map("#/scheduling/employee/").to(function(){
            var schedule = getJSONDoc(App.api + "/work_schedule/employee/view/" + App.token).list;
            var scheduleList = [];
            var number = 0;
            $.each(schedule, function(i,item){
                number ++;
                var scheduled = {
                    no: number,
					uid: item.uid,
                    schedule_uid: item.schedule_uid,
                    schedule_type: item.schedule_type,
                    from_date: item.from_date,
                    to_date: item.to_date,
					shift_uid: item.shift_uid,
					type: item.type,
					status: item.status,
					emp_name: item.emp_name
                }                
                scheduleList.push(scheduled);
            });
            var templateData = {
                schedules: scheduleList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-scheduling-employee",templateData));
            App.navPillListing();
        });

        Path.map("#/scheduling/group/").to(function(){
            var schedule = getJSONDoc(App.api + "/work_schedule/group/view/" + App.token).list;
            var scheduleList = [];
            var number = 0;
            $.each(schedule, function(i,item){
                number ++;
                var scheduled = {
                    no: number,
					uid: item.uid,
                    schedule_uid: item.schedule_uid,
                    schedule_type: item.schedule_type,
                    from_date: item.from_date,
                    to_date: item.to_date,
					shift_uid: item.shift_uid,
					type: item.type,
					status: item.status,
					department: item.department
                }                
                scheduleList.push(scheduled);
            });
            var templateData = {
                schedules: scheduleList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-scheduling-group",templateData));
            App.navPillListing();
        })

        // REQUEST
        Path.map('#/timesheet/').to(function(){
            var costCeneterOptions = getJSONDoc(App.api + "/get/costcenter/");
            var ccOptionList = []
            $.each(costCeneterOptions,function(i,item){
                ccOpts = {
                    costCenterUid:item.uid,
                    costCenterName:item.name,
                    costCenterDesc:item.description
                }
                ccOptionList.push(ccOpts);
            });

            var shiftOptions = getJSONDoc(App.api + "/get/shifts/");
            var shiftOptionsList = [];
            $.each(shiftOptions,function(i,item){
                shift = {
                    shiftUid:item.shiftUid,
                    shiftEnd:item.shiftEnd,
                    shiftStart:item.shiftStart,
                    shiftName:item.shiftName,
                    gracePeriod:item.gracePeriod
                }
                shiftOptionsList.push(shift);
            })

            var templateData = {
                ccOptionList:ccOptionList,
                shiftOptionsList:shiftOptionsList
            }

            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-timesheet",templateData));
            App.navPillTimesheet();
            renderToDataTablePrint("#table-timesheet-all");
            initSelect2('select[name=employeeCostCenter]');
            $(document).off("submit", "#timesheetform").on("submit", "#timesheetform", function(e){
                e.preventDefault();
                var number  = 0;
                var numbers = 0;
                $("#print").attr("Disabled", false);
                // var printLocationUrl = App.api + printLocation + App.token;
                // $("#printReportForm").attr("action", printLocationUrl);
                // var employee      = $("#tdTimesheetEmployee").val();
                var startDate        = $("input[name=tdTimesheetStartDate]").val();
                var endDate          = $("input[name=tdTimesheetEndDate]").val();
                var employee         = $("#employeeName").val();
                var costcenter       = $("select[name=employeeCostCenter]").val();
                
                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate || !costcenter){
                    alert("Please Fill All The Fields!");
                }else{
                    $("#fromDate").text(moment(startDate).format('LL'));
                    $("#endDate").text(moment(endDate).format('LL'));
                    function getTimesheetResult(){
                        $("#loading-humano").show();
                        $("#table-timesheet-all").DataTable().clear().destroy();
                        $.getJSON(App.api + "/time/data/cost/center/"+ startDate + "." + endDate + "." + costcenter, function(data){
                            console.log(data);
                            $.each(data, function(i, item){
                                numbers++;
                                var style;
                                var action = "<small><button name='aEdit' class='button btn edit-btn' data-index='"+ item.inId + "." + item.outId +"' data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa fa-pencil-square-o'></i></button><button name='aDelete' class='button btn edit-btn' data-index='"+ item.inId +"."+ item.outId +"' data-bs-toggle='modal' data-bs-target='#timeDelete' title='Remove'><i class='fa fa-times'></i></button></td></small>";
                                var loc    = item.location;
                                var datas  = loc.split("=");
                                var timeInLocation  = datas[0];
                                var timeOutLocation = datas[1];

                                switch(item.prompt){
                                    case 0:
                                        style  = "background-color: #fcf8e3";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='setTime' class='set-btn btn btn-sm btn-outline-primary' data-index='"+ item.id +"' data-bs-toggle='modal' data-bs-target='#setTimeInOut' title='Set'><i class='fa-regular fa-calendar'></i></button>"+
                                                        "<button name='aAbsent' class='btn btn-sm btn-outline-dark' data-index='"+ item.date +"."+ item.id +"' title='Absent'><i class='fa-solid fa-minus'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 1:
                                        style  = "color:black";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"' data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                        "<button name='aDelete' class='btn btn-sm btn-outline-danger' data-index='"+ item.inId +"."+ item.outId +"'data-bs-toggle='modal' data-bs-target='#timeDelete' title='Remove'><i class='fa-solid fa-trash-can'></i></button>"+
                                                    "</div></td>"+
                                                "</small>";
                                        break;
                                    case 2:
                                        style  = "background-color: #dff0d8";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='setTime' class='set-btn btn btn-sm btn-outline-primary' data-index='"+ item.id +"' data-bs-toggle='modal' data-bs-target='#setTimeInOut' title='Set'><i class='fa-regular fa-calendar'></i></button>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 3:
                                        style  = "background-color: #f2dede";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='setTime' class='set-btn btn btn-sm btn-outline-primary' data-index='"+ item.id +"' data-bs-toggle='modal' data-bs-target='#setTimeInOut' title='Set'><i class='fa-regular fa-calendar'></i></button>"+
                                                        "<button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.inId +"."+ item.outId +"' data-bs-toggle='modal' data-bs-target='#timeDelete'><i class='fa-solid fa-xmark' title='Remove'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 4:
                                        style  = "background-color: #d9edf7";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 5:
                                        style = "background-color: #B2B2B2";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-primary' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 6:
                                        style = "background-color: #ffe6da";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-primary' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 7:
                                        style = "background-color: #e4e0ff";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"' data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                        "<button name='aDelete' class='btn btn-sm btn-outline-danger' data-index='"+ item.inId +"."+ item.outId +"' data-bs-toggle='modal' data-bs-target='#timeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                }

                                var tdTimeOut = "";
                                if(item.out == "No Time Out!" || item.out == "NO TIME OUT"){
                                    tdTimeOut = "<a href='#' name='aOutEdit' data-index='"+item.inId+"."+item.outId+"."+item.id+"' data-bs-toggle='modal' data-bs-target='#timesheetTimeOutEdit'>"+ item.out +"</a>";
                                }else{
                                    tdTimeOut = item.out;
                                }
                                
                                var $html = $(" \
                                    <tr>\
                                        <td class='text-nowrap' style='"+style+"'>"+ item.empNo + "</td>\
                                        <td style='"+style+"'><small>"+ item.lastname + "</small></td>\
                                        <td style='"+style+"'>"+ item.date + " "+ item.day +"</td>\
                                        <td style='"+style+"'><a href='#' name='aInEdit' data-index='"+item.inId+"."+item.id+"' data-bs-toggle='modal' data-bs-target='#timesheetTimeInEdit'>"+ item.in +"</a></td>\
                                        <td style='"+style+"'>"+tdTimeOut+"</td>\
                                        <td style='"+style+"'>"+ item.late +"</td>\
                                        <td style='"+style+"'>"+ item.overtime +"</td>\
                                        <td style='"+style+"'>"+ item.undertime +"</td>\
                                        <td style='"+style+"'>"+ item.work +"</td>\
                                        <td style='"+style+"'>"+ item.approveOTStatus +"</td>\
                                        <td style='"+style+"'><small>"+ timeInLocation + " / " + timeOutLocation +"</small></td>\
                                        <td style='"+style+"'>"+action+"</td> \
                                    </tr> \
                                    ");

                                $("#table-timesheet-all tbody").append($html);
                            });
                            renderToDataTablePrint("#table-timesheet-all");
                            $("#loading-humano").hide();
                            
                            $.ajax({
                                type    : "POST",
                                url     : App.api + "/get/timesheet/dates/",
                                dataType: "json",
                                data    : {
                                    startDate: startDate,
                                    endDate  : endDate
                                },
                                success: function(data){
                                    $("#startDate").text(data.startDate);
                                    $("#endDate").text(data.endDate);
                                    localStorage.setItem("startDate", data.startDate);
                                    localStorage.setItem("endDate", data.endDate);
                                    printTimesheetResult(startDate, endDate, costcenter);
                                }
                            });
                            
                        });
                        
                    }
                    getTimesheetResult();
                    
                    deleteDatas();
                    function deleteDatas(){
                        $("#table-timesheet-all tbody").off("click", "td button[name=aDelete]").on("click", "td button[name=aDelete]", function(e) {
                            e.preventDefault();

                            var data      = $(this).attr("data-index");
                            var dataIndex = data.split(".");
                            
                            var uid1      = dataIndex[0];
                            var uid2      = dataIndex[1];

                            $(document).off("submit", "#deletetime").on("submit", "#deletetime", function(e){
                                e.preventDefault();
                                $.ajax({
                                    type: "POST",
                                    url : App.api + "/delete/time/data/" + uid1 + "." + uid2,
                                    success: function(){
                                        alert("Successfully Removed!");
                                        $("#timeDelete").modal("toggle");
                                        getTimesheetResult();
                                    }
                                });
                            });
                        });
                    }
                    
                    function printTimesheetResult(startDate, endDate, employee){
                        $("#startDates").empty();
                        $("#endDates").empty();
                        $("#employees").empty();

                        var name  = localStorage.getItem("name");
                        var start = localStorage.getItem("startDate");
                        var ends  = localStorage.getItem("endDate");
                        
                        $('#employee-print-timesheet-table').dataTable().fnClearTable();

                        $.getJSON(App.api + "/time/data/cost/center/"+ startDate + "." + endDate + "." + employee, function(data) {
                            var number = 0;
                            $("#employee-print-timesheet-table").dataTable().fnDestroy();
                            $("#hiddenHTML").append($.Mustache.render("printTimesheet"));
                            $("#startDates").text(start);
                            $("#endDates").text(ends);
                            $.each(data, function(i, item){
                                number++;
                                var style;
                                var loc    = item.location;
                                var datas  = loc.split("=");
                                var timeInLocation  = datas[0];
                                var timeOutLocation = datas[1];
                                switch(item.prompt){
                                    case 0:
                                        style  = "background-color: #fcf8e3";
                                        break;
                                    case 1:
                                        style  = "color:black";
                                        break;
                                    case 2:
                                        style  = "background-color: #dff0d8";
                                        break;
                                    case 3:
                                        style  = "background-color: #f2dede";
                                        break;
                                    case 4:
                                        style  = "background-color: #d9edf7";
                                        break;
                                    case 5:
                                        style = "background-color: #B2B2B2";
                                        break;
                                    case 6:
                                        style = "background-color: #ffe6da";
                                        break;
                                    case 7:
                                        style = "background-color: #e4e0ff";
                                }

                                var $html = $(" \
                                    <tr> \
                                        <td align='center' style='"+style+"'>"+ number + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.empNo + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.lastname + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.date + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.day + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.in +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.out +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.late +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.overtime +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.undertime +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.work +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.approveOTStatus +"</td> \
                                        <td align='center' style='"+style+"'>"+ timeInLocation + " / " + timeOutLocation +"</td> \
                                    </tr> \
                                    ");
                                $("#employee-print-timesheet-table tbody").append($html);
                            });
                            $.getJSON(App.api + "/count/time/data/" + startDate + "." + endDate + "." + employee, function(data){
                                $("#employee-print-timesheet-table").dataTable({
                                    "bSort"        : false,
                                    "pageLength"   : data.count,
                                    "bLengthChange": false,
                                    "dom"          : '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
                                    "paging"       : true
                                });
                            });
                            $("#employees").text(name);
                            $("input[name=title]").val("Timesheet Report");
                            $("input[name=html]").val($("#hiddenHTML").html());
                        });
                    }

                    function markAsAbsent(){
                        $("#table-timesheet-all tbody").off("click", "td button[name=aAbsent]").on("click", "td button[name=aAbsent]", function(e) {
                            e.preventDefault();

                            var data      = $(this).attr("data-index");
                            var dataIndex = data.split(".");
                            
                            var date      = dataIndex[0];
                            var emp       = dataIndex[1];
                            var reason    = "--marked as absent--";
                            var reqStatus = "Approved";
                            var type      = "AB";

                            $.ajax({
                                type: "POST",
                                url : App.api + "/absent/requests/new/" + App.token,
                                data: {
                                    employee     : emp,
                                    type         : type,
                                    reason       : reason,
                                    startDate    : date,
                                    requestStatus: reqStatus
                                },
                                success: function(){
                                    alert("You have successfully marked this user as absent. You can view his/her record history in Leave/Absent Tab.");
                                    getTimesheetResult();
                                    // getAcceptedCount();
                                }
                            });
                        });
                    }
                    markAsAbsent();

                    setTimes();
                    function setTimes(){
                        $("#table-timesheet-all tbody").off("click", "button[name=setTime]").on("click", "button[name=setTime]", function(e) {
                            e.preventDefault();

                            var empp = $(this).attr("data-index");
                            console.log(empp);

                            $(document).off("submit", "#setTimeInOutForm").on("submit", "#setTimeInOutForm", function(e){
                                e.preventDefault();

                                var timeIn   = $("input[name=timeInDate]").val() +" "+ $("input[name=timeInss]").val();
                                var timeOut  = $("input[name=timeOutDate]").val() +" "+ $("input[name=timeOutss]").val();
                                var timeDate = $("input[name=timeDatess]").val();

                                console.log(timeIn + " " + timeOut +" "+ timeDate);
                                if(!timeIn || !timeOut || !timeDate){
                                    alert("Please Fill All The Fields!");
                                }else{
                                   $.ajax({
                                        type: "POST",
                                        url: App.api + "/set/time/" + empp,
                                        dataType: "json",
                                        data: {
                                            timeIn : timeIn,
                                            timeOut : timeOut,
                                            timeDate : timeDate
                                        },
                                        success: function(data){
                                            if(data.prompt == 0){
                                                alert("Success!");
                                                $("#setTimeInOut").modal("toggle");
                                                $("input[name=timeInss]").val("");
                                                $("input[name=timeOutss]").val("");
                                                $("input[name=timeDatess]").val("");
                                                $("input[name=timeInDate]").val("");
                                                $("input[name=timeOutDate]").val("");
                                                getTimesheetResult();
                                            }else if(data.prompt === 3){
                                                alert("Dates are not equal!");
                                            }else if(data.prompt === 2){
                                                alert("You can only set in One(1) date!");
                                            }
                                        }
                                   }); 
                                }
                            });
                        });
                    }

                    editTimeIn();
                    function editTimeIn(){
                        $("#table-timesheet-all tbody").off("click", "td a[name=aInEdit]").on("click", "td a[name=aInEdit]", function(e) {
                            e.preventDefault();

                            var data      = $(this).attr("data-index");
                            var dataIndex = data.split(".");

                            var uid1   = dataIndex[0];
                            var empUid = dataIndex[1];
                            // initDateTimePicker()
                            // Setting shift into localstorage
                            initSelect2("select[name='shiftss']");
                            initBootstrapSwitch("input[name='statuss']");
                            $.getJSON(App.api + "/get/time/rule/" + uid1, function(data){ 
                                localStorage.setItem("shiftUid", data.shiftUid);
                                $("#shiftss").val(data.shiftUid).trigger('change');
                            });
                            initDateTimePicker('inpTimes');
                            // Getting Time In Data
                            $.getJSON(App.api + "/get/timein/data/" + uid1, function(data){
                                if(data.timeIn == ''|| data.shift == '')
                                {
                                    $("#editTimeInForm")[0].reset();
                                }
                                else
                                {
                                    console.log(data);
                                    DateTimePickerSetValue('inpTimes',data.timeIn);
                                    // $("input[name=inpTimes]").val(data.timeIn);
                                    if (data.status == 1) {
                                        $("input[name='statuss']").bootstrapSwitch("state", true);
                                    } else {
                                        $("input[name='statuss']").bootstrapSwitch("state", false);
                                    }
                                }
                            });

                            $(document).off("submit", "#editTimeInForm").on("submit", "#editTimeInForm", function(e){
                                e.preventDefault();

                                var timeIn = $("input[name=inpTimes]").val();
                                var shift = $("select[name=shiftss]").val();
                                status = 0;
                                if ($("input[name='statuss']").is(":checked")) {
                                    status = 1;
                                }
                                if(!timeIn){
                                    alert("Please Fill All The Fields!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/edit/time/in/data/" + uid1,
                                        data: {
                                            timeIn: timeIn,
                                            shift :shift,
                                            status: status,
                                            empUid: empUid
                                        },
                                        success: function(){
                                            alert("Successfully Updated!");
                                            $("input[name=inpTimes]").val("");
                                            $("select[name=shiftss]").val("");
                                            $("input[name='statuss']").prop("checked", true);
                                            // window.location.hash = "#/timesheet/all/";
                                            // clearForm("#editTimeForm");
                                            // $("#editTimeForm").trigger("reset");
                                            $("#timesheetTimeInEdit").modal("toggle");
                                            status = 1;
                                            getTimesheetResult();
                                            // location.reload();
                                        }
                                    });
                                    localStorage.removeItem("ruleUid");

                                }//end of checking
                            });
                        });
                    }

                    editTimeOut();
                    function editTimeOut(){
                        $("#table-timesheet-all tbody").off("click", "td a[name=aOutEdit]").on("click", "td a[name=aOutEdit]", function(e) {
                            e.preventDefault();

                            var data = $(this).attr("data-index");
                            var dataIndex = data.split(".");

                            var uid1 = dataIndex[0];
                            var uid2 = dataIndex[1];
                            var empUid = dataIndex[2];

                            $("input[name=outpTimes]").datetimepicker({
                                format: "YYYY-MM-DD hh:mm A"

                            });

                            // Setting shift into localstorage
                            $.getJSON(App.api + "/get/time/rule/" + uid2, function(data){ 
                                localStorage.setItem("shiftUid", data.shiftUid);
                            });

                            // Getting Rule Details
                            $("#outShiftss").find("option").remove().end();
                            $.getJSON(App.api + "/get/shifts/", function(data) {
                                var shiftUid = localStorage.getItem("shiftUid");

                                if(shiftUid === "null"){
                                    $("#outShiftss").append("<option value='' selected></option>");
                                }
                                $.each(data, function(i, item){
                                    if(shiftUid != item.shiftUid){
                                        $("#outShiftss").append("<option value=" + item.shiftUid + " >"+ item.shiftName +"</option>");
                                    }else{
                                        $("#outShiftss").append("<option value=" + item.shiftUid + " selected>"+ item.shiftName +"</option>");
                                    }
                                });

                            });

                            // Getting Time Out Data
                            $.getJSON(App.api + "/get/timein/data/" + uid1, function(data){
                                $("input[name=inpTimes]").val(data.timeIn);
                                if (data.status == 1) {
                                    $("input[name='outstatuss']").prop("checked", true);
                                } else {
                                    $("input[name='outstatuss']").prop("checked", false);
                                }

                                $("input[name='outstatuss']").bootstrapSwitch({
                                    onText: "Enable",
                                    offText: "Disable"
                                });
                            });

                            $(document).off("submit", "#editTimeOutForm").on("submit", "#editTimeOutForm", function(e){
                                e.preventDefault();

                                var timeOut = $("input[name=outpTimes]").val();
                                var shift = $("select[name=outShiftss]").val();
                                status = 0;
                                if ($("input[name='outstatuss']").is(":checked")) {
                                    status = 1;
                                }
                                if(!timeOut){
                                    alert("Please Fill All The Fields!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/edit/time/out/data/" + uid1 + "." + uid2,
                                        data: {
                                            timeOut: timeOut,
                                            shift:shift,
                                            status: status,
                                            empUid: empUid
                                        },
                                        success: function(){
                                            alert("Successfully Updated!");
                                            $("input[name=outpTimes]").val("");
                                            $("select[name=outShiftss]").val("");
                                            $("input[name='outstatuss']").prop("checked", true);
                                            // window.location.hash = "#/timesheet/all/";
                                            // clearForm("#editTimeForm");
                                            // $("#editTimeForm").trigger("reset");
                                            $("#timesheetTimeOutEdit").modal("toggle");
                                            status = 1;
                                            getTimesheetResult();
                                            // location.reload();
                                        }
                                    });
                                    localStorage.removeItem("shiftUid");

                                }//end of checking
                            });
                        });
                    }

                    function edit(){
                        $("#table-timesheet-all tbody").off("click", "td button[name=aEdit]").on("click", "td button[name=aEdit]", function(e) {
                            e.preventDefault();

                            var data = $(this).attr("data-index");
                            var dataIndex = data.split(".");

                            var uid1 = dataIndex[0];
                            var uid2 = dataIndex[1];

                            var fieldID = ["inpTime","outpTime"] 
                            $.each(fieldID,function(i,item){
                                initDateTimePicker(item);
                            });
                            initBootstrapSwitch("input[name='status']");
                            initSelect2("select[name=shifts]");
                            
                            if(uid1 == ''|| uid2 == '')
                            {
                                $("#editTimeForm")[0].reset();
                            }
                            else
                            {
                                // Setting Rule in localstorage
                                $.getJSON(App.api + "/get/time/rule/" + uid1, function(data){ 
                                    localStorage.setItem("shiftUid", data.shiftUid);
                                    // Getting Time in Details
                                    $.getJSON(App.api + "/get/timein/data/" + uid1, function(data){
                                        console.log(data);
                                        $("input[name=inpTime]").val(data.timeIn);
                                        if (data.status == 1) {
                                            $("input[name='status']").bootstrapSwitch("state", true);
                                        } else {
                                            $("input[name='status']").bootstrapSwitch("state", false);
                                        }
                                    });

                                    // Getting Time out Details
                                    $.getJSON(App.api + "/get/timeout/data/" + uid2, function(data){
                                        console.log(data);
                                        $("input[name=outpTime]").val(data.timeOut);
                                    });

                                    //Setting value for shift
                                    $("select[name='shifts']").val(data.shiftUid).trigger('change');
                                });
                            }
                            
                            $(document).off("submit", "#editTimeForm").on("submit", "#editTimeForm", function(e){
                                e.preventDefault();

                                var timeIn = $("input[name=inpTime]").val();
                                var timeOut = $("input[name=outpTime]").val();
                                var shift = $("select[name=shift]").val();
                                var status = 0;
                                if ($("input[name='status']").is(":checked")) {
                                    status = 1;
                                }

                                // console.log(rule);
                                if(!timeIn || !timeOut){
                                    alert("Please Fill All The Fields!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/edit/time/data/" + uid1 + "." + uid2,
                                        data: {
                                            timeIn: timeIn,
                                            timeOut: timeOut,
                                            shift:shift,
                                            status: status
                                        },
                                        success: function(){
                                            alert("Successfully Updated!");
                                            // window.location.hash = "#/timesheet/all/";
                                            // clearForm("#editTimeForm");
                                            $("input[name=inpTime]").val("");
                                            $("input[name=outpTime]").val("");
                                            $("input[name=status]").val("");
                                            $("#timesheetEdit").modal("hide");
                                            getTimesheetResult();
                                            // location.reload();
                                        }
                                    });
                                    localStorage.removeItem("ruleUid");
                                }//end of checking
                            });
                        });
                    }
                    edit();
                }
            });

        });

        Path.map('#/timesheet/employee/').to(function(){
            var employees = getJSONDoc(App.api + "/get/employee/name/" + App.token);
            var employeeList = [];
            $.each(employees,function(i,item){
                var employee = {
                    uid:item.uid,
                    firstname:item.firstname,
                    lastname:item.lastname,
                    middlename:item.middlename,
                    empNo:item.employee_number
                };
                employeeList.push(employee);
            });

            var shiftOptions = getJSONDoc(App.api + "/get/shifts/");
            var shiftOptionsList = [];
            $.each(shiftOptions,function(i,item){
                shift = {
                    shiftUid:item.shiftUid,
                    shiftEnd:item.shiftEnd,
                    shiftStart:item.shiftStart,
                    shiftName:item.shiftName,
                    gracePeriod:item.gracePeriod
                }
                shiftOptionsList.push(shift);
            })

            var templateData = {
                employees:employeeList,
                shiftOptionsList:shiftOptionsList
            }
            console.log(templateData);

            App.canvas.html("").append($.Mustache.render("krono-timesheet-employee",templateData));
            var tableID ='#table-timesheet-employee';
            renderToDataTablePrint(tableID);   
            App.navPillTimesheet();
            initSelect2("select[name=employeeName]");

            $(document).off("submit", "#timesheetform").on("submit", "#timesheetform", function(e){
                e.preventDefault();
                var number           = 0;
                var numbers          = 0;
                $("#print").attr("Disabled", false);
                // var printLocationUrl = App.api + printLocation + App.token;
                // $("#printReportForm").attr("action", printLocationUrl);
                // var employee      = $("#tdTimesheetEmployee").val();
                var startDate        = $("input[name=tdTimesheetStartDate]").val();
                var endDate          = $("input[name=tdTimesheetEndDate]").val();
                var employee         = $("select[name=employeeName]").val();
    
                if(startDate || endDate || employee){
                    function getTimesheetResult(){
                        $("#loading-humano").show();
                        $('#table-timesheet-employee').DataTable().clear().destroy();
                        $.getJSON(App.api + "/timesheet/all/view/attendance/"+ startDate + "." + endDate + "." + employee, function(data) {
                            $.each(data, function(i, item){
                                numbers++;
                                var style;
                                var action = "<small><button name='aEdit' class='button btn edit-btn' data-index='"+ item.inId + "." + item.outId +"' data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa fa-pencil-square-o'></i></button><button name='aDelete' class='button btn edit-btn' data-index='"+ item.inId +"."+ item.outId +"' data-bs-toggle='modal' data-bs-target='#timeDelete' title='Remove'><i class='fa fa-times'></i></button></td></small>";
                                var loc    = item.location;
                                var datas  = loc.split("=");
                                var timeInLocation  = datas[0];
                                var timeOutLocation = datas[1];

                                switch(item.prompt){
                                    case 0:
                                        style  = "background-color: #fcf8e3";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='setTime' class='set-btn btn btn-sm btn-outline-primary' data-index='"+ item.id +"' data-bs-toggle='modal' data-bs-target='#setTimeInOut' title='Set'><i class='fa-regular fa-calendar'></i></button>"+
                                                        "<button name='aAbsent' class='btn btn-sm btn-outline-dark' data-index='"+ item.date +"."+ item.id +"' title='Absent'><i class='fa-solid fa-minus'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 1:
                                        style  = "color:black";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"' data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                        "<button name='aDelete' class='btn btn-sm btn-outline-danger' data-index='"+ item.inId +"."+ item.outId +"'data-bs-toggle='modal' data-bs-target='#timeDelete' title='Remove'><i class='fa-solid fa-trash-can'></i></button>"+
                                                    "</div></td>"+
                                                "</small>";
                                        break;
                                    case 2:
                                        style  = "background-color: #dff0d8";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='setTime' class='set-btn btn btn-sm btn-outline-primary' data-index='"+ item.id +"' data-bs-toggle='modal' data-bs-target='#setTimeInOut' title='Set'><i class='fa-regular fa-calendar'></i></button>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 3:
                                        style  = "background-color: #f2dede";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='setTime' class='set-btn btn btn-sm btn-outline-primary' data-index='"+ item.id +"' data-bs-toggle='modal' data-bs-target='#setTimeInOut' title='Set'><i class='fa-regular fa-calendar'></i></button>"+
                                                        "<button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.inId +"."+ item.outId +"' data-bs-toggle='modal' data-bs-target='#timeDelete'><i class='fa-solid fa-xmark' title='Remove'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 4:
                                        style  = "background-color: #d9edf7";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 5:
                                        style = "background-color: #B2B2B2";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-primary' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 6:
                                        style = "background-color: #ffe6da";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-primary' data-index='"+ item.inId + "." + item.outId +"'data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                        break;
                                    case 7:
                                        style = "background-color: #e4e0ff";
                                        action = "<small>"+
                                                    "<div class='btn-group'>"+
                                                        "<button name='aaEdit' class='btn btn-sm btn-outline-success' data-index='"+ item.inId + "." + item.outId +"' data-bs-toggle='modal' data-bs-target='#timesheetEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                        "<button name='aDelete' class='btn btn-sm btn-outline-danger' data-index='"+ item.inId +"."+ item.outId +"' data-bs-toggle='modal' data-bs-target='#timeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+
                                                    "</div>"+
                                                "</small>";
                                }

                                var tdTimeOut = "";
                                if(item.out == "No Time Out!" || item.out == "NO TIME OUT"){
                                    tdTimeOut = "<a href='#' name='aOutEdit' data-index='"+item.inId+"."+item.outId+"."+item.id+"' data-bs-toggle='modal' data-bs-target='#timesheetTimeOutEdit'>"+ item.out +"</a>";
                                }else{
                                    tdTimeOut = item.out;
                                }
                                
                                var $html = $(" \
                                    <tr>\
                                        <td style='"+style+"'>"+ item.empNo + "</td>\
                                        <td style='"+style+"'><small>"+ item.lastname + "</small></td>\
                                        <td style='"+style+"'>"+ item.date + " "+ item.day +"</td>\
                                        <td style='"+style+"'><a href='#' name='aInEdit' class='aInEdit' data-index='"+item.inId+"."+item.id+"' data-bs-toggle='modal' data-bs-target='#timesheetTimeInEdit'>"+ item.in +"</a></td>\
                                        <td style='"+style+"'>"+tdTimeOut+"</td>\
                                        <td style='"+style+"'>"+ item.late +"</td>\
                                        <td style='"+style+"'>"+ item.overtime +"</td>\
                                        <td style='"+style+"'>"+ item.undertime +"</td>\
                                        <td style='"+style+"'>"+ item.work +"</td>\
                                        <td style='"+style+"'>"+ item.approveOTStatus +"</td>\
                                        <td style='"+style+"'><small>"+ timeInLocation + " / " + timeOutLocation +"</small></td>\
                                        <td style='"+style+"'>"+action+"</td> \
                                    </tr> \
                                    ");

                                $("#table-timesheet-employee tbody").append($html);    
                            });
                            renderToDataTablePrint(tableID);
                            $("#loading-humano").hide();

                            $.ajax({
                                type: "POST",
                                url: App.api + "/get/details/",
                                dataType: "json",
                                data: {
                                    startDate: startDate,
                                    endDate  : endDate,
                                    employee : employee
                                },
                                success: function(data){
                                    $("input[name=tdTimesheetStartDate]").text(data.startDate);
                                    $("input[name=tdTimesheetEndDate]").text(data.endDate);
                                    $("select[name=employeeName][value="+data.uid+"]").val(data.uid);
                                    localStorage.setItem("startDate", data.startDate);
                                    localStorage.setItem("endDate", data.endDate);
                                    localStorage.setItem("name", data.name);
                                    $("#fromDate").text(data.startDate);
                                    $("#toDate").text(data.endDate);
                                    $("#empName").text(data.name);
                                    printTimesheetResult(startDate, endDate, employee);
                                }
                            });
                        });
                    }
                    getTimesheetResult();

                    function printTimesheetResult(startDate, endDate, employee){
                        $("input[name=tdTimesheetStartDate]").empty();
                        $("#endDates").empty();
                        $("#employees").empty();
                        // console.log(name + " ~~~" + start + "~~~" + ends);
                        
                        $('#employee-print-timesheet-table').dataTable().fnClearTable();

                        $.getJSON(App.api + "/timesheet/all/view/attendance/"+ startDate + "." + endDate + "." + employee, function(data) {
                            var number = 0;
                            $("#employee-print-timesheet-table").dataTable().fnDestroy();
                            $("#hiddenHTML").append($.Mustache.render("printTimesheet"));
                            $("#startDates").text(startDate);
                            $("#endDates").text(endDate);
                            $.each(data, function(i, item){
                                number++;
                                var loc             = item.location;
                                var datas           = loc.split("=");
                                var timeInLocation  = datas[0];
                                var timeOutLocation = datas[1];

                                switch(item.prompt){
                                    case 0:
                                        style  = "background-color: #fcf8e3";
                                        break;
                                    case 1:
                                        style  = "color:black";
                                        break;
                                    case 2:
                                        style  = "background-color: #dff0d8";
                                        break;
                                    case 3:
                                        style  = "background-color: #f2dede";
                                        break;
                                    case 4:
                                        style  = "background-color: #d9edf7";
                                        break;
                                    case 5:
                                        style = "background-color: #B2B2B2";
                                        break;
                                    case 6:
                                        style = "background-color: #ffe6da";
                                        break;
                                    case 7:
                                        style = "background-color: #e4e0ff";
                                }

                                var $html = $(" \
                                    <tr> \
                                        <td align='center' style='"+style+"'>"+ number + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.empNo + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.lastname + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.date + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.day + "</td> \
                                        <td align='center' style='"+style+"'>"+ item.in +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.out +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.late +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.overtime +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.undertime +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.work +"</td> \
                                        <td align='center' style='"+style+"'>"+ item.approveOTStatus +"</td> \
                                        <td align='center' style='"+style+"'>"+ timeInLocation + " / " + timeOutLocation +"</td> \
                                    </tr> \
                                    ");
                                $("#employee-print-timesheet-table tbody").append($html);
                            });
                            $("#employees").text(name);
                            $("input[name=title]").val("Timesheet Report");
                            $("input[name=html]").val($("#hiddenHTML").html());
                        });
                    }
                    
                    deleteDatas();
                    function deleteDatas(){
                        $("#table-timesheet-employee tbody").off("click", "td button[name=aDelete]").on("click", "td button[name=aDelete]", function(e) {
                            e.preventDefault();

                            var data = $(this).attr("data-index");
                            var dataIndex = data.split(".");

                            var uid1 = dataIndex[0];
                            var uid2 = dataIndex[1];

                            //console.log(uid1 + " / " + uid2);

                            $(document).off("submit", "#deletetime").on("submit", "#deletetime", function(e){
                                e.preventDefault();
                                $.ajax({
                                    type: "POST",
                                    url: App.api + "/delete/time/data/" + uid1 + "." + uid2,
                                    success: function(){
                                        alert("Successfully Removed!");
                                        $("#timeDelete").modal("toggle");
                                        getTimesheetResult();
                                    }
                                });
                            });
                        });
                    }

                    function markAsAbsent(){
                        $("#table-timesheet-employee tbody").off("click", "td button[name=aAbsent]").on("click", "td button[name=aAbsent]", function(e) {
                            e.preventDefault();

                            var data = $(this).attr("data-index");
                            var dataIndex = data.split(".");

                            var date = dataIndex[0];
                            var emp = dataIndex[1];
                            var reason = "--marked as absent--";
                            var reqStatus = "Approved";
                            var type = "AB";

                            $.ajax({
                                type: "POST",
                                url: App.api + "/absent/requests/new/" + App.token,
                                data: {
                                    employee: emp,
                                    type: type,
                                    reason: reason,
                                    startDate: date,
                                    requestStatus: reqStatus
                                },
                                success: function(){
                                    alert("You have successfully marked this user as absent. You can view his/her record history in Leave/Absent Tab");
                                    getTimesheetResult();
                                }
                            });
                        });
                    }
                    markAsAbsent();

                    setTimes();
                    function setTimes(){
                        $("#table-timesheet-employee tbody").off("click", "button[name=setTime]").on("click", "button[name=setTime]", function(e) {
                            e.preventDefault();

                            var empp = $(this).attr("data-index");
                            var fieldID = ["timeInss", "timeOutss"]
                            $.each(fieldID,function(i,item){
                                initDateTimePicker(item)
                            });

                            $("input[name=timeInss]").blur(function(e){
                                var timeInss = $(this).val();
                                if(timeInss.length == 0){
                                    $("#error-message-timeInss").text("Please fill this up.");
                                }else{
                                    $("#error-message-timeInss").empty();
                                }
                            });

                            $("input[name=timeOutss]").blur(function(e){
                                var timeOutss = $(this).val();
                                if(timeOutss.length == 0){
                                    $("#error-message-timeOutss").text("Please fill this up.");
                                }else{
                                    $("#error-message-timeOutss").empty();
                                }
                            });

                            $("input[name=timeDatess]").blur(function(e){
                                var timeDatess = $(this).val();
                                if(timeDatess.length == 0){
                                    $("#error-message-timeDatess").text("Please fill this up.");
                                }else{
                                    $("#error-message-timeDatess").empty();
                                }
                            });

                            $(document).off("submit", "#setTimeInOutForm").on("submit", "#setTimeInOutForm", function(e){
                                e.preventDefault();

                                var timeIn   = $("input[name=timeInDate]").val() +" "+ $("input[name=timeInss]").val();
                                var timeOut  = $("input[name=timeOutDate]").val() +" "+ $("input[name=timeOutss]").val();
                                var timeDate = $("input[name=timeDatess]").val();

                                if(!timeIn || !timeOut || !timeDate){
                                    alert("Please Fill All The Fields!");
                                }else{
                                   $.ajax({
                                        type: "POST",
                                        url: App.api + "/set/time/" + empp,
                                        dataType: "json",
                                        data: {
                                            timeIn : timeIn,
                                            timeOut : timeOut,
                                            timeDate : timeDate
                                        },
                                        success: function(data){
                                            if(data.prompt == 0){
                                                alert("Successfully Set!");
                                                $("#setTimeInOut").modal("toggle");
                                                $("input[name=timeInss]").val("");
                                                $("input[name=timeOutss]").val("");
                                                $("input[name=timeDatess]").val("");
                                                getTimesheetResult();
                                            }else if(data.prompt === 3){
                                                alert("Dates are not equal!");
                                            }else if(data.prompt === 2){
                                                alert("You can only set in One(1) date!");
                                            }
                                        }
                                   }); 
                                }
                            });
                        });
                    }

                    editIn();
                    function editIn(){
                        $("#table-timesheet-employee tbody").off("click", ".aInEdit").on("click", ".aInEdit", function(e) {
                            e.preventDefault();

                            var data      = $(this).attr("data-index");
                            var dataIndex = data.split(".");
                            var uid1      = dataIndex[0];
                            var empUid    = dataIndex[1];
                            console.log(data);

                            //setting rule to localstorage
                            $.getJSON(App.api + "/get/time/rule/" + uid1, function(data){ 
                                console.log(data);
                                localStorage.setItem("shiftUid", data.shiftUid);
                                $("select[name=shiftss]").val(data.shiftUid);
                            });
                            initDateTimePicker('timeIN');
                            initBootstrapSwitch("input[name='statuss']");
                            if(uid1 == 0)
                            {
                                $("#editTimeInForm")[0].reset();
                            }
                            else{
                                 //getting time in data
                                $.getJSON(App.api + "/get/timein/data/" + uid1, function(data){
                                    console.log(data);
                                    DateTimePickerSetValue('timeIN',data.timeIn)
                                    $("input[name=timeInDate]").val(data.timeIn);
                                    $("select[name=shift]").val(data.shift);
                                    console.log(data.status)
                                    if (data.status == 1){
                                        $("input[name='statuss']").bootstrapSwitch("state",true);
                                    } else {
                                        $("input[name='statuss']").bootstrapSwitch("state",false);
                                    }
                                });
                            }

                            $(document).off("submit", "#editTimeInForm").on("submit", "#editTimeInForm", function(e){
                                e.preventDefault();

                                var timeIn = $("input[name=inpTimes]").val();
                                var shift = $("select[name=shift]").val();
                                status = 0;
                                if ($("input[name='statuss']").is(":checked")) {
                                    status = 1;
                                }
                                if(!timeIn){
                                    alert("Please Fill All The Fields!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/edit/time/in/data/" + uid1,
                                        data: {
                                            timeIn: timeIn,
                                            shift:shift,
                                            status: status,
                                            empUid: empUid
                                        },
                                        success: function(){
                                            alert("Successfully Updated!");
                                            $("input[name=inpTimes]").val("");
                                            $("select[name=shiftss]").val("");
                                            $("input[name='statuss']").prop("checked", true);
                                            getTimesheetResult();
                                            $("#timesheetTimeInEdit").modal("toggle");
                                            status = 1;
                                        }
                                    });
                                    localStorage.removeItem("ruleUid");
                                }//end of checking
                            });
                        });
                    }

                    editOut();
                    function editOut(){
                        $("#table-timesheet-employee tbody").off("click", "td a[name=aOutEdit]").on("click", "td a[name=aOutEdit]", function(e) {
                            e.preventDefault();

                            var data      = $(this).attr("data-index");
                            var dataIndex = data.split(".");
                            
                            var uid1      = dataIndex[0];
                            var uid2      = dataIndex[1];
                            var empUid    = dataIndex[2];

                            $("input[name=outpTimes]").datetimepicker({
                                format: "YYYY-MM-DD hh:mm A"
                            });

                            //setting rule to localstorage
                            $.getJSON(App.api + "/get/time/rule/" + uid2, function(data){ 
                                localStorage.setItem("shiftUid", data.shiftUid);
                            });

                            //getting details of rules
                            $("#outShiftss").find("option").remove().end();

                            $.getJSON(App.api + "/get/shifts/", function(data) {
                                var shiftUid = localStorage.getItem("shiftUid");

                                if(shiftUid === "null"){
                                    $("#outShiftss").append("<option value='' selected></option>");
                                }
                                $.each(data, function(i, item){
                                    if(shiftUid != item.shiftUid){
                                        $("#outShiftss").append("<option value=" + item.shiftUid + " >"+ item.shiftName +"</option>");
                                    }else{
                                        $("#outShiftss").append("<option value=" + item.shiftUid + " selected>"+ item.shiftName +"</option>");
                                    }
                                });

                            });
                            //getting timeout data
                            $.getJSON(App.api + "/get/timein/data/" + uid1, function(data){
                                $("input[name=inpTimes]").val(data.timeIn);
                                if (data.status == 1) {
                                    $("input[name='outstatuss']").prop("checked", true);
                                } else {
                                    $("input[name='outstatuss']").prop("checked", false);
                                }

                                $("input[name='outstatuss']").bootstrapSwitch({
                                    onText: "Enable",
                                    offText: "Disable"
                                });
                            });

                            $(document).off("submit", "#editTimeOutForm").on("submit", "#editTimeOutForm", function(e){
                                e.preventDefault();

                                var timeOut = $("input[name=outpTimes]").val();
                                var shift = $("select[name=outShiftss]").val();
                                status = 0;
                                if ($("input[name='outstatuss']").is(":checked")) {
                                    status = 1;
                                }
                                if(!timeOut){
                                    alert("Please Fill All The Fields!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/edit/time/out/data/" + uid1 + "." + uid2,
                                        data: {
                                            timeOut: timeOut,
                                            shift:shift,
                                            status: status,
                                            empUid: empUid
                                        },
                                        success: function(){
                                            alert("Successfully Updated!");
                                            $("input[name=outpTimes]").val("");
                                            $("select[name=outShiftss]").val("");
                                            $("input[name='outstatuss']").prop("checked", true);
                                            getTimesheetResult();
                                            $("#timesheetTimeOutEdit").modal("toggle");
                                            status = 1;
                                        }
                                    });
                                    localStorage.removeItem("shiftUid");
                                }//end of checking
                            });
                        });
                    }

                    function edit(){
                        $("#table-timesheet-employee tbody").off("click", "td button[name=aaEdit]").on("click", "td button[name=aaEdit]", function(e) {
                            e.preventDefault();

                            var data = $(this).attr("data-index");
                            var dataIndex = data.split(".");

                            var uid1 = dataIndex[0];
                            var uid2 = dataIndex[1];
                            var fieldID = ['inpTime','outpTime'];

                            $.each(fieldID,function(i,item){
                                initDateTimePicker(item)
                            });

                            initBootstrapSwitch("input[name='status']");

                            if(uid1==''||uid2==''||uid1==0||uid2==0)
                            {
                                $("#editTimeForm")[0].reset();
                                // initBootstrapSwitch("input[name='status']");
                                $("input[name='status']").bootstrapSwitch('state', true);
                            }
                            else
                            {
                                //setting rule to localstorage
                                $.getJSON(App.api + "/get/time/rule/" + uid1, function(data){
                                    console.log(data); 
                                    localStorage.setItem("shiftUid", data.shiftUid);
                                    $("select[name=shift]").val(data.shiftUid);
                                });
                                
                                //getting time in data
                                $.getJSON(App.api + "/get/timein/data/" + uid1, function(data){
                                    console.log(data);
                                    // $("input[name=inpTime]").val(data.timeIn);
                                    DateTimePickerSetValue(fieldID[0],data.timeIn)
                                    if (data.status == 1) {
                                        $("input[name='status']").bootstrapSwitch("state", true);
                                    } else {
                                        $("input[name='status']").bootstrapSwitch("state", false);
                                    }
                                    // initBootstrapSwitch("input[name='status']");
                                });

                                //getting time out data
                                $.getJSON(App.api + "/get/timeout/data/" + uid2, function(data){
                                    console.log(data);
                                    $("input[name=outpTime]").val(data.timeOut);
                                    DateTimePickerSetValue(fieldID[1],data.timeOut);
                                });
                            }
                            
                            $(document).off("submit", "#editTimeForm").on("submit", "#editTimeForm", function(e){
                                e.preventDefault();

                                var timeIn = $("input[name=inpTime]").val();
                                var timeOut = $("input[name=outpTime]").val();
                                var shift = $("select[name=shift]").val();
                                var status = 0;
                                if ($("input[name='status']").is(":checked")) {
                                    status = 1;
                                }
                                if(!timeIn || !timeOut){
                                    alert("Please Fill All The Fields!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/edit/time/data/" + uid1 + "." + uid2,
                                        data: {
                                            timeIn: timeIn,
                                            timeOut: timeOut,
                                            shift:shift,
                                            status: status
                                        },
                                        success: function(){
                                            alert("Successfully Updated!");
                                            $("input[name=inpTime]").val("");
                                            $("input[name=outpTime]").val("");
                                            $("input[name=status]").val("");
                                            $("#timesheetEdit").modal("toggle");
                                            getTimesheetResult();
                                        }
                                    });
                                    localStorage.removeItem("ruleUid");
                                }//end of checking
                            });
                        });
                    }
                    edit();
                }
            });

        });

        Path.map('#/leave-absent/').to(function(){
            var employees = getJSONDoc(App.api + "/get/employee/name/" + App.token);
            var employeeList = [];
            $.each(employees,function(i,item){
                var employee = {
                    uid:item.uid,
                    firstname:item.firstname,
                    lastname:item.lastname,
                    middlename:item.middlename,
                    empNo:item.employee_number
                };
                employeeList.push(employee);
            });

            var leaveTypes = getJSONDoc(App.api + "/get/leave/types/" + App.token);
            var leaveTypeList = [];
            $.each(leaveTypes, function(i,item){
                var leaveType = {
                    leaveUid:item.uid,
                    leaveName:item.name
                };
                leaveTypeList.push(leaveType);
            });

            var leaveCounts = getJSONDoc(App.api + "/get/leave/notification/count/");

            var templateData = {
                employees:employeeList,
                leaveCounts:leaveCounts,
                leaveType:leaveTypeList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-leave-absent",templateData));
            renderToDataTablePrint("#table-leave-absent");
            // initSelect2("select[name=employeeName]");
            initSelect2Modal("select[name=employeeName]", "#modal-request-leave")

            function getPendingRequests(uid){
                $.getJSON(App.api + "/employee/pending/leave/notification/" + uid, function(data){
                    // $("#forPending").html("<p style='color:red'>"+data.count+"</p>");
                    $("#forPendingLeave").text(data.count);
                });
            }

            function addNew(){
                $(document).off("submit", "#applyLeaveForm").on("submit", "#applyLeaveForm", function(e){
                    e.preventDefault();
                    var uid           = $("select[name=employeeName]").val();
                    var leaveType     = $("select[name=employeeLeaveType]").val();
                    var leaveBalance  = $("input[name=employeeApplyLeaveBalance]").val();
                    var startDate     = $("input[name=employeeApplyLeaveFrom]").val();
                    var endDate       = $("input[name=employeeApplyLeaveTo]").val();
                    var reason        = $("textarea[name=employeeApplyLeaveReason]").val();
                    var requestStatus = "Pending";
					var userType 	  = App.userType;
					console.log(uid,leaveType,leaveBalance,startDate,endDate,reason,requestStatus,userType);
                    $("loading-humano").show();
                    if(endDate < startDate){
                        alert("Sorry, we could not process your request, you put in an invalid date!");
                    }else if(!startDate || !endDate || !reason || !leaveType){
                        alert("Please Fill All The Fields!");
                    }else{
                        
                        $.ajax({
                            type    : "POST",
                            url     : App.api + "/new/leave/request/" + App.token,
                            dataType: "json",
                            data    : {
                                employee     : uid,
                                leaveType    : leaveType,
                                leaveBalance : leaveBalance,
                                startDate    : startDate,
                                endDate      : endDate,
                                reason       : reason,
                                requestStatus: requestStatus,
								userType	 : userType
                            },
                            beforeSend: function(xhr){
                                $("#loading-humano").show();
                                console.log('Request is about to be sent');
                            },
                            success:function(data){
                                $("#loading-humano").hide();

                                if(data.dataError == 1){
                                    alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
                                }else if(data.dataError == 0){
                                    alert(data.prompt);
                                    $("#leaveRequest").modal("hide");
                                    $("select[name=employeeLeaveType]").val("");
                                    $("input[name=employeeApplyLeaveBalance]").val("");
                                    $("input[name=employeeApplyLeaveFrom]").val("");
                                    $("input[name=employeeApplyLeaveTo]").val("");
                                    $("textarea[name=employeeApplyLeaveReason]").val("");
                                    window.location.reload();
                                }else if(data.dataError == 3){
                                    alert("Sorry, we could not process your request, you put in an invalid date!");
                                    $("#leaveRequest").modal("hide");
                                }else if(data.dataError == 4){
                                    alert(data.prompt);
                                    $("#leaveRequest").modal("hide");
                                }else if(data.dataError == 5){
                                    alert(data.prompt);
                                    $("#leaveRequest").modal("hide");
                                }
                            }
                        });
                    }
                });
            }
            addNew();

            $(document).off("submit", "#formDate").on("submit", "#formDate", function(e){
                e.preventDefault();
                var startDate = $("input[name=startDate]").val();
                var endDate = $("input[name=endDate]").val();
                var selStatus = $("select[name=selStatus]").val();
                console.log(startDate+" "+endDate+" "+selStatus);

                // $("#print").attr("Disabled", false);
                // var printLocationUrl = App.api + printLocation + App.token;
                // $("#printReportForm").attr("action", printLocationUrl);
                $("#loading-humano").show();
                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate || !selStatus){
                    alert("Please Fill All The Fields!");
                }else{
                    function getCount(){
                        $.getJSON(App.api + "/get/notification/leave/date/" + startDate + "." + endDate, function(data){
                            console.log(data);
                            $("#forPendingLeave").text(data.pendingCount);
                            $("#forAcceptedLeave").text(data.acceptedCount);
                            $("#forCertifiedLeave").text(data.certifiedCount);
                            $("#forDeniedLeave").text(data.deniedCount);
                            localStorage.setItem("pendingCount", data.pendingCount);
                            localStorage.setItem("acceptedCount", data.pendingCount);
                            printLeaveDetails(startDate, endDate, data.pendingCount, data.acceptedCount);
                        });
                    }
                    getCount();
                    function getLeaveDetails(){
                        var number = 0;
                        $("#table-leave-absent").DataTable().clear().destroy();
                        $.getJSON(App.api + "/get/leave/request/date/" + startDate + "." + endDate + "." + selStatus, function(data){
                            console.log(data);
                            $.each(data, function(i, item) {
                                number++;
                                var style;
                                var action;

                                switch(item.requestStatus){
                                    case "Pending":
                                        style = "background-color: #fcf8e3";
                                        action = "<div class='btn-group btn-group-sm' role='group' aria-label='Basic outlined example'>"+
                                                    "<button type='button' name='aEdit' class='btn btn-outline-success' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveRequestEdit' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>"+
                                                    "<button type='button' name='aDelete' class='btn btn-outline-danger' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+
                                                "</div>";
                                        break;
                                    case "Denied":
                                        style = "background-color: #f2dede";
                                        action = "<div class='btn-group btn-group-sm' role='group' aria-label='Basic outlined example'>"+
                                                    "<button name='aEdit' class='button btn btn-outline-success' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveRequestEdit' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>"+
                                                    "<button name='aDelete' class='button btn btn-outline-danger' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+
                                                "</div>"
                                        break;
                                        
                                    case "Certified":
                                        style = "background-color: #d9edf7";
                                        action = "<button name='aEdit' class='button btn btn-sm btn-outline-success' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveRequestEdit' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                        break;

                                    default:
                                        style = "background-color: #dff0d8";
                                        action = "<div class='btn-group btn-group-sm' role='group' aria-label='Basic outlined example'>"+
                                                    "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveRequestEdit' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>"+
                                                    "<button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.leaveUid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+
                                                "</div>"
                                        break;
                                        
                                }
                                var $html = $(" \
                                    <tr> \
                                        <td style='"+style+"'>" + number + "</td> \
                                        <td style='"+style+"'>" + item.empNo + "</td> \
                                        <td style='"+style+"'>" + item.startDate + " " + item.endDate + "</td> \
                                        <td style='"+style+"'>" + item.name + "</td> \
                                        <td style='"+style+"'>" + item.leaveType + "</td> \
                                        <td style='"+style+"'>" + item.reason + "</td> \
                                        <td style='"+style+"'>" + item.requestStatus + "</td> \
                                        <td style='"+style+"'>" + item.certBy + "</td> \
                                        <td style='"+style+"'>" + item.appBy + "</td> \
                                        <td style='"+style+"'>" + item.date_created + "</td> \
                                        <td style='"+style+"'>" + item.date_modified + "</td> \
                                        <td style='"+style+"'>" + action + "</td> \
                                    </tr> \
                                    ");
                                $("#table-leave-absent tbody").append($html);
                            });
                            renderToDataTablePrint("#table-leave-absent");
                            $("#loading-humano").hide();
                        });
                        
                    }
                    getLeaveDetails();

                    edit();
                    function printLeaveDetails(startDate, endDate, pending, accepted){
                        var number = 0;
                        $('#print-leave-table').dataTable().fnClearTable();
                        $.getJSON(App.api + "/get/leave/request/date/" + startDate + "." + endDate + "." + selStatus, function(data){
                            $("#hiddenHTML").append($.Mustache.render("printLeaveView"));
                            
                            $("#print-leave-table").dataTable().fnDestroy();
                            $.each(data, function(i, item) {
                                number++;

                                var $html = $(" \
                                    <tr> \
                                        <td>" + number + "</td> \
                                        <td>" + item.startDate + " " + item.endDate + "</td> \
                                        <td>" + item.firstname + " " + item.middlename + " " + item.lastname + "</td> \
                                        <td>" + item.leaveName + "</td> \
                                        <td>" + item.reason + "</td> \
                                        <td>" + item.requestStatus + "</td> \
                                        <td>" + item.certBy + "</td> \
                                        <td>" + item.appBy + "</td> \
                                    </tr> \
                                    ");
                                $("#print-leave-table tbody").append($html);
                            });
                            $("#startDates").text(startDate);
                            $("#endDates").text(endDate);

                            $("#forPendingLeaves").text(pending);
                            $("#forAcceptedLeaves").text(accepted);
                            $("input[name=title]").val("Leave Request Report");
                            $("input[name=html]").val($("#hiddenHTML").html());
                        });
                    }

                    function edit(){
                        $("#table-leave-absent tbody").off("click", "td button[name=aEdit]").on("click", "td button[name=aEdit]", function(e) {
                            e.preventDefault();
                            var uid = $(this).attr("data-index");
                            initBootstrapSwitch("input[name='status']");

                            //getting data of leave
                            $.getJSON(App.api + "/get/leave/details/" + uid, function(data){
                                console.log(data);
                                if (data.status == 1) {
                                    $("input[name='status']").prop("checked", true);
                                } else {
                                    $("input[name='status']").prop("checked", false);
                                }

                                if(data.request_status == "Pending"){
                                    $("select[name=leaveStatus]").prop("selected", true);
                                }else{
                                    $("select[name=leaveStatus]").prop("selected", false);
                                }

                                $("input[name=leaveStart]").val(data.from);
                                $("input[name=leaveEnd]").val(data.to);
                                $("select[name=leaveStatus]").val(data.request_status);
                            });
                            
                            $(document).off("submit", "#editLeaveType").on("submit", "#editLeaveType", function(e){
                                e.preventDefault();

                                var leaveStart = $("input[name=leaveStart]").val();
                                var leaveEnd = $("input[name=leaveEnd]").val();
                                var leaveStatus = $("select[name=leaveStatus]").val();
                                var admin = localStorage.getItem("Username");
                                var status = 0;
                                if ($("input[name='status']").is(":checked")) {
                                    status = 1;
                                }

                                if(!leaveStart || !leaveEnd){
                                    alert("PLEASE FILL ALL THE FIELDS!");
                                }else{
                                    $.ajax({
                                        type: "POST",
                                        url: App.api + "/update/leave/request/" + uid,
                                        data: {
                                            leaveStart: leaveStart,
                                            leaveEnd: leaveEnd,
                                            leaveStatus: leaveStatus,
                                            status: status,
                                            admin: admin
                                        },
                                        beforeSend: function(){
                                            $("#loading-humano").show();
                                        },
                                        success: function(){
                                            $("#loading-humano").hide();
                                            alert("Data Updated!");
                                            $("#leaveRequestEdit").modal("toggle");
                                            getLeaveDetails();
                                            getCount();
                                        }
                                    });
                                }
                            });
                        });
                    }
                    function deleteLeave(){
                        $("#table-leave-absent tbody").off("click", "td button[name=aDelete]").on("click", "td button[name=aDelete]", function(e) {
                            e.preventDefault();
                            var leaveUid = $(this).attr("data-index");
                            console.log(leaveUid);

                            $(document).off("submit", "#deleteLeaveType").on("submit", "#deleteLeaveType", function(e){
                                e.preventDefault();
                                
                                $.getJSON(App.api + "/remove/leave/request/" + leaveUid, function(data){
                                    alert("Successfully Removed!");
                                    $("#leaveDelete").modal("toggle");
                                    getLeaveDetails();
                                    getCount();
                                });
                            });
                        });
                    }
                    deleteLeave();
                }
            });
        });

        Path.map('#/overtime/').to(function(){
            var overtimeTypes = getJSONDoc(App.api + "/get/overtime/type/")
            var overtimeList = [];
            $.each(overtimeTypes,function(i,item){
                var overtimeType = {
                    uid:item.uid,
                    overtimeName:item.name
                };
                overtimeList.push(overtimeType);
            });

            var employees = getJSONDoc(App.api + "/get/employee/name/" + App.token);
            var employeeList = [];
            $.each(employees,function(i,item){
                var employee = {
                    uid:item.uid,
                    firstname:item.firstname,
                    lastname:item.lastname,
                    middlename:item.middlename,
                    empNo:item.employee_number
                };
                employeeList.push(employee);
            });

            var overtimeCounts = getJSONDoc(App.api + "/get/overtime/notification/count/");

            var templateData = {
                overTimeTypes:overtimeList,
                employeeList:employeeList,
                overtimeCounts
            }
            console.log(templateData);

            App.canvas.html("").append($.Mustache.render("krono-overtime",templateData));
            var tableID = '#table-overtime';
            renderToDataTablePrint(tableID);

            timeFieldSelector = ["input[name=employeeApplyOvertimeTimeFromEdit]", "input[name=employeeApplyOvertimeTimeToEdit]"] 
            $.each(timeFieldSelector,function(i,item){
                initTimePicker(item);
            });

            initSelect2Modal("select[name=employeeName]","#modal-overtimeRequest")
            addNew();
            function addNew(){
                $(document).off("submit", "#applyOvertimeForm").on("submit", "#applyOvertimeForm", function(e){
                    e.preventDefault();
                    var employee =  $("select[name=employeeName]").val();
                    var type =  $("select[name=overtimetype]").val();
                    var reason =  $("textarea[name=overtimeReason]").val();
                    var startDate = $("input[name=employeeApplyOvertimeFrom]").val();
                    var startHour = $("input[name=employeeApplyOvertimeTimeFrom]").val();
                    var endDate = $("input[name=employeeApplyOvertimeTo]").val();
                    var endHour = $("input[name=employeeApplyOvertimeTimeTo]").val();
                    var admin = localStorage.getItem("Username");
                    var requestStatus = "Pending";
                    if(endDate < startDate){
                        alert("Sorry, we could not process your request, you put in an invalid date!");
                    }else if(!employee || !startDate || !type || !reason || !startHour || !endDate || !endHour){
                        alert("Please Fill All the Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/overtime/requests/new/" + App.token,
                            dataType: "json",
                            data: {
                                employee: employee,
                                type: type,
                                reason: reason,
                                startDate: startDate,
                                startHour: startHour,
                                endDate: endDate,
                                endHour: endHour,
                                requestStatus: requestStatus,
                                admin: admin
                            },
                            beforeSend: function(){
                                $("#loading-humano").show();
                            },
                            success: function(data){
                                $("#loading-humano").hide();

                                if(data.prompt == 1){
                                    alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
                                }else if(data.prompt == 0){
                                    alert("Successfully Added!");
                                    $("#overtimeRequest").modal("toggle");
                                    $("select[name=employeeName]").val("");
                                    $("select[name=overtimetype]").empty();
                                    $("input[name=employeeApplyOvertimeFrom]").val("");
                                    $("input[name=employeeApplyOvertimeHours]").val("");
                                    $("input[name=employeeApplyOvertimeFrom]").val("");
                                    $("input[name=employeeApplyOvertimeTimeFrom]").val("");
                                    $("input[name=employeeApplyOvertimeTo]").val("");
                                    $("input[name=employeeApplyOvertimeTimeTo]").val("");
                                    window.location.reload();
                                }else if(data.prompt == 3){
                                    alert("Sorry, we could not process your request, you put in an invalid date.");
                                }
                            }
                        });
                    }
                });
            }

            $(document).off("submit", "#formDate").on("submit", "#formDate", function(e){
                e.preventDefault();

                var startDate = $("input[name=startDate]").val();
                var endDate = $("input[name=endDate]").val();
                var selStatus = $("select[name=selStatus]").val();

                // $("#print").attr("Disabled", false);
                // var printLocationUrl = App.api + printLocation + App.token;
                // $("#printReportForm").attr("action", printLocationUrl);

                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate || !selStatus){
                    alert("Please Fill All The Fields!");
                }else{
                    $("#hiddenHTML").empty();
                    getCount();
                    function getCount(){
                        $.getJSON(App.api + "/get/overtime/notification/count/date/" + startDate + "." + endDate, function(data){
                            console.log(data)
                            $("#forPending").text(data.pendingCount);
                            $("#forAccepted").text(data.acceptedCount);
                            $("#forCertified").text(data.certifiedCount);
                            $("#forDenied").text(data.deniedCount);
                            // printOvertimeDetails(startDate, endDate, data.pendingCount, data.acceptedCount);
                        });
                        console.log("get count is activated")
                    }
                    getOvertimeDetails();
                    function getOvertimeDetails(){
                        var number = 0;
                        $("#loading-humano").show();
                        $('#table-overtime').DataTable().clear().destroy();
                        $.getJSON(App.api + "/get/overtime/request/date/" + startDate + "." + endDate + "." + selStatus, function(data){
                            $("#loading-humano").hide();
                            $.each(data, function(i, item){
                                number++;
                                var style;
                                var action;
                                var check = "<input type='checkbox' class='checkbox-action' data-uid='"+item.overtimeUid+"'>";
                                switch(item.requestStatus){
                                    case "Pending":
                                        style = "background-color: #fcf8e3";
                                        action = "<div class='btn-group btn-group-sm' role='group'>"+
                                                    "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.overtimeUid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "<button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.overtimeUid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='remove'><i class='fa fa-times'></i></button>"+
                                                "</div>";
                                        if(item.prompt != "Exact!"){
                                            check = "";
                                        }
                                        break;
                                    case "Denied":
                                        style = "background-color: #f2dede";
                                        action = "<div class='btn-group btn-group-sm' role='group'>"+
                                                    "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.overtimeUid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>"+
                                                    "<button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.overtimeUid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='remove'><i class='fa fa-times'></i></button>"+
                                                "</div>";
                                        break;
                                    case "Certified":
                                        style = "background-color: #d9edf7";
                                        action = "<button name='aEdit' class='button btn btn-sm btn-outline-success' data-index='"+ item.overtimeUid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>";
                                        break;
                                    default:
                                        style = "background-color: #dff0d8";
                                        action = "<button name='aEdit' class='button btn btn-sm btn-outline-success' data-index='"+ item.overtimeUid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>";
                                        break;
                                }
        
                                var $html = $(" \
                                    <tr> \
                                        <td style='"+style+"'>" + check + "</td> \
                                        <td style='"+style+"'>" + number + "</td> \
                                        <td style='"+style+"'>" + item.empNo + "</td> \
                                        <td style='"+style+"'>" + item.name + "</td> \
                                        <td style='"+style+"'>" + item.startDate + "</td> \
                                        <td style='"+style+"'>" + item.hours + "</td> \
                                        <td style='"+style+"'>" + item.type + "</td> \
                                        <td style='"+style+"'>" + item.reason + "</td> \
                                        <td style='"+style+"'>" + item.requestStatus + "</td> \
                                        <td style='"+style+"' class='text-danger'>" + item.prompt + "</td> \
                                        <td style='"+style+"'>" + item.certBy + "</td> \
                                        <td style='"+style+"'>" + item.apprBy + "</td> \
                                        <td style='"+style+"'>" + item.date_created + "</td> \
                                        <td style='"+style+"'>" + item.date_modified + "</td> \
                                        <td style='"+style+"'>" + action + "</td> \
                                    </tr> \
                                    ");
                                $("#table-overtime tbody").append($html);
                            });
                            renderToDataTablePrint("#table-overtime");
                        });
                    }
                    
                }//End of else statement
                $("#checkbox-selectAll").change(function(){
                    console.log("checkbox is selected");
                    var allPages = $("#table-overtime").DataTable().rows().nodes();
                    if($(this).prop("checked")){
                        $("#multi-action").removeAttr('hidden');
                        $("#multi-action").show();
                        $(".checkbox-action", allPages).prop("checked", true);
                    }else{
                        $("#multi-action").hide();
                        $(".checkbox-action", allPages).prop("checked", false);
                    }
                });
    
                $(document).off("submit", "#multi-action").on("submit", "#multi-action", function(e){
                    e.preventDefault();
    
                    var allPages = $("#table-overtime").DataTable().rows().nodes();
                    var action = $("select[name=select-action]").val();
                    var checkbox = $(".checkbox-action:checked", allPages);
                    var length = checkbox.length;
                    var count = 0;
    
                    //console.log(action);
    
                    if(action != "Select Action"){
                        $("#confirmation").modal("show");
                        $("#confirmationMessage").text("Are you sure you want to mark it as '" + action + "'?");
    
                        $(document).off("click", "#confirm-accept").on("click", "#confirm-accept", function(e){
                            e.preventDefault();
                            $(checkbox).each(function(){
                                var overtimeUid = $(this).data("uid");
                                count++;
                                console.log(overtimeUid);
                                $.ajax({
                                    type: "POST",
                                    url: App.api + "/overtime/request/edit/batch/",
                                    dataType: "json",
                                    data: {
                                        overtimeUid: overtimeUid,
                                        action: action,
                                        admin: localStorage.getItem("Username"),
                                        count: count
                                    },
                                    beforeSend: function(){
                                        $("#loading-humano").show();
                                    },
                                    success: function(data){
                                        //console.log(data);
                                        if(data == length){
                                            $("#loading-humano").hide();
                                            alert("Successfully Updated!");
                                            $("#confirmation").modal("hide");
                                            $("#multi-action").hide();
                                            $("input[name=checkbox-selectAll]").prop("checked", false);
                                            getCount();
                                            getOvertimeDetails();
                                        }
                                    }
                                });
                            });
                        });
                    }
                });
                function edit(){
                    $("#table-overtime tbody").off("click", "td button[name=aEdit]").on("click", "td button[name=aEdit]", function(e) {
                        e.preventDefault();
                        var uid = $(this).attr("data-index");
                        getData(uid);                    
                        function getData(uid){
                            $.getJSON(App.api + "/get/overtime/request/" + uid, function(data){
                                console.log(data);
                                if(data.status==1){
                                    $("input[name=status]").prop("checked", true);
                                }else{
                                    $("input[name=status]").prop("checked", false);
                                }
    
                                initBootstrapSwitch("input[name='status']");
    
                                if(data.requestStatus == "Pending"){
                                    $("select[name=employeeRequestStatus]").prop("selected", true);
                                }else{
                                    $("select[name=employeeRequestStatus]").prop("selected", false);
                                }
                                $("select[name=overtimetypes]").val(data.type);
                                $("input[name=employeeApplyOvertimeFromEdit]").val(data.startDates);
                                $("input[name=employeeApplyOvertimeTimeFromEdit]").val(data.startHour);
                                $("input[name=employeeApplyOvertimeToEdit]").val(data.endDate);
                                $("input[name=employeeApplyOvertimeTimeToEdit]").val(data.endHour);
                                $("select[name=employeeRequestStatus]").val(data.requestStatus);
                                $("textarea[name=employeeApplyOvertimeReason]").val(data.reason);
                                $("input[name=employeeApplyOvertimeHoursEdit]").val(data.hours);
                            });
                        }
    
                        $(document).off("submit", "#applyOvertimeFormEdit").on("submit", "#applyOvertimeFormEdit",function(e){
                            e.preventDefault();
    
                            var startDate = $("input[name=employeeApplyOvertimeFromEdit]").val();
                            var startHour = $("input[name=employeeApplyOvertimeTimeFromEdit]").val();
                            var endDate = $("input[name=employeeApplyOvertimeToEdit]").val();
                            var endHour = $("input[name=employeeApplyOvertimeTimeToEdit]").val();
    
                            var requestStatus = $("select[name=employeeRequestStatus]").val();
                            var reason = $("textarea[name=employeeApplyOvertimeReason]").val();
                            var hours = $("input[name=employeeApplyOvertimeHoursEdit]").val();
                            var type = $("select[name=overtimetypes]").val();
                            var admin = localStorage.getItem("Username");
                            var status = $("input[name=status]").val();
                            if ($("input[name='status']").is(":checked")) {
                                status = 1;
                            }
                            if(endDate < startDate){
                                alert("Sorry, we could not process your request, you put in an invalid date!");
                            }else if(!startDate || !startHour || !endDate || !endHour || !requestStatus || !reason){
                                alert("Please Fill All The Fields!");
                            }else{
                                $.ajax({
                                    type: "POST",
                                    url: App.api + "/overtime/request/edit/" + uid,
                                    data: {
                                        startDate: startDate,
                                        startHour: startHour,
                                        endDate: endDate,
                                        endHour: endHour,
                                        hour: hours,
                                        reason: reason,
                                        requestStatus: requestStatus,
                                        status: status,
                                        admin: admin,
                                        type: type
                                    },
                                    beforeSend: function(){
                                        $("#loading-humano").show();
                                    },
                                    success: function(){
                                        $("#loading-humano").hide();
                                        $("#overtimeRequestEdit").modal("toggle");
                                        alert("Successfully Updated!");
                                        getCount();
                                        getOvertimeDetails();
                                    }
                                });
                            }
                        });
                    });
                }
                edit();
                deleteOvertime();
                function deleteOvertime(){
                    $("#table-overtime tbody").off("click", "td button[name=aDelete]").on("click", "td button[name=aDelete]", function(e) {
                        e.preventDefault();
                        var overtimeUid = $(this).attr("data-index");
                        $(document).off("submit", "#deleteovertime").on("submit", "#deleteovertime", function(e){
                            e.preventDefault();
                            $.getJSON(App.api + "/remove/overtime/request/" + overtimeUid, function(data){
                                $("#overtimeDelete").modal("toggle");
                                alert("Successfully Removed!");
                                getOvertimeDetails();
                                getCount();
                            });
                        });
                    });
                }
            });
        });

        Path.map('#/holiday-restday/').to(function(){
            var holidayTypes = getJSONDoc(App.api + "/holiday/type/get/");
            var holidayTypesList = [];
            $.each(holidayTypes,function(i,item){
                holidayType = {
                    holidayTypeUid:item.holidayTypeUid,
                    nameType:item.nameType
                }
                holidayTypesList.push(holidayType);
            });

            var holidays = getJSONDoc(App.api + "/get/holiday/data/" + App.token);
            var holidaysList = [];
            $.each(holidays,function(i,item){
                var holiday = {
                    holidayname:item.holiday_name,
                    holidayTypeName:item.type_name
                }
                holidaysList.push(holiday);
            });

            var employees = getJSONDoc(App.api + "/get/employee/name/" + App.token);
            var employeeList = [];
            $.each(employees,function(i,item){
                var employee = {
                    uid:item.uid,
                    firstname:item.firstname,
                    lastname:item.lastname,
                    middlename:item.middlename,
                    empNo:item.employee_number
                };
                employeeList.push(employee);
            });

            var templateData = {
                holidayTypesList:holidayTypesList,
                employeeList:employeeList,
                holidaysList:holidaysList
            }

            App.canvas.html("").append($.Mustache.render("krono-holiday-restday",templateData));
            var tableID = '#table-holiday-restday';
            renderToDataTablePrint(tableID);
            var emp_uid = App.username;
            initBootstrapSwitch("#statuss");
            initSelect2Modal("#employeeName","#holidayRequest");
            
            $("#applyHolidayForm").submit(function(e) {
                e.preventDefault();				
				var startDate = $("#dateHolidayFrom").val();
				var startHour = $("#holidayFromTime").val();
				var endDate = $("#dateHolidayTo").val();
				var endHour = $("#holidayToTime").val();
				var reason = $("#holidayReason").val();
				var requestStatus = "Pending";
				var type = $("#holiday-type").val();
				var typeText = $("#holiday-type :selected").text();
				var uid = $("#employeeName").val();
				
				var admin   = emp_uid;
				if(endDate < startDate) {
					alert("Sorry, we could not process your request, you put in an invalid date!");
				}else if(!startDate || !reason || !startHour || !endDate || !endHour) {
					alert("Please Fill All the Fields!");
				}else {
					$.ajax({
						type    : "POST",
						url     : App.api + "/request/holiday/" + App.token,
						dataType: "json",
						data    : {
							employee     : uid,
							startDate    : startDate,
							startHour    : startHour,
							endDate      : endDate,
							endHour      : endHour,
							reason       : reason,
							requestStatus: requestStatus,
							type		 : type,
							typeText	 : typeText,
							admin		 : admin
						},
						beforeSend: function(){
							$("#loading-humano").show();
						},
						success: function(data){
							$("#loading-humano").hide();
							if(data.prompt == 1) {
								alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
							}else if(data.prompt == 0) {
								alert("Successfully Requested! Please be noted that the approval might take a few days.");
								$("#holidayRequest").modal("toggle");
								$("input[name=dateHolidayFrom]").val("");
								$("input[name=holidayFromTime]").val("");
								$("input[name=dateHolidayTo]").val("");
								$("input[name=holidayToTime]").val("");
								$("textarea[name=holidayReason]").val("");
								window.location.reload();
							}else if(data.prompt == 3) {
								alert("Sorry, we could not process your request, you put in an invalid date.");
							}else if(data.prompt == 4) {
								alert("One(1) Request per day only.");
							}
							else if(data.prompt == 5) {
								alert("The date you're requesting, is not a Holiday.");
							}
						}
					});
				}
			});

            $("#holidayForm").on("submit", function(e) {
				e.preventDefault();
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var status = $("#status").val();
				loadHolidayRequest(startDate, endDate, status);
			});
            function loadHolidayRequest(startDate, endDate, status) {
				if(endDate < startDate) {
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate) {
                    alert("Please Fill All The Fields!");
                }else {
                    $('#loading-humano').show();
                    var number = 0;
                    $.getJSON(App.api + "/get/holiday/requests/date/" + startDate + "." + endDate + "." + status + "." + App.token, function(data) {						
						$("#table-holiday-restday").DataTable().clear().destroy();
                        $('#loading-humano').hide();
                        console.log(data);
						$.each(data, function(i, item) {
                            number++;
                            var style;
                            var action;
                            switch(item.request_status){
                                case "Pending":
                                    style = "background-color: #fcf8e3";
                                    action = "<div class='btn-group btn-group-sm' role='group'>"+
                                                "<button name='aEdit' class='button btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>"+
                                                "<button name='aDelete' class='button btn btn-outline-danger aDelete' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#holidayDelete' title='Remove'><i class='fa fa-times'></i></button>"+
                                            "</div>";
                                    break;
                                case "Denied":
                                    style = "background-color: #f2dede";
                                    action = "<div class='btn-group btn-group-sm' role='group'>"+
                                                "<button name='aEdit' class='button btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>"+
                                                "<button name='aDelete' class='button btn btn-outline-danger aDelete' data-index='"+ item.uid +"'data-toggle='modal' data-target='#holidayDelete' title='Remove'><i class='fa fa-times'></i></button>"
                                            "</div>";
                                    break;
                                case "Certified":
                                    style = "background-color: #d9edf7";
                                    action = "<button name='aEdit' class='button btn btn-sm btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                    break;
                                default:
                                    style = "background-color: #dff0d8";
                                    action = "<button name='aEdit' class='button btn btn-sm btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                    break;
                            }
                            var $html = $(" \
                                <tr> \
                                    <td style='"+style+"'>" + number + "</td> \
                                    <td style='"+style+"'>" + item.start_date + "</td> \
									<td style='"+style+"'>" + item.name + "</td> \
                                    <td style='"+style+"'>" + item.hours + "</td> \
                                    <td style='"+style+"'>" + item.reason + "</td> \
                                    <td style='"+style+"'>" + item.request_status + "</td> \
                                    <td style='"+style+"'>" + item.certBy + "</td> \
                                    <td style='"+style+"'>" + item.apprBy + "</td> \
                                    <td style='"+style+"'>" + item.date_created + "</td> \
                                    <td style='"+style+"'>" + item.date_modified + "</td> \
                                    <td style='"+style+"'>" + action + "</td> \
                                </tr> \
                                ");
                            $("#table-holiday-restday tbody").append($html);
                        });
                        renderToDataTablePrint(tableID);
                    });
                }
			}

            $(document).off("click", ".aEdit").on("click", ".aEdit", function(e){
                e.preventDefault();			
				var xuid = $(this).attr("data-index");
				$("#edit-uid").val(xuid);
				console.log(xuid);
				$.getJSON(App.api + "/get/employee/holiday/request/details/" + xuid, function(data){
                    console.log(data);
					if(data.requestStatus == "Approved"){
						$("select[name=edit-holiday-type]").val(data.type);
						$("input[name=edit-dateHolidayFrom]").attr("Disabled", "Disabled");
						$("input[name=edit-dateHolidayFrom]").val(data.startDate);						
						$("input[name=edit-holidayFromTime]").attr("Disabled", "Disabled");
						$("input[name=edit-holidayFromTime]").val(data.startHour);
						$("input[name=edit-dateHolidayTo]").attr("Disabled", "Disabled");
						$("input[name=edit-dateHolidayTo]").val(data.endDate);						
						$("input[name=edit-holidayToTime]").attr("Disabled", "Disabled");
						$("input[name=edit-holidayToTime]").val(data.endHour);						
						$("textarea[name=edit-holidayReason]").attr("Disabled", "Disabled");
						$("textarea[name=edit-holidayReason]").val(data.reason);
						$("select[name=employeeRequestStatus]").attr("Disabled", "Disabled");
						$("select[name=employeeRequestStatus]").val(data.requestStatus);
						$("#updateStatDiv").hide();
						$("input[name=oTbtn]").attr("Disabled", "Disabled");
						$("select[name=edit-holiday-type]").attr("Disabled", "Disabled");
					}else{
						$("input[name=edit-dateHolidayFrom]").val(data.startDate);
						$("input[name=edit-holidayFromTime]").val(data.startHour);
						$("input[name=edit-dateHolidayTo]").val(data.endDate);
						$("input[name=edit-holidayToTime]").val(data.endHour);
						$("textarea[name=edit-holidayReason]").val(data.reason);						
						$("select[name=employeeRequestStatus]").val(data.requestStatus);						
						$("input[name=edit-work-hours]").val(data.hours);
						if(data.status==1){
                            $("input[name=statuss]").bootstrapSwitch('state', true);
						}else{
							$("input[name=statuss]").bootstrapSwitch('state', false);
						}
						$("input[name=statuss]").val(data.status);
					}
				});
            });

            $("#applyEditHolidayForm").on("submit", function(e) {
				e.preventDefault();
				var xuid = $("#edit-uid").val();
				var typeHoliday = $("select[name=edit-holiday-type]").val();
				var startDate = $("input[name=edit-dateHolidayFrom]").val();
				var startHour = $("input[name=edit-holidayFromTime]").val();
				var endDate = $("input[name=edit-dateHolidayTo]").val();
				var endHour = $("input[name=edit-holidayToTime]").val();
				var reason = $("textarea[name=edit-holidayReason]").val();
				var requestStatus   = $("select[name=employeeRequestStatus]").val();
				var status          = 0;
				if ($("input[name='statuss']").is(":checked")) {
					status  = 1;
				}
				var admin   = "";
				if(endDate < startDate){
					alert("Sorry, we could not process your request, you put in an invalid date!");
				}else if(!startDate || !requestStatus || !reason || !startHour || !endDate || !endHour){
					alert("Please Fill All The Fields!");
				}else{
					$.ajax({
						type    : "POST",
						url     : App.api + "/update/holiday/request/" + xuid,
						dataType: "json",
						data    : {
							startDate    : startDate,
							startHour    : startHour,
							endDate      : endDate,
							endHour      : endHour,
							reason       : reason,
							admin        : admin,
							requestStatus: requestStatus,
							status       : status,
							type         : typeHoliday
						},
						beforeSend: function(){
							$("#loading-humano").show();
						},
						success: function(data){
							$("#loading-humano").hide();
							if(parseInt(data.prompt) === 1){
								alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
							}else if(parseInt(data.prompt) === 0) {
								alert("Successfully Updated! Please be noted that the approval might take a few days.");
								// window.location.hash = "/employee/holiday/requests/" + uid;
								window.location.reload();
							}
						}
					});
				}
			});

            $(document).off("click", ".aDelete").on("click", ".aDelete", function(e) {
                e.preventDefault();			
				var xuid = $(this).attr("data-index");
				$("#delete-uid").val(xuid);
			});
        });


        // REPORT
        Path.map('#/import-dtr/').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-import-dtr"));
            var tableID = '#table-import-dtr';
            renderToDataTablePrint(tableID);
        });

        Path.map('#/time-summary/').to(function(){
            var costcenters = getJSONDoc(App.api + "/get/costcenter/");
            var costcenterList = [];
            $.each(costcenters, function(i, item){
                var costcenter = {
					uid: item.uid,
                    name: item.name,
                    description: item.description
                }                
                costcenterList.push(costcenter);
            });
            var templateData = {
                costcenter: costcenterList
            }
            App.canvas.html("").append($.Mustache.render("krono-time-summary",templateData));
            var tableID = '#table-time-summary';
            renderToDataTablePrint(tableID);

            $("#timesheetform").on("submit", function(e) {
				e.preventDefault();
				var sdate = $("input[name=tdTimesheetStartDate]").val();
				var edate = $("input[name=tdTimesheetEndDate]").val()
				var costcenter = $("select[name=employeeCostCenter]").val()
				
				$("#loading-humano").show();
				
				if(edate < sdate) {
					
				}
				else {
					$("#startDate").empty();
					$("#startDate").append(sdate);
					$("#endDate").empty();
					$("#endDate").append(edate);
                    
					$.getJSON(App.api + "/timekeeping/summary/" + sdate + "." + edate + "." + costcenter + "." + App.token, function(data){
                        console.log(data);
						$("#table-time-summary").DataTable().clear().destroy();					
						var ctr = 0;
						$.each(data, function(i, items) {
							ctr++;
							var html = "<tr>";
							html += "<td>" + ctr + "</td>";
							html += "<td>" + items.empName  + "</td>";
							html += "<td>" + items.daysPresent  + "</td>";
							html += "<td>" + items.hoursWork  + "</td>";
							html += "<td>" + items.daysAbsent  + "</td>";
							html += "<td>" + items.late  + "</td>";
							html += "<td>" + items.underTime  + "</td>";
							html += "<td>" + items.totalTardy  + "</td>";
							html += "<td>" + items.overTime  + "</td>";							
							html += "</tr>";
							$("#table-time-summary tbody").append(html);
						});	
						
						$("#process-button").empty();
						$("#process-button").append("<button class='button-ok w-100 btn text-center text-white p-2' id='process-timekeeping'>Process</button>");
						
                        $("#loading-humano").hide();
					});	
				}
			});

            $(document).off("click", "#process-timekeeping").on("click", "#process-timekeeping", function(e){
				e.preventDefault();			
				var sdate = $("input[name=tdTimesheetStartDate]").val();
				var edate = $("input[name=tdTimesheetEndDate]").val();
				var costcenter = $("select[name=employeeCostCenter]").val();                

				$('#loading-humano').show();
				
				$.ajax({
					type: "GET",
					url: App.api + "/timekeeping/summary/process/" + sdate + "." + edate + "." + costcenter + "." + App.token,
					dataType: "json",
					success: function(data) {
						$('#loading-humano').hide();
						if(parseInt(data.success) === 1) {
							alert("Process successfully!");
                            $("#process-button").prop("disabled", true);
						}
						else if(parseInt(data.error) === 1) {
							alert("Process encountered some error, please try again!");
                            $("#process-button").prop("disabled", false);
						}
					}
				});
			});
        });

        Path.map('#/time-logs/').to(function(){
            var timekeeping = getJSONDoc(App.api + "/timekeeping/log/file/" + App.token);
            var timekeepingList = [];
            var number = 0;
            var hlink = null;
            $.each(timekeeping, function(i, item){
                number++;
				var timekeep = {
					No: number,
					uid: item.uid,
                    period: item.period,
                    fromDate: item.fromDate,
					toDate: item.toDate,
					costcenter: item.costCenter,
					dateCreated: moment(item.dateCreated).format('MMM DD YYYY, h:mm:ss a'),
					dateModify: moment(item.dateModify).format('MMM DD YYYY, h:mm:ss a'),
					remarks: item.remarks
                }                
                timekeepingList.push(timekeep);
            });
            var templateData = {
                timekeepLog: timekeepingList
            }
            console.log(templateData);
            
            App.canvas.html("").append($.Mustache.render("krono-time-logs",templateData));
            var tableID = '#table-time-logs';
            renderToDataTablePrint(tableID);

            $(document).off("click", ".btn-deleteLog").on("click", ".btn-deleteLog", function(e){
				e.preventDefault();					
				var uid = $(this).attr("data-id");
				//console.log(uid);
				$("#delete-uid").val(uid);
			});
			
			$(document).off("click", "#btn-delete-log").on("click", "#btn-delete-log", function(e){
				e.preventDefault();	
				var uid = $("#delete-uid").val();
				//console.log(uid);				
				$.ajax({
					type: "GET",
					url: App.api + "/timekeeping/log/file/delete/" + uid + "." + App.token,
					dataType: "json",
					success: function(data) {
						if(parseInt(data.success) === 1) {
							alert("Delete successfully!");							
							//window.location.hash = "/timekeeping/log/file/";
							window.location.reload();
						}
						else if(parseInt(data.error) === 1) {
							//alert("Delete encountered some error, please try again!");
						}
					}
				});
			});

            // Process
            $(document).off("click", ".btn-processLog").on("click", ".btn-processLog", function(e){
				e.preventDefault();					
				var uid = $(this).attr("data-id");
				console.log(uid);
				$("#process-uid").val(uid);
			});

            $(document).off("click", "#btn-process-log").on("click", "#btn-process-log", function(e){
				e.preventDefault();	
				var uid = $("#process-uid").val();
				//console.log(uid);				
				$.ajax({
					type: "GET",
					url: App.api + "/timekeeping/log/file/process/" + uid + "." + App.token,
					dataType: "json",
					success: function(data) {
						if(parseInt(data.success) === 1) {
							alert("Process successfully!");	
							window.location.reload();
						}
						else if(parseInt(data.error) === 1) {
							alert("Process encountered some error, please try again!");
						}
					}
				});
			});
        });

        Path.map('#/timekeeping/log/file/view/:var').to(function(){
            var uid = this.params["var"];
			var timekeeping = getJSONDoc(App.api + "/timekeeping/log/file/view/" + uid);
            var timekeepingList = [];
            var number = 0;
            $.each(timekeeping, function(i, item){
                number++;
				var timekeep = {
					No: number,
					uid: item.uid,
                    name: item.empName,
                    daysPresent: item.daysPresent,
					hoursWork: item.hoursWork,
					daysAbsent: item.daysAbsent,
					late: item.late,
					undertime: item.undertime,
					totalTardy: item.totalTardy
                }                
                timekeepingList.push(timekeep);
            });

            var exportMe = [];			
			var piso = {
				uid: uid, 
				token: App.token
			}			
			exportMe.push(piso);
			
            var templateData = {
                timekeepLog: timekeepingList,
				exportMe: exportMe
            }

            console.log(templateData);

            App.canvas.html("").append($.Mustache.render("krono-time-logs-view",templateData));
            var tableID = '#table-time-logs-view';
            renderToDataTablePrint(tableID);

            $("#export-summary").on("click", function () {				
				function exportMe(uid) {
					$.ajax({
						type: "GET",
						url: App.api + "/export_dtr_summary.php?var=" + uid + "." + App.token,
						dataType: "json",
						success: function(data) {
							if(parseInt(data.success) === 1) {
								alert("Process successfully!");
							}
							else if(parseInt(data.error) === 1) {
								alert("Process encountered some error, please try again!");
							}
						}
					});
				}
				exportMe(uid);
				//alert("Yes! " + uid);
			});
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

        // LOADING
        Path.map('#/loading/').to(function(){
            App.canvas.html("").append($.Mustache.render("loading"));
            $("#loading").show();
            $("#loading").hide();
        });
        

        Path.root("#/dashboard/");
        Path.listen();
    });
});


