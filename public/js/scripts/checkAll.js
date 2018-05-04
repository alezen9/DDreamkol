 function selectAll(source) {
    checkboxes = document.getElementsByName('p[]');
    for(var i in checkboxes)
        checkboxes[i].checked = source.checked;
}

function selectAll2(source) {
    checkboxes = document.getElementsByName('d[]');
    for(var i in checkboxes)
        checkboxes[i].checked = source.checked;
}