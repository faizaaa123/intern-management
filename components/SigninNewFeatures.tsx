import Image from 'next/image';

export default function SigninNewFeatures() {
  return (
    <div className="whats-new-features-container">
      <div className="new-feature-container active">
        <div className="new-feauture-img-container">
          <Image
            className="new-feauture-img active opacity"
            src={require('../app/register/assets/images/new-feature-integration-calender.png')}
            alt="new-feature-image"
          />
        </div>
        <div className="new-feauture-details">
          <div className="whats-new">whats new?</div>
          <h4 className="new-feauture-heading active">Integration Calender</h4>
          <p className="new-feauture-para active">
            Integrat outlook and ms team calender and displays upcoming event
            and schedule multiple events.
          </p>
        </div>
      </div>
      <div className="new-feature-container">
        <div className="new-feauture-img-container">
          <Image
            className="new-feauture-img"
            src={require('../app/register/assets/images/new-feature-individual-reports.png')}
            alt="new-feature-image"
          />
        </div>
        <div className="new-feauture-details">
          <div className="whats-new">whats new?</div>
          <h4 className="new-feauture-heading">Individual Reports</h4>
          <p className="new-feauture-para">
            Supervisors has options to show individual intern’s reports and
            displays upcoming event and schedule multiple events.
          </p>
        </div>
      </div>
      <div className="new-feature-container">
        <div className="new-feauture-img-container">
          <Image
            className="new-feauture-img"
            src={require('../app/register/assets/images/new-feature-live-updates.png')}
            alt="new-feature-image"
          />
        </div>
        <div className="new-feauture-details">
          <div className="whats-new">whats new?</div>
          <h4 className="new-feauture-heading">Live Updates</h4>
          <p className="new-feauture-para">
            Weather intern is working in the office or from home and displays
            upcoming event and schedule multiple events.
          </p>
        </div>
      </div>
      <div className="feauture-hbox-container">
        <span className="hbox active"></span>
        <span className="hbox"></span>
        <span className="hbox"></span>
      </div>
    </div>
  );
}
