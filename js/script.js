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

$(window).scroll(function(e, event) {
  parallaxScroll(e);
});
$(window).scroll();

// Launch Project

var projectIndex = document.querySelector('.project-index');
var launchProject = function(projectId) {
    var $projectPage = $('.project-page[data-project=' + projectId + ']');

    // hide project index
    $(projectIndex).removeClass("fadein").addClass("fadeout");
    $('body').addClass('backgrounded');

    // reveal project page
    $projectPage.removeClass("hide").addClass("reveal");
};

var closeProject = function(projectId) {
    var $projectPage = $('.project-page[data-project=' + projectId + ']');

    // show project index
    $(projectIndex).removeClass("fadeout").addClass("fadein");
    $('body').removeClass('backgrounded');

    // reveal project page
    $projectPage.removeClass("reveal").addClass("hide");
};


// Project Page Click Handlers

$('.project').click(function(e) {
    launchProject($(this).data("project-id"));
});

$('.project-page .close').click(function(e) {
    closeProject($(this).parents('.project-page').data("project"));
});

// Misc

function closeProject(el) {
    $(projectSection).addClass("hidden");

    return;

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

// Hover Border Reveal

$('.project').hover(function() {
    $(projectIndex).addClass('border-reveal');
}, function() {
    $(projectIndex).removeClass('border-reveal');
});
