import GameLandingPage from "../components/GameLandingPage";

export const metadata = {
  title: "Subtraction Balloon Pop Game – Free Online Math Learning",
  description: "Improve subtraction and mental calculation math skills with our interactive online subtraction balloon pop game. Ideal for school grades K-4.",
};

const seoCopy = `
  <h2>Interactive Subtraction Balloon Games</h2>
  <p>Learn subtraction logic with this free online math game portal! Pop the target subtraction balloons floating up to verify mathematical calculations. Our educational portal leverages modern game loops to make mathematics and mental calculations rewarding and stress-free.</p>
  
  <h3>Mental Subtraction Tricks</h3>
  <p>Rather than using rote memorization, BalloonVerse teaches children subtraction by visualizing the difference. Players learn simple subtraction equations, finding missing variables, and managing negative numbers. This makes subtraction intuitive and easy to digest for elementary students of all ages.</p>
`;

const faqs = [
  { q: "How does subtraction balloon game work?", a: "Match the subtraction problem displayed with the correct floating balloon to pop it and gain points." },
  { q: "Can teachers use it in classrooms?", a: "Yes, our games run offline and are ideal for interactive classroom displays." },
];

export default function Page() {
  return (
    <GameLandingPage 
      title="Subtraction Balloon Game"
      h1="Free Online Subtraction Balloon Pop Game"
      description="Practice subtraction equations online. Pop the floating target balloons with correct numbers to score points!"
      gameMode="subtraction"
      difficulty="easy"
      seoCopy={seoCopy}
      faqs={faqs}
    />
  );
}
