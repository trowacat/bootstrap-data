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


$(function () {
    let employeesModel = []

    // Population the employeesModel array using AJAX
    function initializeEmployeesModel() {
        $.get('https://tranquil-hollows-40489.herokuapp.com/employees', function (employees) {
            employeesModel = employees
            refreshEmployeesRows(employeesModel)
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
            '<div class="row body-row" data-id="employee._id">' +
            '< div class="col-xs-4 body-column" > <%- employee.FirstName %> </div>' +
            '< div class="col-xs-4 body-column" > <%- employee.LastName %> </div>' +
            '< div class="col-xs-4 body-column" > <%- employee.Position %> </div>' +
            '</div >' +
            '</div>' +
            '<% }); %>'
        )

        var templateResults = template({ 'employees': employees })
        $('#employees-table').empty().append(templateResults)
    }


})

