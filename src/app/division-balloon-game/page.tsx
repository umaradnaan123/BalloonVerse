import GameLandingPage from "../components/GameLandingPage";

export const metadata = {
  title: "Division Balloon Pop Game – Free Online Math Learning",
  description: "Learn division concepts and practice calculations with our interactive online division balloon pop game.",
};

const seoCopy = `
  <h2>Interactive Division Balloon Adventure</h2>
  <p>Practice division and understand fractions with this free online math game portal! By matching division problems to correct floating balloons, kids learn division structures, remainders, and inverse multiplication relationships.</p>
  
  <h3>Inverse Multiplication & Division Strategy</h3>
  <p>The division engine designs questions that prompt students to identify reverse multiplications. This bridges division knowledge gaps and builds deep mathematical confidence.</p>
`;

const faqs = [
  { q: "Which division topics are covered?", a: "The game covers basic integers division, division tables up to 10, and quotients." },
];

export default function Page() {
  return (
    <GameLandingPage 
      title="Division Balloon Game"
      h1="Free Online Division Balloon Pop Game"
      description="Practice division equations online. Pop the floating target balloons with correct numbers to score points!"
      gameMode="division"
      difficulty="medium"
      seoCopy={seoCopy}
      faqs={faqs}
    />
  );
}
