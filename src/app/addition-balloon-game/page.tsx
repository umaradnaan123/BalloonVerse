import GameLandingPage from "../components/GameLandingPage";

export const metadata = {
  title: "Addition Balloon Pop Game – Free Online Math Learning",
  description: "Practice addition skills with our interactive online addition balloon pop game. Tap floating balloons containing correct answers to win! Ideal for Grades K-4.",
};

const seoCopy = `
  <h2>Interactive Addition Balloon Games</h2>
  <p>Practice addition with this engaging, free online math balloon pop game. Children learn by matching the addition equations to the corresponding floating target answer balloon. This interactive model is designed to support the visual-spatial development and reflex capabilities of students learning math basics.</p>
  
  <h3>Mental Addition Strategy & Skills</h3>
  <p>Our educational gaming portal incorporates modern math methods that help learners visualize operations. Instead of standard worksheets, kids use these virtual cards as interactive flashcards. This allows them to master standard single-digit addition, double-digit carryovers, and algebraic missing numbers. By practice of standard math combinations regularly, students learn to calculate fast mental equations, reinforcing standard primary curriculum guidelines.</p>

  <h3>Perfect for Kindergarten to Grade 4</h3>
  <p>The addition engine generates problems adaptively. Whether your child is just starting kindergarten or practicing double-digit addition in Grade 3, BalloonVerse automatically scales difficulty to match. This adaptive tracking system guides kids smoothly along their learning path while ensuring a fun, zero-pressure atmosphere.</p>
`;

const faqs = [
  { q: "How do I play the addition balloon game?", a: "An addition question appears on screen. Pop the balloon with the correct math sum to score points and build your combo streak!" },
  { q: "Is registration needed?", a: "No, all interactive math games on BalloonVerse are free to access without signing up." },
];

export default function Page() {
  return (
    <GameLandingPage 
      title="Addition Balloon Game"
      h1="Free Online Addition Balloon Pop Game"
      description="Practice addition equations online. Pop the floating target balloons with correct numbers to score points!"
      gameMode="addition"
      difficulty="easy"
      seoCopy={seoCopy}
      faqs={faqs}
    />
  );
}
