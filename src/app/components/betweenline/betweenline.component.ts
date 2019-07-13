import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-betweenline',
  templateUrl: './betweenline.component.html',
  styleUrls: ['./betweenline.component.css']
})
export class BetweenlineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var ZoomPager = function(elem, animateScaling) {
      var pages = elem.find('.zoom-pager__page');
      var activeIndex = 0;
      var scrollDistance = 1000; //tells how much to scroll between pages
      var slackDistance = 200; //The distance a page can be active before it starts to animate away.
      var scrolledDistance = 0; //holds the currently scrolled distance.

      var activeElem, prevElem, nextElem;

      var updateActivePage = function() {
        //Reset all pages
        pages.css('opacity', 0);
        pages.removeClass('active next prev');

        //Set active class on the active index and set active pages to opactity 1
        activeElem = $(pages[activeIndex]);
        activeElem.addClass('active');
        activeElem.css('opacity', 1);

        //set the next and prev pages
        nextElem = $(pages[activeIndex + 1]);
        prevElem = $(pages[activeIndex - 1]);
        nextElem.addClass('next');
        prevElem.addClass('prev');
      };

      /*
        This function sets all the properties that are animated.
      */
      var animate = function(animationElem, progress, forwardDirection) {
        var opacityValue = forwardDirection ? 1 - progress : progress;
        animationElem.css('opacity', opacityValue);

        if (animateScaling) {
          var scaleValue = forwardDirection ? 1 + (0.25 * progress) : 0.75 + (0.25 * progress);
          animationElem.css('transform', 'scale(' + scaleValue + ')');
        }


      };

      var initialize = function() {
        updateActivePage();

        //set the height of the page to the scrollDistance * pages.length.
        //This will enable the user to scroll that exact distance.
        elem.height(scrollDistance * pages.length);
      };

      initialize();

      var onScroll = function(e) {
        //Determine if a new index should be set as active
        var newActiveIndex = Math.floor(window.scrollY / scrollDistance);
        if (newActiveIndex !== activeIndex) {
          activeIndex = newActiveIndex;
          updateActivePage();
        }

        //calculate animation progress
        var progress = window.scrollY % 1000;
        var animationProgress = Math.max(0, progress - slackDistance) / (scrollDistance - slackDistance);
        var forwardAnimation = window.scrollY > scrolledDistance;
        scrolledDistance = window.scrollY;

        animate(activeElem, animationProgress, true);
        animate(nextElem, animationProgress, false);

        //Animate either next or prev element depending on the scroll direction
        /*if (forwardAnimation) {
          animate(nextElem, animationProgress, !forwardAnimation);
        } else {
          animate(prevElem, animationProgress, !forwardAnimation);
        }*/

        console.log('on scroll', window.scrollY, activeIndex, progress, animationProgress);
      };

      $(window).scroll(onScroll);
    };



    $(function() {
      'use strict';

      var zoomPager = new ZoomPager($('.zoom-pager'), true);
    });

  }

}
