import GameLandingPage from "../components/GameLandingPage";

export const metadata = {
  title: "Multiplication Balloon Pop Game – Free Online Math Learning",
  description: "Master multiplication tables and mental math tricks with our interactive online multiplication balloon pop game.",
};

const seoCopy = `
  <h2>Interactive Multiplication Balloon Challenge</h2>
  <p>Say goodbye to boring multiplication charts! Our free online multiplication balloon pop game helps children learn times tables from 1 to 12 through playful gamification loops. Popping balloons containing correct answers speeds up multiplication memory recall instantly.</p>
  
  <h3>Improve Multiplication Tables Recall</h3>
  <p>Repetitive gameplay reinforces correct math associations. The game introduces structured problem sequences that encourage players to skip-count and visualize factors, strengthening multiplication math logic.</p>
`;

const faqs = [
  { q: "Is this suitable for Grade 3 multiplication?", a: "Yes, our engine adjusts automatically to introduce factors up to 12 for Grade 3-5 students." },
];

export default function Page() {
  return (
    <GameLandingPage 
      title="Multiplication Balloon Game"
      h1="Free Online Multiplication Balloon Pop Game"
      description="Practice multiplication times tables online. Pop the floating target balloons with correct numbers to score points!"
      gameMode="multiplication"
      difficulty="medium"
      seoCopy={seoCopy}
      faqs={faqs}
    />
  );
}
