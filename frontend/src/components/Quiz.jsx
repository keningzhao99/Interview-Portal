import React, { useState } from 'react';
import { Box, Button, Radio, RadioGroup, VStack, Heading, Text, Input } from '@chakra-ui/react';

// Quiz data for each lesson
const quizData = {
  0: [
    {
      type: "multiple-choice",
      question: "What is the STAR Method?",
      options: ["Situation, Task, Action, Result", "Situation, Task, Analysis, Result", "Situation, Theory, Action, Result"],
      answer: "Situation, Task, Action, Result",
    },
    {
      type: "multiple-choice",
      question: "Why is the STAR Method useful?",
      options: ["It helps structure your answers", "It confuses the interviewer", "It is a random method"],
      answer: "It helps structure your answers",
    },
    {
      type: "multiple-choice",
      question: "What should you focus on in the 'Action' part of the STAR Method?",
      options: ["The task assigned", "The steps you took", "The result achieved"],
      answer: "The steps you took",
    },
    {
      type: "multiple-choice",
      question: "In the STAR Method, 'Result' refers to?",
      options: ["The context of the task", "The outcome of your actions", "The actions you took"],
      answer: "The outcome of your actions",
    },
    {
      type: "short-answer",
      question: "Describe a situation where you used the STAR Method.",
    },
  ],
  1: [
    {
      type: "short-answer",
      question: "Tell me about yourself.",
    },
    {
      type: "short-answer",
      question: "What are your strengths and weaknesses?",
    },
    {
      type: "multiple-choice",
      question: "Which of these is important when describing your past experience?",
      options: ["Relevance to the job", "Mentioning unrelated hobbies", "Exaggerating achievements"],
      answer: "Relevance to the job",
    },
  ],
  2: [
    {
      type: "short-answer",
      question: "Why are you interested in this role?",
    },
    {
      type: "short-answer",
      question: "Why do you want to work for this company?",
    },
    {
      type: "multiple-choice",
      question: "What should you focus on when answering 'Why this company?'",
      options: ["Company's mission and values", "Company's location", "Company's logo"],
      answer: "Company's mission and values",
    },
  ],
  3: [
    {
      type: "short-answer",
      question: "Tell me about your experience with a relevant skill.",
    },
    {
      type: "short-answer",
      question: "Describe a challenging project you've worked on.",
    },
    {
      type: "multiple-choice",
      question: "What's the best way to discuss your experience?",
      options: ["Highlight relevant skills", "Focus on your first job", "Discuss only your education"],
      answer: "Highlight relevant skills",
    },
  ],
};

const Quiz = ({ lessonId, onComplete }) => {
  const quizQuestions = quizData[lessonId];
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (value, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = quizQuestions.reduce((acc, question, index) => {
      if (question.type === "multiple-choice" && question.answer === answers[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const totalMultipleChoiceQuestions = quizQuestions.filter(q => q.type === "multiple-choice").length;
    const score = (correctAnswers / totalMultipleChoiceQuestions) * 100;
    setScore(score);
    setSubmitted(true);

    if (score >= 80) {
      onComplete(true); // Notify parent that the quiz is passed
    }
  };

  const handleRestart = () => {
    setAnswers(Array(quizQuestions.length).fill(''));
    setSubmitted(false);
    setScore(0);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Heading as="h3" size="lg" mb={4}>Quiz</Heading>
      {quizQuestions.map((question, index) => (
        <Box key={index} mb={4}>
          <Text mb={2}>{question.question}</Text>
          {question.type === "multiple-choice" ? (
            <RadioGroup onChange={(value) => handleChange(value, index)} value={answers[index]}>
              <VStack align="flex-start">
                {question.options.map((option, idx) => (
                  <Radio key={idx} value={option}>{option}</Radio>
                ))}
              </VStack>
            </RadioGroup>
          ) : (
            <Input
              placeholder="Your answer"
              value={answers[index]}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          )}
        </Box>
      ))}
      <Button colorScheme="purple" onClick={handleSubmit} isDisabled={submitted}>
        Submit
      </Button>
      {submitted && (
        <Box mt={4}>
          {score >= 80 ? (
            <Text color="green.500">You passed!</Text>
          ) : (
            <Text color="red.500">You failed. Please try again.</Text>
          )}
          {score < 80 && (
            <Button mt={2} colorScheme="blue" onClick={handleRestart}>
              Restart Quiz
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
