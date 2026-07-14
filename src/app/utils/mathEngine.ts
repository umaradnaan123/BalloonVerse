import { DifficultyLevel, GameMode } from "../store/store";

export interface MathQuestion {
  question: string;
  correctAnswer: number;
  options: number[];
  category: string;
  explanation: string;
}

// Generate random number between min and max inclusive
const rand = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generates correct answer and three distractor answers
const makeOptions = (answer: number): number[] => {
  const opts = new Set<number>();
  opts.add(answer);

  // Generate three relative distractors
  while (opts.size < 4) {
    const deviation = rand(-5, 5);
    const distractor = answer + (deviation === 0 ? 3 : deviation);
    // Keep answers within reasonable bounds if the original was non-negative
    if (answer >= 0 && distractor < 0) continue;
    opts.add(distractor);
  }

  // Shuffle option array
  return Array.from(opts).sort(() => Math.random() - 0.5);
};

export const generateQuestion = (
  mode: GameMode,
  difficulty: DifficultyLevel
): MathQuestion => {
  let a = 0;
  let b = 0;
  let question = "";
  let correctAnswer = 0;
  let category = "Arithmetic";
  let explanation = "";

  // Difficulty multiplier setups
  let min = 1;
  let max = 10;

  switch (difficulty) {
    case "very-easy":
      min = 1;
      max = 6;
      break;
    case "easy":
      min = 2;
      max = 12;
      break;
    case "medium":
      min = 5;
      max = 25;
      break;
    case "hard":
      min = 10;
      max = 60;
      break;
    case "expert":
      min = 20;
      max = 120;
      break;
    case "genius":
      min = 50;
      max = 500;
      break;
  }

  // Mixed mode router
  let activeMode = mode;
  if (mode === "mixed" || mode === "time-attack" || mode === "endless" || mode === "challenge" || mode === "speed" || mode === "boss") {
    const modes: GameMode[] = ["addition", "subtraction", "multiplication", "division"];
    activeMode = modes[rand(0, 3)];
  }

  // Special Kids Mode override
  if (mode === "kids") {
    activeMode = rand(0, 1) === 0 ? "addition" : "subtraction";
    min = 1;
    max = 8;
  }

  // Custom question generators
  if (activeMode === "addition") {
    a = rand(min, max);
    b = rand(min, max);
    
    // Choose standard or missing number type randomly
    if (rand(0, 1) === 0 || difficulty === "very-easy") {
      question = `${a} + ${b} = ?`;
      correctAnswer = a + b;
      explanation = `To find the sum of ${a} and ${b}, count up from ${a} by ${b} steps. ${a} plus ${b} equals ${correctAnswer}.`;
    } else {
      correctAnswer = b;
      question = `${a} + ? = ${a + b}`;
      explanation = `To find the missing value in the equation ${a} + ? = ${a + b}, subtract ${a} from ${a + b}. The answer is ${correctAnswer}.`;
    }
    category = "Addition";
  } else if (activeMode === "subtraction") {
    const val1 = rand(min, max);
    const val2 = rand(min, max);
    a = Math.max(val1, val2);
    b = Math.min(val1, val2);

    if (rand(0, 1) === 0 || difficulty === "very-easy") {
      question = `${a} - ${b} = ?`;
      correctAnswer = a - b;
      explanation = `Subtracting ${b} from ${a} leaves ${correctAnswer}.`;
    } else {
      correctAnswer = b;
      question = `${a} - ? = ${a - b}`;
      explanation = `To find what value to subtract from ${a} to get ${a - b}, solve for the difference: ${a} - ${a - b} = ${correctAnswer}.`;
    }
    category = "Subtraction";
  } else if (activeMode === "multiplication") {
    // scale factor smaller for multiplication so numbers don't explode
    const multMin = Math.max(1, Math.floor(min / 2));
    const multMax = Math.max(5, Math.floor(max / 2));
    a = rand(multMin, multMax);
    b = rand(multMin, 12);

    question = `${a} × ${b} = ?`;
    correctAnswer = a * b;
    explanation = `${a} multiplied by ${b} means adding ${a} to itself ${b} times. ${a} × ${b} = ${correctAnswer}.`;
    category = "Multiplication";
  } else if (activeMode === "division") {
    const multMin = Math.max(1, Math.floor(min / 2));
    const multMax = Math.max(5, Math.floor(max / 2));
    b = rand(multMin, 10);
    correctAnswer = rand(1, multMax);
    a = b * correctAnswer; // guarantees clean division

    question = `${a} ÷ ${b} = ?`;
    explanation = `To divide ${a} into ${b} equal parts, we get ${correctAnswer} in each group. Because ${correctAnswer} × ${b} = ${a}.`;
    category = "Division";
  }

  // Fallback check
  if (!question) {
    question = "5 + 5 = ?";
    correctAnswer = 10;
    explanation = "5 plus 5 equals 10.";
  }

  return {
    question,
    correctAnswer,
    options: makeOptions(correctAnswer),
    category,
    explanation,
  };
};
