import "./hero.css";
export default function Hero() {
  return (
    <div>
      <section>
        <div className="hero-container">

          <div className="hero-background">
            <span className="circle blue top-left"></span>
            <span className="circle red middle-left"></span>
            <span className="dots white middle-top"></span>
            <span className="dots red bottom-left"></span>
            <span className="circle blue top-right"></span>
          </div>


          <div className="hero-text">
            <h1 className="hero-title">
              Make your dream 
              <br/>
              business goal come true </h1>
            <p className="hero-description">
            when you need us to improve your business, <br />
            then come to us and we’ll help you achieve your goals. Just sit back and watch it happen.
            </p>

            <button className="btn-primary">Get Started</button>
          </div>

          <div className="hero-image">
            <img src="/hero.jpg" alt="Team Working" />
            <div className="project-badge">
              <span className="badge-title">⭐ GREAT PROJECT</span>
              <br />
              <strong className="badge-count">800+ Done</strong>
            </div>

            <div className="testimonial-box">
              <img className="testimonial-avatar" src="/ceo.jpg" alt="Bill Adams" />
              <div className="testimonial-content">
                <div className="testimonial-name">Bill Adams</div>
                <div className="testimonial-role">CEO UpTeach</div>
                <p className="testimonial-text">
                  “ This team is really the best in its field. I don’t regret working with them,
                  and will come back again thanks ”
                </p>
              </div>
            </div>
          </div>
          
          
          


        </div>
      </section>
    </div>
  );
}