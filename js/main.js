/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Brandon Wissmann 
*
*
********************************************************************************/


let employeesModel = []

// Population the employeesModel array using AJAX
function initializeEmployeesModel() {
    $.get('https://tranquil-hollows-40489.herokuapp.com/employees', function (employees) {
        employeesModel = $.map(employees, function (value, index) {
            return [value]
        });
        refreshEmployeeRows(employeesModel)
    })
        .fail(function () {
            showGenericModal('Error', 'Unable to get Employees')
        })
}

// Populate and display the modal
function showGenericModal(title, message) {
    $('.modal-title').html(title)
    $('.modal-body').html(message)

    $('#genericModal').modal() //display modal
}

function refreshEmployeeRows(employees) {
    var template = _.template(

        '<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id="<%- employee._id %>">' +
        '<div class="col-xs-4 body-column" > <%- employee.FirstName %> </div>' +
        '<div class="col-xs-4 body-column" > <%- employee.LastName %> </div>' +
        '<div class="col-xs-4 body-column" > <%- employee.Position.PositionName %> </div>' +
        '</div>' +
        '<% }); %>'
    )

    var templateResults = template({ 'employees': employees })
    $('#employees-table').empty().append(templateResults)
}

function getFilteredEmployeesModel(filterString) {
    var filteredArray = _.filter(employeesModel, function (employee) {
        return employee.FirstName.toUpperCase().match(filterString.toUpperCase()) || employee.LastName.toUpperCase().match(filterString.toUpperCase()) || employee.Position.PositionName.toUpperCase().match(filterString.toUpperCase())
    })
    return filteredArray
}

function getEmployeeModelById(id) {
    var deepCopyEmp = null;
    for (var i = 0; i < employeesModel.length; i++) {
        if (employeesModel[i]._id == id) {
            deepCopyEmp = _.cloneDeep(employeesModel[i])
            break
        }
    }

    return deepCopyEmp
}

$(function () {
    initializeEmployeesModel()

    //Set up search bar to refresh table on keyup
    $(document).on("keyup", "#employee-search", function () {
        var filteredRows = getFilteredEmployeesModel($("#employee-search").val())
        refreshEmployeeRows(filteredRows)
    });

    //Setting up clickable employees
    $(document).on("click", ".body-row", function () {
        var clickedEmp = getEmployeeModelById($(this).attr("data-id"))
        var HireDate = moment(clickedEmp.HireDate)
        HireDate = HireDate.format("MMM Do YYYY")

        //create a template
        var template = _.template(
            '<strong>Address:</strong> <%= employee.AddressStreet %>, <%= employee.AddressState %>, <%= employee.AddressCity %> <%= employee.AddressZip %></br>' +
            '<strong>Phone Number:</strong> <%= employee.PhoneNum %> </br>' +
            '<strong>Hire Date:</strong> <%= HireDate %>'
        )

        //save created HTML from template
        var templateResults = template({ 'employee': clickedEmp, 'HireDate': HireDate })

        showGenericModal(clickedEmp.FirstName + ' ' + clickedEmp.LastName, templateResults)
    })

})

