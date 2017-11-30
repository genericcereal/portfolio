/// Parallax Items Scrolling

var launchedProject = "";
var launchedProjectImg = "";
var domRect = "";
var domRectImg = "";

//   Get the offset of the square
var spaceBelow = "";
var spaceAbove = "";
var spaceLeft = "";
var spaceRight = "";

var domRectImg = "";
var spaceAboveImg = "";
var spaceLeftImg = "";
//   var spaceRightImg = domRectImg.right + "px";

var PARALLAX_CONFIG = {
  translateDistance: 150, // adjust for distance between items (tighter spring vs longer spring)
  itemClass: 'project', // class representing each item
  incomingTranslateTiming: 1.25, // these two values affect the "springiness" feel
  outgoingTranslateTiming: .75
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
        transform: "translate3d(0, " + PARALLAX_CONFIG.translateDistance + "px, 0)",
        transition: "transform " + PARALLAX_CONFIG.outgoingTranslateTiming + "s"
      });
    } else if (pagePosition > centeredOffset - PARALLAX_CONFIG.verticalBoundSize && pagePosition < centeredOffset + PARALLAX_CONFIG.verticalBoundSize) {
      $(this).css({
        transform: "translate3d(0, 0, 0)",
        transition: "transform " + PARALLAX_CONFIG.incomingTranslateTiming + "s"
      });
    } else {
      $(this).css({
        transform: "translate3d(0, -" + PARALLAX_CONFIG.translateDistance + "px, 0)",
        transition: "transform " + PARALLAX_CONFIG.outgoingTranslateTiming + "s"
      });
    };
  });
};

$(window).scroll(function(e, event) {
  parallaxScroll(e);
});
$(window).scroll();

// Launch Project

var projectIndex = document.querySelector('.project-index');
var launchProject = function(projectId) {
  var $projectPage = $('.project-page[data-project=' + projectId + ']');
  launchedProject = document.querySelector('.project[data-project-id=' + projectId + ']');

  domRect = launchedProject.getBoundingClientRect();

  //Get the offset of the square
  launchedProject = document.querySelector('.project[data-project-id=' + projectId + ']');

  domRect = launchedProject.getBoundingClientRect();
  spaceBelow = domRect.bottom - 40 + "px";
  spaceAbove = domRect.top + "px";
  spaceLeft = domRect.left + "px";
  spaceRight = domRect.right + "px";

  //Get the position of the project's interior image and its height
  launchedProjectImg = document.querySelector('.project[data-project-id=' + projectId + '] .project-image');
  domRectImg = launchedProjectImg.getBoundingClientRect();
  domRectImgHeight = launchedProjectImg.clientHeight;
  spaceAboveImg = domRectImg.top + "px";
  spaceLeftImg = domRectImg.left + "px";

  // hide project index
  $(projectIndex).removeClass("fadein").addClass("fadeout");
  $('body').addClass('backgrounded');

  setTimeout(function() {
    $projectPage.removeClass("hide").addClass("reveal");

  }, 1000);

};

var closeProject = function(projectId) {
  var $projectPage = $('.project-page[data-project=' + projectId + ']');

  var $projectPageImage = $('.project-page[data-project=' + projectId + '] .project-page-image');
  // show project index
  $(projectIndex).removeClass("fadeout").addClass("fadein");


  // scale image from project index
  var $projectImageFromIndex = $('.project[data-project-id=' + projectId + '] .project-image');

  $projectPage.css({
    clip: "rect(" + spaceAbove + ", " + spaceRight + ", " + spaceBelow + ", " + spaceLeft + " )",
    transition: "all 1s ease-in"
  });

  $projectPageImage.css({left: spaceLeftImg, top: spaceAboveImg, height: domRectImgHeight, width: "1200px", transition: "all 1s ease-in"});

  setTimeout(function() {
    $projectPage.addClass("hide");
    $projectPage.removeAttr("style");
    $projectPageImage.removeAttr("style");
    $('body').removeClass('backgrounded');
  }, 5000);

  // hide project page

};

// Project Page Click Handlers

$('.project').click(function(e) {
  launchProject($(this).data("project-id"));
});

$('.project-page .close').click(function(e) {
  closeProject($(this).parents('.project-page').data("project"));
});

$('.project').hover(function() {
  $(projectIndex).addClass('border-reveal');
}, function() {
  $(projectIndex).removeClass('border-reveal');
});
