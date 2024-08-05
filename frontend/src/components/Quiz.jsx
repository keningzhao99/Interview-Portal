import React, { useState } from 'react';
import { Box, Button, Radio, RadioGroup, VStack, Heading, Text } from '@chakra-ui/react';

const quizQuestions = [
  {
    question: "What is the STAR Method?",
    options: ["Situation, Task, Action, Result", "Situation, Task, Analysis, Result", "Situation, Theory, Action, Result"],
    answer: "Situation, Task, Action, Result",
  },
  {
    question: "Why is the STAR Method useful?",
    options: ["It helps structure your answers", "It confuses the interviewer", "It is a random method"],
    answer: "It helps structure your answers",
  },
  {
    question: "What should you focus on in the 'Action' part of the STAR Method?",
    options: ["The task assigned", "The steps you took", "The result achieved"],
    answer: "The steps you took",
  },
  {
    question: "In the STAR Method, 'Result' refers to?",
    options: ["The context of the task", "The outcome of your actions", "The actions you took"],
    answer: "The outcome of your actions",
  },
  {
    question: "Which part of STAR outlines the background?",
    options: ["Situation", "Action", "Result"],
    answer: "Situation",
  },
];

const Quiz = ({ onComplete }) => {
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
      return question.answer === answers[index] ? acc + 1 : acc;
    }, 0);
    const score = (correctAnswers / quizQuestions.length) * 100;
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
          <RadioGroup onChange={(value) => handleChange(value, index)} value={answers[index]}>
            <VStack align="flex-start">
              {question.options.map((option, idx) => (
                <Radio key={idx} value={option}>{option}</Radio>
              ))}
            </VStack>
          </RadioGroup>
        </Box>
      ))}
      <Button colorScheme="purple" onClick={handleSubmit} isDisabled={submitted}>
        Submit
      </Button>
      {submitted && (
        <Box mt={4}>
          <Text color={score >= 80 ? 'green.500' : 'red.500'}>
            {score >= 80 ? 'You passed!' : 'You failed. Please try again.'}
          </Text>
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
