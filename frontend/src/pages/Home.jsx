import Hero_section from "../components/Home/Hero_section.jsx";
import Practice_areas from "../components/Home/Practice_areas.jsx";
import WhyChooseUs from "../components/Home/Why_to_choose.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import CTASection from "../components/Home/CTAsection.jsx";
import OurStory from "../components/Home/OurStory.jsx";
import InteractiveTools from "../components/Home/InteractiveTools.jsx";
import Meet_our_team from "../components/Home/Meet_our_team.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Hero_section />
      <OurStory />
      <Practice_areas />
      <WhyChooseUs />
      <Meet_our_team />
      <Testimonials />
      <InteractiveTools />
      <CTASection />
    </div>
  );
};

export default Home;