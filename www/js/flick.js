// This is a JavaScript file
$(function () {
    var $setMainId = $('#flickscroll');
    var $setThumbId = $('#flickthumb');
    var scrollSpeed = 300;

    var $setMainUl = $setMainId.children('ul'),
        $setThumbUl = $setThumbId.children('ul'),
        $setThumbLi = $setThumbUl.children('li'),
        $setThumbLiFirst = $setThumbUl.children('li:first'),
        listWidth = parseInt($setMainUl.children('li').css('width')),
        listCount = $setMainUl.children('li').length,
        leftMax = -((listWidth) * ((listCount) - 1));

    $setMainUl.each(function () {
        $(this).css({ width: (listWidth) * (listCount) });
    });

    var isTouch = ('ontouchstart' in window);
    $setMainUl.bind(
        {
            'touchstart mousedown': function (e) {
                var $setMainUlNot = $setMainId.children('ul:not(:animated)');
                $setMainUlNot.each(function () {
                    e.preventDefault();
                    this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
                    this.leftBegin = parseInt($(this).css('left'));
                    this.left = parseInt($(this).css('left'));
                    this.touched = true;
                });
            }, 'touchmove mousemove': function (e) {
                if (!this.touched) {
                    return;
                }
                e.preventDefault();
                this.left = this.left - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX));
                this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);

                if (this.left < 0 && this.left > leftMax) {
                    $(this).css({ left: this.left });
                } else if (this.left >= 0) {
                    $(this).css({ left: '0' });
                } else if (this.left <= leftMax) {
                    $(this).css({ left: (leftMax) });
                }
            }, 'touchend mouseup mouseout': function (e) {
                if (!this.touched) {
                    return;
                }
                this.touched = false;

                var $setThumbLiActive = $setThumbUl.children('li.active');

                if (this.leftBegin > this.left && (!((this.leftBegin) === (leftMax)))) {
                    $(this).stop().animate({ left: ((this.leftBegin) - (listWidth)) }, scrollSpeed);
                    $setThumbLiActive.each(function () {
                        $(this).removeClass('active');
                        $(this).next().addClass('active');
                    });
                } else if (this.leftBegin < this.left && (!((this.leftBegin) === 0))) {
                    $(this).stop().animate({ left: ((this.leftBegin) + (listWidth)) }, scrollSpeed);
                    $setThumbLiActive.each(function () {
                        $(this).removeClass('active');
                        $(this).prev().addClass('active');
                    });
                } else if (this.leftBegin === 0) {
                    $(this).css({ left: '0' });
                } else if (this.leftBegin <= leftMax) {
                    $(this).css({ left: (leftMax) });
                }
            }
        });

    $setThumbLi.click(function () {
        var connectCont = $setThumbLi.index(this);
        $setMainUl.stop().animate({ left: (-(listWidth) * (connectCont)) }, scrollSpeed);
        $setThumbLi.removeClass('active');
        $(this).addClass('active');
    });

    $setThumbLiFirst.addClass('active');
    $setThumbLi.css({ opacity: '0.5' });

    var agent = navigator.userAgent;
    if (!(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1)) {
        $setThumbLi.hover(function () {
            $(this).stop().animate({ opacity: '1' }, 300);
        }, function () {
            $(this).stop().animate({ opacity: '0.5' }, 300);
        });
    }
});
