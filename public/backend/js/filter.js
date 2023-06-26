function filterTable() {
    var rc = document.getElementById('rcFilter');
    var selectedRC=rc.value;
    var semester = document.getElementById('semesterFilter');
    var selectedSemester=semester.value;
    var table = document.querySelectorAll('#tableBody tr');
   
    var rows=table.getElementByTagName("tr");
  resultdata.forEach((t)=> {
      var rc = row.getAttribute('resultdata-rc');
      var semester = row.getAttribute('resultdata-sem');
  
      if (
        (selectedRC === 'all' || selectedRC === rc) &&
        (selectedsemester === 'all' || selectedsemester === semester)
      ) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }
       