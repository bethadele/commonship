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
  
  start: function () {
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
      $('.liturgy .book .sheet' + app.liturgy.currentSheet + '.contemplation h3').delay(10000).hide('slow');
      $('.liturgy .book .sheet' + app.liturgy.currentSheet + '.contemplation p').delay(10000).hide('slow');
      $('.nav .next').hide();
    } else {
      $('.liturgy .book .' + app.today.dayOfWeek.toLowerCase() + ' .contemplation h3').show();
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
  }
};