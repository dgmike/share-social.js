$(function(){
    
  jQuery.fn.vglShare = function(settings) {
    var config = {
      'action' : 'create',
      'share': {
        'gplus'     : '<a class="gplus" href="https://plus.google.com/share?url=[#link#]" target="_blank"><span>g+</span></a>',
        'twitter'   : '<a class="tw" href="https://twitter.com/share?url=[#link#]" target="_blank"><span>twitter</span></a>',
        'facebook'  : '<a class="fb" href="http://www.facebook.com/sharer.php?u=[#link#]&amp;src=sp" target="_blank">Facebook</a>',
        'pinterest' : '<a class="pin-it-button" href="http://pinterest.com/pin/create/button/?url=[#link#]&media=[#linkMedia#]" target="_blank">pinterest</a>',
        // 'sendmail'  : '<a class="sendmail" onclick="openSendMail(\'[#link#]\')" href="http://www.addtoany.com/add_to/email?linkurl=[#link#]&type=page" target="_blank">E-mail</a>'
        'sendmail'  : '<a class="sendmail" href="http://www.addthis.com/tellfriend.php?lng=es&url=[#link#]" target="_blank">E-mail</a>'
      },
      'lower'       : ['gplus', 'twitter', 'facebook'],
      'bigger'      : ['gplus', 'twitter', 'pinterest', 'facebook', 'sendmail'],
      'wrap'        : '<div class="share_circle_buttons"></div>',
      'largerWidth' : 250
    };

    if (settings && typeof settings == "string") {
      settings = {
        action: settings
      };
    }
    if (settings) {
      $.extend(config, settings);
    }
    return this.each(function(){
      var image = $(this),
          link,
          shareData = {
            'config'    : config,
            'image'     : image,
            'link'      : image.parents('a').attr('href'),
            'share'     : $(config.wrap).hide()
          }
      ;

$('.gplus,.tw,.fb,.pin-it-button,.sendmail').click(function(ev){
window.open($(this).attr("href"),'share-social','width=600,height=400');
ev.preventDefault();
return false;
})

      if (config.action == "destroy") {
        if (image.data('share')) {
          image.unbind("mouseenter mouseleave");
          image.data('share').share.remove();
          image.removeData('share');
        };
        return;
      };
      if (config.action == "reposition") {
        if (image.data('share')) {
          image.data('share').share
            .css({
              position: 'absolute',
        width: (image.data('share').share.find('a').size() * 28),
              height: 27
            })
            .offset({
              left: (image.offset().left) + (image.width() - image.data('share').share.width()) - 5,
              top: image.offset().top + 5
            });
        }
        return;
      };
      if (image.data("share")) {
        // is still applyed
        return;
      }
      image.data('share', shareData);
      var size = image.width() <= config.largerWidth ? 'lower' : 'bigger';
      for (var i=config[size].length - 1, item; item = config[size][i]; i--) {
        link = config.share[item];
        link = link.replace(/\[\#link\#\]/g, unescape(shareData.link));
        link = link.replace('[#linkMedia#]', unescape(image.attr('src').replace(/-\.*.jpg/, '.jpg')));
        shareData.share.append(link);
      };
      $('body').append(shareData.share);
      image.vglShare("reposition");
      shareData.share.contents().andSelf().add(image).hover(function(){
          image.data("share").share.show();
          image.vglShare("reposition");
        }, function(event){
          var setOfElements = image.data('share').share.contents().andSelf().add(image);
          if (!$(event.relatedTarget).is(setOfElements)) {
            image.data("share").share.hide();
          };
        }
      );
    });
  }
  
  // auto activate
  $('.share_on_img').vglShare();
  
});
