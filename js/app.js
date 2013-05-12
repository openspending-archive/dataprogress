jQuery(function($) {
  var url = 'https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdElqWTBJS0Q1Q083VlI3YUFLTl9OY0E#gid=0';
  var $el = $('.load-status');
  var tmpl = $('#our-template').html();
  recline.Backend.GDocs.fetch({url: url})
    .done(function(results) {
      // take off first row as it is instructions
      results.records = results.records.slice(1);
      results.records = _.map(results.records, function(record) {
        record.owners = parseOwners(record.owners);
        record.noOwner = (record.owners.length === 0)
        return record
      });
      var out = Mustache.render(tmpl, results);
      $el.html(out);
    });
  $('.source-url').attr('href', url);
  $('.js-more-info').live('click', function(e) {
    e.preventDefault();
    $(e.target) .closest('.record').find('.more-info').toggle();
  });
});

function strip(s) {
  return s.replace(/^ */, '').replace(/ *$/, '');
}

function parseOwners(owners) {
  owners = strip(owners);
  if (owners == '') {
    return [];
  }
  var out = _.map(owners.split(','), function(owner) {
    var parts = strip(owner).match(/^([^<]*)(<(.*)>)?/);
    newowner = {
      name: parts[1],
      email: parts[3] || ''
    }
    if (newowner.email) {
      newowner.gravatar = 'http://www.gravatar.com/avatar/' + md5(newowner.email.toLowerCase()) + '?s=40&d=retro';
    }
    return newowner;
  });
  return out;
}
