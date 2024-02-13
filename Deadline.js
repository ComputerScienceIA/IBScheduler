
    // function to check if a deadline has passed
    function hasDeadlinePassed(deadline) {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); // Set to one day before the current date
        return deadlineDate < currentDate;
    }

    // function to remove rows with passed deadlines
    function removePassedDeadlines() {
        var table = document.getElementById('deadlineTable').getElementsByTagName('tbody')[0];
        for (let i = 0; i < table.rows.length; i++) {
            let deadline = table.rows[i].cells[2].innerText;
            if (deadline && hasDeadlinePassed(deadline)) {
                table.deleteRow(i);
                i--; // move the index since a row was removed
            }
        }
    }

    // function to add a delete button to a row
    function addDeleteButton(row, isInitialRow = false) {
        var deleteCell = row.insertCell(3);
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function() {
            if (isInitialRow) {
                clearRowContent(row);
                shiftUpRows(row.rowIndex);
            } else {
                row.remove(); // Delete the entire row
            }
            sortTableByDeadline();
        };
        deleteCell.appendChild(deleteButton);
    }

    // function to clear content of a row
    function clearRowContent(row) {
        for (let i = 0; i < row.cells.length - 1; i++) {
            row.cells[i].innerText = "";
        }
    }

    // function to shift up rows when a row is cleared
    function shiftUpRows(clearedRowIndex) {
        var table = document.getElementById('deadlineTable');
        for (let i = clearedRowIndex; i < table.rows.length - 1; i++) {
            for (let j = 0; j < 3; j++) {
                table.rows[i].cells[j].innerText = table.rows[i + 1].cells[j].innerText;
            }
        }
        // clear the last row
        clearRowContent(table.rows[table.rows.length - 1]);
    }

    // sort the table by the closest deadline
    function sortTableByDeadline() {
        var table, rows, switching, i, x, y;
        table = document.getElementById('deadlineTable');
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];
                if (new Date(x.innerHTML) > new Date(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    break;
                }
            }
        }
    }

    // add or fill a row in the table
    function addOrFillRow(subject, type, date) {
        var table = document.getElementById('deadlineTable').getElementsByTagName('tbody')[0];
        var newRowAdded = false;

        // add the new deadline in the first empty row
        for (let i = 0; i < table.rows.length; i++) {
            if (!table.rows[i].cells[0].innerText) {
                table.rows[i].cells[0].innerText = subject;
                table.rows[i].cells[1].innerText = type;
                table.rows[i].cells[2].innerText = date;
                newRowAdded = true;
                break;
            }
        }

        // adds a new row if no empty row was found
        if (!newRowAdded) {
            var newRow = table.insertRow();
            newRow.insertCell(0).innerText = subject;
            newRow.insertCell(1).innerText = type;
            newRow.insertCell(2).innerText = date;
            addDeleteButton(newRow);
        }
        sortTableByDeadline();
    }

    // initialize the table with 6 empty rows
    function initializeEmptyRows() {
        var table = document.getElementById('deadlineTable').getElementsByTagName('tbody')[0];
        for (let i = 0; i < 6; i++) {
            var newRow = table.insertRow();
            for (let j = 0; j < 3; j++) {
                newRow.insertCell(j);
            }
            addDeleteButton(newRow, true); // Mark as an initial row
        }
    }

    // event listener for form submission
    document.getElementById('assignmentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        let subject =    document.getElementById('subjectInput').value;
        let type = document.getElementById('typeInput').value;
        let date = document.getElementById('dateInput').value;

        addOrFillRow(subject, type, date);
    });

    // initialize the table on page load
    window.onload = function() {
        initializeEmptyRows();
        setInterval(removePassedDeadlines, 24 * 60 * 60 * 1000); // Check for passed deadlines every 24 hours
    };
