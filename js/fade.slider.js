//******************************
// Fade slider v:1.1, 2013, jQuery plugin
// Creater: Egor Podgaiski, http://gorik.name/
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
// I Am ...
//******************************
(function($){
    $.fn.fadeRotate = function(args){

        var settings = $.extend({
            auto : true, // Enable auto animation;
            duration : 500, // Effect duration;
            autoDuration : 1300, // Effect duration for autoslide;
            startTime : 5000, // Time for begin effect;
            smalControls : true, // Show, or hide small controls
            hash : null // hash now is not use;
        }, args);

        return this.each(function(globalIndex){

            var box = $(this),
                items = box.find('li'),
                itemsTotal = items.length,
                auto = settings.auto,
                duration = settings.duration,
                autoDuration = settings.autoDuration,
                startTime = settings.startTime,
                smalControls = settings.smalControls,
                hash = settings.hash,
                isStop = false,
                in_progress = [],
                moverBox = box.find('.rorator_move'),
                mover = null,
                timeSHide = null;

            function runSlider(box, duration){
                var currentItem = {},
                    nexItem = {};

                if (itemsTotal < 2) return;

                items.each(function(index, el) {
                    var li = $(el);

                    if (li.is(':visible')){
                        currentItem = li;
                        if (index == (itemsTotal-1)){ nexItem = items.first(); }
                        else{ nexItem = li.next() }
                    }
                });

                currentItem.fadeOut(autoDuration);
                nexItem.fadeIn(autoDuration);

                moverBox.find('.mover[data-slide-id="'+ nexItem.attr("id") +'"]').addClass('sel').siblings().removeClass('sel');
                box.trigger('roratorChanged');

                if(!isStop){
                    timeSHide = setTimeout(function(){
                        runSlider(box, duration)
                    },startTime);
                }
            };

            if (box.length){

                if(items.length < 2){
                    box.find('.rotator_nav').hide();
                    moverBox.hide();
                    return;
                }

                items.css({'position':'absolute','display':'none', top:0, left:0});

                if (hash == null){
                    items.first().show();
                }

                if (smalControls){
                    mover = $('<span/>',{
                        'class':'mover',
                        'data-slide-id':''
                    })
                    moverBox.show();
                    items.each(function(index, el) {
                        var li = $(el);

                        if (!li.attr('id')){
                            li.attr('id', 'js_fadeRotate_' + globalIndex + '_slide_' + index);
                        }

                        moverApp = mover.clone();

                        if (li.is(':visible')){ moverApp.addClass('sel') }
                        moverApp.attr('data-slide-id', li.attr('id'));
                        moverBox.append(moverApp);
                    });
                    mover = null;
                }
                else{
                    moverBox.hide();
                }

                if(duration <= 0){
                    duration = 1;
                }

                if (auto){

                box.on({
                    mouseenter: function(){
                        timeSHide = clearTimeout(timeSHide);
                    },
                    mouseleave: function(){
                        if( (typeof timeSHide == 'undefined') && !isStop ){
                             timeSHide = setTimeout(function(){
                                runSlider(box, duration)
                            }, startTime);
                        }
                    }
                });

                if(!isStop && (hash == null)){
                    timeSHide = setTimeout(function() { runSlider(box, duration) }, startTime);
                }
                }

                box.find('.rorator_move .mover').on({
                    mouseover: function(){
                        var el = $(this),
                            trgtId = el.attr('data-slide-id'),
                            currentEl = box.find('li:visible'),
                            nexItem = $('#'+trgtId);

                        if (in_progress.length){
                             while(in_progress.length){
                                in_progress.shift().stop(true,true);
                             }
                        }

                        timeSHide = clearTimeout(timeSHide);

                        if (currentEl.attr('id') != trgtId){
                            el.addClass('sel').siblings().removeClass('sel');
                            in_progress.push(currentEl);
                            currentEl.fadeOut(duration);
                            in_progress.push(nexItem);
                            nexItem.fadeIn(duration);
                            box.trigger('roratorChanged');
                        }
                    }
                });

                box.find('.rotator_nav').on('click', function(){
                    var btn = $(this);
                        nexItem = {},
                        currentEl = {},
                        counter = 0;

                    if (in_progress.length){
                        while (in_progress.length){
                            in_progress.shift().stop(true,true);
                         }
                    }

                    timeSHide = clearTimeout(timeSHide);

                    if (btn.hasClass('right')){
                        items.each(function(index, el){
                            var li = $(el);

                            if (li.is(':visible')){
                                if (index == (itemsTotal-1)){
                                    nexItem = items.first();
                                }
                                else{
                                    nexItem = li.next();
                                }
                                currentEl = li;
                            }
                         });
                    }

                    if (btn.hasClass('left')){
                        items.each(function(index, el){
                            var li = $(el);

                            counter++;
                            if (li.is(':visible')){
                                if (counter == 1){
                                    nexItem = items.last();
                                }
                                else{
                                    nexItem = li.prev();
                                }
                                currentEl = li;
                            }
                         });
                    }

                    moverBox.find('.mover[data-slide-id="'+ nexItem.attr("id") +'"]').addClass('sel').siblings().removeClass('sel');
                    in_progress.push(currentEl);
                    currentEl.fadeOut(duration);
                    in_progress.push(nexItem);
                    nexItem.fadeIn(duration);
                    box.trigger('roratorChanged');
                });
             }
        });
    };
})(jQuery);