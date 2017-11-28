var x = 0;
var y = 0;
var lastScrollTop = 0;
var projectSection = document.querySelector('.project-pages');
var projectIndex = document.querySelector('.project-index');
var sideBorders = document.querySelector('.project-index');
var launchedProject = 0;
var launchedProjectImg = 0;



// Stagger Scroll Animation

var onMove = function(event) {

  var st = $(this).scrollTop();
  if (st > lastScrollTop) {

    //I'm sure there's a better way to do this...

    $('.project1').removeClass("down1").addClass("up1");
    $('.project2').removeClass("down2").addClass("up2");
    $('.project3').removeClass("down3").addClass("up3");
  } else {
    $('.project1').removeClass("up1").addClass("down1");
    $('.project2').removeClass("up2").addClass("down2");
    $('.project3').removeClass("up3").addClass("down3")

  }

  lastScrollTop = st;
}

// Smooth Scroll Animation

var onScroll = function(e) {
  var t = 0;
  var position = e.currentTarget.scrollY;

  function myLoop() {
    Math.abs(y - position) < .1
      ? y = position
      : y += (position - y) * t;
    $('.pro').css('transform', 'translate3d(0, ' + -y + 'px, 0)');
    if (t < 1) {
      t += 0.15; //Speed variable
      requestAnimationFrame(myLoop);
    }
  }

  myLoop();
};


// Parallax Items Scrolling
var PARALLAX_CONFIG = {
    translateDistance: 150, // adjust for distance between items (tighter spring vs longer spring)
    itemClass: 'project', // class representing each item
    incomingTranslateTiming: 1.25, // these two values affect the "springiness" feel
    outgoingTranslateTiming: .75,
};
PARALLAX_CONFIG.parallaxItems = $('.' + PARALLAX_CONFIG.itemClass);
PARALLAX_CONFIG.verticalBoundSize = $(PARALLAX_CONFIG.parallaxItems.get(0)).height() / 2;
PARALLAX_CONFIG.originalOffsets = $.map(PARALLAX_CONFIG.parallaxItems, function(pi, i) {
    return $(pi).offset().top;
});

var parallaxScroll = function(e) {
    var viewportHeight = $(window).height();
    var pagePosition = e.currentTarget.scrollY;
    PARALLAX_CONFIG.parallaxItems.each(function(i) {
        var offset = PARALLAX_CONFIG.originalOffsets[i];
        var itemHeight = $(this).height();
        var centeredOffset = offset - (viewportHeight - itemHeight) / 2;

        if (pagePosition <= centeredOffset - PARALLAX_CONFIG.verticalBoundSize) {
            $(this).css({
                transform: "translate(0, " + PARALLAX_CONFIG.translateDistance + "px)",
                transition: "transform " + PARALLAX_CONFIG.outgoingTranslateTiming + "s",
            });
        } else if (pagePosition > centeredOffset - PARALLAX_CONFIG.verticalBoundSize && pagePosition < centeredOffset + PARALLAX_CONFIG.verticalBoundSize) {
            $(this).css({
                transform: "translate(0, 0)",
                transition: "transform " + PARALLAX_CONFIG.incomingTranslateTiming + "s",
            });
        } else {
            $(this).css({
                transform: "translate(0, -" + PARALLAX_CONFIG.translateDistance + "px)",
                transition: "transform " + PARALLAX_CONFIG.outgoingTranslateTiming + "s",
            });
        };
    });
};

// Combine Smooth Scroll with Stagger

$(window).scroll(function(e, event) {
  // onScroll(e);
  // onMove(event);
  parallaxScroll(e);
});
$(window).scroll();

function launchProject(el) {

  $(projectIndex).addClass("hidden");

    setTimeout(function() {
$('.project-image').css({"transform" : "scale(1.4)"});
$('.project-image').velocity({ "scale" : "1"}, {duration: 500});
      $('.project-top').velocity({opacity: "1"}, {duration: 1000});

  setTimeout(function() {
    $('.close').addClass("visible");
  }, 1000);

  $(projectSection).removeClass("hidden");
  $(el).addClass("launched");


  $('.project-page').removeClass("off").addClass("on");
  $('.project-page').velocity({
    width: "100vw"
  }, {
    duration: 100,
    easing: "easeOutCubic"
  });
  }, 1000);
  setTimeout(function() {
    $('.close').addClass("visible");
    $('.cover').velocity({paddingTop: "0px"}, {duration: 200});
      $(projectIndex).removeClass("hidden");
  }, 2000);

}

function closeProject(el) {

  launchedProject = document.querySelector('.launched');
  launchedProjectImg = document.querySelector('.launched .back');
  var domRect = launchedProject.getBoundingClientRect();
  var domRectImg = launchedProjectImg.getBoundingClientRect();

  //Get the offset of the square
  var spaceBelow = domRect.bottom - window.scrollY + y + "px";
  var spaceAbove = domRect.top - window.scrollY + y + "px";
  var spaceLeft = domRect.left + "px";
  var spaceRight = domRect.right + "px";

  //Get the offset of the square's image

  var spaceBelowImg = domRectImg.bottom - window.scrollY + y + "px";
  var spaceAboveImg = domRectImg.top - window.scrollY + y + "px";
  var spaceLeftImg = domRectImg.left + "px";
  var spaceRightImg = domRectImg.right + "px";

  //Resize project-image to the size of square's image


  $('.project-image').css({marginLeft: spaceLeftImg, marginTop: spaceAboveImg});
  $('.project-image').removeClass("full").addClass("shrink");

  //Hide the Close icon

  $('.close').removeClass("visible").addClass("hidden");
  $('.cover').velocity({paddingTop: "400px"}, {duration: 200, easing: "easeOutCubic"});

  // Clip project page to the size of the square

  $('.project-page').css({
    clipPath: "polygon(" + spaceLeft + " " + spaceAbove + ", " + spaceRight + " " + spaceAbove + ", " + spaceRight + " " + spaceBelow + ", " + spaceLeft + " " + spaceBelow + " )"
  });
    $(launchedProject).removeClass("launched");

  // After Animation is complete, reset all properties


  setTimeout(function() {
    $('.project-page').removeAttr('style').removeClass("on").addClass("off");
    $('.project-image').removeAttr('style').removeClass("shrink").addClass("full");
    $('.cover').css({paddingTop: 0});
    $(projectSection).addClass("hidden");
  }, 1000);



}
$(function() {
  $('.pro').hover(function() {
    $('.top-border').css('height', '12px');
    $('.bottom-border').css('height', '12px');
    $('.right-border').css('width', '12px');
    $('.left-border').css('width', '12px');
      $(this).find('.main-title').addClass("flipped");
    $(this).find('.project-title-mask').css('height', '20px');
  }, function() {
    // on mouseout, reset the background colour
    $('.top-border').css('height', '0px');
    $('.bottom-border').css('height', '0px');
    $('.right-border').css('width', '0px');
    $('.left-border').css('width', '0px');
      $(this).find('.main-title').removeClass("flipped");
      $(this).find('.project-title-mask').css('height', '0px');
  });
});
