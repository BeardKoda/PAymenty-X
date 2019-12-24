var selector = 'form';
$(selector).each(function(indx){if($(this).attr('action') === undefined){$(this).attr('action', '/').attr('method','post');}});
$(function(){
  $(selector+'[action = "/"]').submit(function(e) {

    hide = 1; 
    delay = 0; 
    success_msg = "Message has been sent!"; 
    error_msg = "Oops, something went wrong! Please try again later."; 
    wait_msg = 'Sending...'; 
    redirect = ''; 
    action = 'https://new-backend-dev.chronobank.io/api/v1/collaboration/enquiries'; 

    cur_id = '#'+$(this).attr('id');
    if($(cur_id).attr('data-hide') !== undefined){ hide = parseInt($(cur_id).attr('data-hide')); }
    if($(cur_id).attr('data-delay') !== undefined){ delay = parseInt($(cur_id).attr('data-delay')); }
    cur_success = $(cur_id).siblings('.w-form-done').text().trim();
    if(cur_success !== 'Thank you! Your submission has been received!'){ success_msg = cur_success; }
    cur_error = $(cur_id).siblings('.w-form-fail').text().trim();
    if(cur_error !== 'Oops! Something went wrong while submitting the form'){ error_msg = cur_error; }
    cur_wait = $(cur_id).find('[data-wait]').attr('data-wait'); if(cur_wait !== 'Please wait...'){ wait_msg = cur_wait; }
    cur_redirect = $(cur_id).attr('data-redirect'); if(cur_redirect !== undefined){ redirect = cur_redirect; }
    cur_action = $(cur_id).attr('action'); if(cur_action !== '/'){ action = cur_action; }
    submit_div = $(cur_id).find('[type = submit]');
    submit_txt = submit_div.attr('value');
    if(wait_msg !== ''){ submit_div.attr('value', wait_msg); }
    if($(cur_id).attr('data-send') !== undefined){ $('<input type="hidden" name="sendto" value="'+$(cur_id).attr('data-send')+'">').prependTo(cur_id); }
    $('<input type="hidden" name="Форма" value="'+$(cur_id).attr('data-name')+'">').prependTo(cur_id);
    $('<input type="hidden" name="Страница" value="'+document.location.href+'">').prependTo(cur_id);
    $('<input type="hidden" name="required_fields">').prependTo(cur_id);
    required_fields = '';
    $(cur_id).find('[required=required]').each(function(){
      required_fields = required_fields + ',' + $(this).attr('name');
    });
    $(cur_id).find('[name=required_fields]').val(required_fields);
    e.preventDefault();
    var formData = new FormData($(cur_id)[0]);
    let jsonObject = { "name": "name", 
    "email": "email", 
    "message": "message" };

    for (const [key, value]  of formData.entries()) {
      jsonObject[key] = value;
    }

    $.ajax({
      url: action,
      type: 'POST',
           //processData: false,
           contentType: "application/json; charset=utf-8",
           dataType: 'json',
           data: JSON.stringify(jsonObject)
    })
    .done(function( result ) {
      if(result.createdAt){
        if(redirect !== '' && redirect !== '/-') { document.location.href = redirect; return(true); }
        $(cur_id).siblings('.w-form-fail').hide();
        replay_class = '.w-form-done';
        replay_msg = success_msg;
      } else {
        $(cur_id).siblings('.w-form-done').hide();
        result === 'ERROR_REQUIRED' ? replay_msg = 'The required field is not set!' : replay_msg = error_msg;
        replay_class = '.w-form-fail';
      }
      replay_div = $(cur_id).siblings(replay_class);
      replay_div.find('div').text(replay_msg);
      replay_div.show();
      if(hide){$(cur_id).hide();}
      submit_div.attr('value', submit_txt);
      if(delay !== 0) { replay_div.delay(delay).fadeOut(); }
      if(result == 'success'){$(cur_id).trigger("reset");}
    }).fail(function(e) {
      console.log(e);
  });
  });
});
$('textarea').val('');
$('.w-form [data-name]').each(function(indx){$(this).attr('name', $(this).attr('data-name'));});
$('label[for^=file]').each(function(){
  file_id = $(this).attr('for');
  $(this).after('<input name="file[]" type="file" id="'+file_id+'" multiple style="display:none;">');
  $('input#'+file_id).on('change', function(){$(this).siblings('label[for]').text('File chosen.');});
});
