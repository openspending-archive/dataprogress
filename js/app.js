jQuery(function($) {
  var url = 'https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdElqWTBJS0Q1Q083VlI3YUFLTl9OY0E#gid=0';
  var tmpl = $('#our-template').html();
  var listify = new Listify.App({
    el: '.load-status',
    url: url,
    template: tmpl
  }, function(err) {
    listify.queryResults = listify.queryResults.slice(1);
    listify.render();
  });
  $('.source-url').attr('href', url);
});
