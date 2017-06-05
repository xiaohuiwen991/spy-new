function trimAll(selector) {
    $(selector+' input,'+selector+' textarea').each(function (i,el) {
        var value = $(el).val();
        $(el).val($.trim(value));
    });
}