(function ($) {

Drupal.janrainCapture = {
  closeProfileEditor: function() {
    window.location.href = Drupal.settings.janrainCapture.profile_sync_url;
  },
  closeRecoverPassword: function() {
    window.location.reload();
  },
  token_expired: function() {
    window.location.href = Drupal.settings.janrainCapture.token_expired_url;
  },
  bp_ready: function() {
    if (typeof(Backplane) != 'undefined') {
      var channelId = encodeURIComponent(Backplane.getChannelID());
      $("a.janrain_capture_signin").each(function(){
        $(this).attr("href", $(this).attr("href") + "&bp_channel=" + channelId).click(function(){
          Backplane.expectMessages("identity/login");
        });
      });
    }
  },
  logout: function() {
    if (typeof(Drupal.settings.janrainCapture.sso_address) != 'undefined') {
      JANRAIN.SSO.CAPTURE.logout({
        sso_server: "https://" + Drupal.settings.janrainCapture.sso_address,
        logout_uri: Drupal.settings.janrainCapture.logout_url
      });
    }
  }
};

Drupal.janrainCapture.prototype = {
  passwordRecover: function(url) {
    // Placeholder to be overwritten by the CaptureUI Module
  },
  resize: function(jargs) {
    // Placeholder to be overwritten by the CaptureUI Module
  }
}

Drupal.behaviors.janrainCapture = {
  attach: function(context, settings) {
    if (typeof(settings.janrainCapture.backplane_server) != 'undefined'
      && typeof(settings.janrainCapture.backplane_bus_name) != 'undefined') {
      Backplane(CAPTURE.bp_ready);
      Backplane.init({
        serverBaseURL: settings.janrainCapture.backplane_server,
        busName: settings.janrainCapture.backplane_bus_name
      });
    }
    window.CAPTURE = Drupal.janrainCapture;
  }
};

})(jQuery);