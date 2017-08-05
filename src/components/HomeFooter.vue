<template>
  <footer class="g-bg-color--dark">
    <!-- Links -->
    <div class="g-hor-divider__dashed--white-opacity-lightest">
      <div class="container g-padding-y-80--xs">
        <div class="row">
          <div class="col-sm-3 g-margin-b-20--xs g-margin-b-0--md">
            <ul class="list-unstyled g-ul-li-tb-5--xs g-margin-b-0--xs">
              <li><a class="g-font-size-15--xs g-color--white-opacity trackData" data-name="homePage">Home</a></li>
              <li><a class="g-font-size-15--xs g-color--white-opacity trackData" data-name="homeCareers">Careers</a></li>
              <li><a class="g-font-size-15--xs g-color--white-opacity trackData" data-name="homeContact">Contact</a></li>
            </ul>
          </div>
          <div class="col-sm-3 g-margin-b-40--xs g-margin-b-0--md">
            <ul class="list-unstyled g-ul-li-tb-5--xs g-margin-b-0--xs">
              <li><a class="g-font-size-15--xs g-color--white-opacity trackData" data-name="homePrivacyPolicy" href="privacy-policy.html">Privacy Policy</a></li>
              <li><a class="g-font-size-15--xs g-color--white-opacity trackData" data-name="homeTnC" href="terms-of-service.html">Terms &amp; Conditions</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-md-offset-2 col-sm-5 col-sm-offset-1 s-footer__logo g-padding-y-50--xs g-padding-y-0--md">
            <h3 class="g-font-size-18--xs g-color--white">Flinkhub</h3>
            <p class="g-color--white-opacity">Flinkhub is a platform where you can simply integrate top products and services across the world which are essential for your business growth.
            </p>
            <div id="social-icons" class="">
              <a target="_blank" class="trackData" data-name="homefacebookLink" href="https://www.facebook.com/flinkhub"><img src="https://flinkhub.com/img/socialIcons/Facebook-Icon.svg" alt="Facebook - Flinkhub"></a>
              <a target="_blank" class="trackData" data-name="hometwitterLink" href="https://twitter.com/flinkhub"><img src="https://flinkhub.com/img/socialIcons/Twitter-Icon.svg" alt="Twitter - Flinkhub"></a>
              <!--<a target="_blank" class="trackData" data-name="homeLinkedinLink">
                  <script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
                  <script type="IN/CompanyProfile" data-id="1337" data-format="hover" data-related="false" data-text="LinkedIn"></script>
              </a>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Links -->

    <!-- Copyright -->
    <div class="container g-padding-y-50--xs">
      <div class="row">
        <div class="col-xs-6">
          <a href="index.html">
            <img class="g-width-100--xs g-height-auto--xs" src="https://storage.googleapis.com/flinkhub-logo/flinkhub_white.png" alt="Flinkhub Logo">
          </a>
        </div>
        <div class="col-xs-6 g-text-right--xs">
          <p class="g-font-size-14--xs g-margin-b-0--xs g-color--white-opacity-light">© 2017 Flinkhub Inc. All Rights Reserved.</p>
        </div>
      </div>
    </div>
    <!-- End Copyright -->
  </footer>
</template>

<script>
  export default {
    name: 'homeFooter'
  }
</script>
