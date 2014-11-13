// var app = angular.module('commonship', [
// 'commonship.services',
// 'commonship.directives',
// 'commonship.filters',
// 'commonship.controllers'
// ]);

var app = {
  today: {
    dayOfWeek: '',
    dayNum: 0,
    day: 0,
    month: 0,
    monthName: '',
    year: 0
  },
  
  liturgy: {
    currentSheet: 0,
    numSheets: 4
  },
  
  lapse: {
    contemplationText: 10000,
    timerIntro: 5000,
    timer: 120000
  },
  
  debug: true,
  setDebugMode: function () {
    if (app.debug) {
      app.lapse.contemplationText = 1000;
      app.lapse.timer = 10000;
    }
  },
  
  start: function () {
    app.setDebugMode();
  
    $('.open-liturgy').click(function (evt) {
      evt.preventDefault();
      
      app.open();
    });
    
    $('.nav .next').click(function (evt) {
      evt.preventDefault();
      
      app.goToNextSheet();
    });
    $('.nav .previous').click(function (evt) {
      evt.preventDefault();
      
      app.goToPreviousSheet();
    });
    
  },
  open: function () {
    $('body')
      .removeClass('home')
      .addClass('liturgy');
  
    app.setupDate();
    
    $('.liturgy .previous').hide();
    $('.liturgy .next').hide();
    $('.liturgy .book .sheet').hide().removeClass('active');
    
    $('.start-book').click(function (evt) {
      evt.preventDefault();
      
      $('.liturgy .intro').hide();

      app.liturgy.currentSheet = 0;
      app.goToNextSheet();
    });
  },
  setupDate: function () {
    var d = new Date();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var liturgyDescriptions = [
      'drawn from the Sufi tradition of mystical Islam',
      'drawn from the Kabbalistic tradition of mystical Judaism',
      'drawn from the Gnostic tradition of mystical Christianity',
      'drawn from the Feri tradition of modern paganism',
      'drawn from secular humanism',
      'drawn from the Engaged Spirituality tradition of Zen Buddhism',
      'drawn from Hindu scriptures and mantras'
    ];
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
  
    app.today.dayNum = d.getDay();
    // FOR FORCING DATE IN DEV:
    app.today.dayNum = 6;
    
    app.today.dayOfWeek = weekday[app.today.dayNum];
    app.today.day = d.getDate();
    app.today.month = d.getMonth() + 1;
    app.today.monthName = months[d.getMonth()];
    app.today.year = d.getFullYear();

    $('.day-of-week').html(app.today.dayOfWeek);
    $('.date').html(app.today.monthName + ' ' + app.today.day + ', ' + app.today.year);
    $('.liturgy-description').html(liturgyDescriptions[app.today.dayNum]);

    $('body').addClass(app.today.dayOfWeek.toLowerCase());
    $('.liturgy .sheet').append('<a href="#next" class="btn btn-default next-button">Next Page</a>');
    $('.liturgy .sheet.biblio .next-button').remove();
    $('.next-button').click(function (evt) {
      evt.preventDefault();
      
      app.goToNextSheet();
    });
  },
  goToSheet: function (sheetNum) {
    $('.liturgy .previous').show();
    $('.liturgy .next').show();
      
    if (sheetNum >= app.liturgy.numSheets + 1) {
      sheetNum = app.liturgy.numSheets + 1;
      $('.liturgy .previous').show();
      $('.liturgy .next').hide();
    } else if (sheetNum <= 1) {
      sheetNum = 1;
      $('.liturgy .previous').hide();
      $('.liturgy .next').show();
    }
      
    app.liturgy.currentSheet = sheetNum;

    $('.liturgy .book .sheet').hide().removeClass('active');
    $('.liturgy .book .sheet' + app.liturgy.currentSheet).show().addClass('active');
    
    if ($('.liturgy .book .sheet' + app.liturgy.currentSheet + ' .contemplation-image').length
      && !$('.liturgy .book .sheet' + app.liturgy.currentSheet + ' .contemplation-image img').length)
    {
      $('.liturgy .book .sheet' + app.liturgy.currentSheet + ' .contemplation-image').html('<img src="img/' + app.today.dayOfWeek.toLowerCase() + '.jpg?1113" alt="Contemplation Image" />');

      $('.nav .next').hide();
      $('.liturgy .sheet.contemplation .next-button').hide();

      $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + ' .sheet' + app.liturgy.currentSheet + '.contemplation h3')
        .delay(app.lapse.contemplationText)
        .hide('slow');
      $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + ' .sheet' + app.liturgy.currentSheet + '.contemplation p')
        .delay(app.lapse.contemplationText)
        .hide('slow', function () {
          $('body').append('<div style="display:none;"><audio controls autoplay><source src="av/mp3/indian-bell.mp3" type="audio/mpeg"></audio></div>');

          app.showTimerStartMessage();
          
          $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + ' .sheet' + app.liturgy.currentSheet + '.contemplation img').click(function (evt) {
            app.showTimerPauseMessage();
          });
          
          $('.nav .next').delay(app.lapse.timer).show(function () {
            app.endTimer();
          });
        });
    } else {
      $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + '.contemplation h3').show();
      $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + '.contemplation p').show();
      $('.nav .next').show();
    }
  },
  goToPreviousSheet: function () {
    var prevSheet = app.liturgy.currentSheet - 1;
    app.goToSheet(prevSheet);
  },
  goToNextSheet: function () {
    var nextSheet = app.liturgy.currentSheet + 1;
    app.goToSheet(nextSheet);
  },
  endTimer: function () {
    $('.liturgy .sheet.contemplation .next-button').show();
    
    $('body').append('<div style="display:none;"><audio controls autoplay><source src="av/mp3/indian-bell.mp3" type="audio/mpeg"></audio></div>');
    
    app.goToNextSheet();
    app.removeTimerPauseMessage();
  },
  showTimerStartMessage: function () {
    var text = '<p>Take a breath.</p><p>For the next 2 minutes, focus your attention on the image, or close your eyes and just breathe.</p><p>When you hear the closing bell, you\'ll be able to continue to the final page of today\'s liturgy.</p>';
    
    $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + ' .sheet' + app.liturgy.currentSheet + '.contemplation').prepend('<div class="timer-start-message">' + text + '</p>');
    $('.timer-start-message').delay(app.lapse.timerIntro).hide('slow');
  },
  showTimerPauseMessage: function () {
    var text = '<p>Do you want to skip this contemplation?</p>'
      + '<p>'
      + '  <a href="#skip" class="btn btn-success btn-block js-skip-contemplation text-right">Yes, Skip to Next Page</a>'
      + '  <a href="#close" class="btn btn-default btn-block js-resume-contemplation">No, Continue My Contemplation</a>';
      + '</p>';
    text = '<div class="timer-pause-message">' + text + '</div>';
    $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + ' .sheet' + app.liturgy.currentSheet + '.contemplation').prepend(text);
    
    $('.js-skip-contemplation').click(function (evt) {
      evt.preventDefault();
      
      app.endTimer();
    });
    $('.js-resume-contemplation').click(function (evt) {
      evt.preventDefault();
      
      app.removeTimerPauseMessage();
    });
  },
  removeTimerPauseMessage: function () {
      $('.js-skip-contemplation').unbind();
      $('.js-resume-contemplation').unbind();
      
      $('.timer-pause-message').remove();
  }
};