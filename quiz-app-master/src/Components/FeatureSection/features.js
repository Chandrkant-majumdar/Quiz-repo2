import "../../css/Features-Clean.css";
import "../../fonts/font-awesome.min.css";
import "../../fonts/font-awesome.min.css";
import "../../fonts/fontawesome-webfont.eot";
import "../../fonts/fontawesome-webfont.svg";
import "../../fonts/fontawesome-webfont.ttf";
import "../../fonts/fontawesome-webfont.woff";
import "../../fonts/fontawesome-webfont.woff2";
import "../../fonts/FontAwesome.otf";

function Features(props) {
  return (
    <section class="features-clean">
      <div class="container">
        <div class="intro">
          <h2 class="text-center">Features</h2>
          <p class="text-center">
            Elevate your learning experience with our innovative online quiz
            platform. Discover the features that make learning engaging and
            effective.
          </p>
        </div>
        <div class="row features">
          <div class="col-sm-6 col-lg-4 item">
            <i class="fa fa-globe icon"></i>
            <h3 class="name">Global Reach</h3>
            <p class="description">
              Access quizzes anytime, anywhere. Our platform ensures seamless
              learning experiences across the globe.
            </p>
          </div>
          <div class="col-sm-6 col-lg-4 item">
            <i class="fa fa-clock-o icon"></i>
            <h3 class="name">24/7 Availability</h3>
            <p class="description">
              Engage with quizzes at your convenience. Our platform is available
              round the clock, empowering continuous learning.
            </p>
          </div>
          <div class="col-sm-6 col-lg-4 item">
            <i class="fa fa-cogs icon"></i>
            <h3 class="name">Customizable Quizzes</h3>
            <p class="description">
              Tailor quizzes to your learning objectives. Customize quiz
              settings and content to suit your educational needs.
            </p>
          </div>
          <div class="col-sm-6 col-lg-4 item">
            <i class="fa fa-rocket icon"></i>
            <h3 class="name">Interactive Learning</h3>
            <p class="description">
              Experience interactive learning like never before. Engage with
              multimedia elements and interactive questions.
            </p>
          </div>
          <div class="col-sm-6 col-lg-4 item">
            <i class="fa fa-lightbulb-o icon"></i>
            <h3 class="name">Innovative Assessments</h3>
            <p class="description">
              Foster critical thinking and problem-solving skills. Our platform
              offers innovative assessment formats to enhance learning outcomes.
            </p>
          </div>
          <div class="col-sm-6 col-lg-4 item">
            <i class="fa fa-users icon"></i>
            <h3 class="name">Collaborative Learning</h3>
            <p class="description">
              Foster collaboration and peer-to-peer learning. Engage in group
              quizzes and discussions to deepen understanding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
