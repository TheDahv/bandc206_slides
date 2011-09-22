var bandc = bandc || {};

bandc.slide_list = [];

bandc.current_index = 0;

bandc.nextSlide = function () {
  var idx = bandc.current_index;
  var slides = bandc.slide_list;
    
  if (idx < slides.length - 1) {
    // Send any existing past slides into oblivion
    $('.far_past').removeClass('far_past');
    
    // past goes to far past
    $('.past').removeClass('past').addClass('far_past');
    
    // current goes to past
    $('.current').removeClass('current').addClass('past');
  
    // future goes to current
    $('.future').removeClass('future').addClass('current');
        
    // Put a slide on deck if one exists
    $('.far_future').removeClass('far_future').addClass('future');    
    
    // Put a slide in the hole if it exists (note: this is a baseball reference)
    if (idx + 3 < slides.length) {
      $(slides[idx + 3]).addClass('far_future');
    }
    
    location.replace(slides[idx + 1]);
    bandc.current_index = idx + 1;
    
    bandc.updatePositionIndicator();
  }
};

bandc.previousSlide = function () {
  var idx = bandc.current_index;
  var slides = bandc.slide_list;
  
  if (idx > 0) {
    // Send any existing future slides into oblivion
    $('.far_future').removeClass('far_future');
    
    // future goes to far future
    $('.future').removeClass('future').addClass('far_future');
        
    // current goes to future
    $('.current').removeClass('current').addClass('future');
    
    // past goes to current
    $('.past').removeClass('past').addClass('current');
    
    $('.far_past').removeClass('far_past').addClass('past');
        
    // Put a previous slide in the hole if it exists
    if (idx - 3 >= 0) {
      $(slides[idx - 3]).addClass('far_past');
    }
    
    location.replace(slides[idx - 1]);
    bandc.current_index = idx - 1;
    
    bandc.updatePositionIndicator();
  }
};

bandc.moveToSlide = function (slide_name) {
  var slides = bandc.slide_list;
  var idx = slides.indexOf(slide_name);  
  
  if (idx >= 0) {
    // Update the deck position
    bandc.current_index = idx;
    
    // Clear out all states on all slides
    $('.slide').
      removeClass('far_past').
      removeClass('past').
      removeClass('current').
      removeClass('future').
      removeClass('far_future');
      
    $(slides[idx]).addClass('current');
    if (idx > 0) {
      $(slides[idx - 1]).addClass('past');
      if (idx - 2 > 0) {
        $(slides[idx - 2]).addClass('far_past');
      }
    }
    
    if (idx < slides.length - 1) {
      $(slides[idx + 1]).addClass('future');
      if (idx + 2 < slides.length) {
        $(slides[idx + 2]).addClass('far_future');
      }
    }
    bandc.updatePositionIndicator();
  }
};

bandc.updatePositionIndicator = function () {
  var idx = bandc.current_index + 1;
  var length = bandc.slide_list.length;
  
  $('#position_indicator').text(idx + ' of ' + length);
}

$(function () {
  if (document.location.pathname.indexOf('/slides') >= 0) {
    // Populate the slide list
    $('.slide').each(function () {
      bandc.slide_list.push('#' + $(this).attr('id'));
    });
    
    if (document.location.hash === '') {
      $(bandc.slide_list[0]).addClass('current');
      $(bandc.slide_list[1]).addClass('future');
      $(bandc.slide_list[2]).addClass('far_future');
    } else {
      bandc.moveToSlide(document.location.hash);      
    }
    bandc.updatePositionIndicator();
    
    $('#previous').click(function (e) {
      bandc.previousSlide();
      
      e.preventDefault();
      return false;
    });
    
    $('#next').click(function (e) {
      bandc.nextSlide();
      
      e.preventDefault();
      return false;
    });
    
    $(document).keydown(function (e) {
      switch(e.which) {
      case 39:
        bandc.nextSlide();
        break;
      case 37: 
        bandc.previousSlide();
        break;
      case 34:
        bandc.moveToSlide(bandc.slide_list[bandc.slide_list.length - 1]);
        break;
      case 35:        
        bandc.moveToSlide(bandc.slide_list[bandc.slide_list.length - 1]);
        break;
      case 33:
        bandc.moveToSlide(bandc.slide_list[0]);
        break;
      case 36:
        bandc.moveToSlide(bandc.slide_list[0]);
        break;
      } 
    });
  }
});