var $department= $("department");
var $infra_comp =$("infra-comp");

$department.change(function () {
    if ($department.val() == 'comp') {
        $infra_comp.removeAttr('disabled');
    } else {
        $infra_comp.attr('disabled', 'disabled').val('');
    }
}).trigger('change'); 