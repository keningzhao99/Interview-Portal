import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, Text, Flex, Checkbox, Collapse } from '@chakra-ui/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { lessons } from '../components/lessonData';
import Quiz from '../components/Quiz';
import '../styles/LessonDetail.css';

export const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompletedTasks = location.state?.completedTasks || Array(lessons[lessonId].tasks.length).fill(false);
  const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks);
  const [showSlide, setShowSlide] = useState(Array(lessons[lessonId].tasks.length).fill(false));
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(completedTasks[lessons[lessonId].tasks.length - 1]);

  const toggleTask = (index) => {
    if (index === 0 || completedTasks.slice(0, index).every(task => task)) {
      const updatedTasks = [...completedTasks];
      updatedTasks[index] = !updatedTasks[index];
      setCompletedTasks(updatedTasks);
      saveProgress(lessonId, updatedTasks);
    }
  };

  const handleButtonClick = (action, index) => {
    if (action.type === 'showSlides') {
      const updatedShowSlide = [...showSlide];
      updatedShowSlide[index] = !updatedShowSlide[index];
      setShowSlide(updatedShowSlide);
    } else if (action.type === 'redirect') {
      navigate(action.path);
    } else if (action.type === 'quiz') {
      setShowQuiz(!showQuiz);
    }
  };

  const saveProgress = (lessonId, updatedTasks) => {
    const progress = JSON.parse(localStorage.getItem('lessonProgress')) || lessons.map(lesson => lesson.tasks.map(() => false));
    progress[lessonId] = updatedTasks;
    localStorage.setItem('lessonProgress', JSON.stringify(progress));
  };

  useEffect(() => {
    if (completedTasks.every(task => task) && !initialCompletedTasks.every(task => task)) {
      setTimeout(() => {
        navigate('/educational-resources', { state: { lessonCompleted: true, lessonId: parseInt(lessonId, 10), completedTasks } });
      }, 500); // Add a slight delay to show the completed state before navigating
    }
  }, [completedTasks, initialCompletedTasks, navigate, lessonId]);

  useEffect(() => {
    if (quizCompleted) {
      const updatedTasks = [...completedTasks];
      updatedTasks[lessons[lessonId].tasks.length - 1] = true;
      setCompletedTasks(updatedTasks);
      saveProgress(lessonId, updatedTasks);
    }
  }, [quizCompleted]);

  const revertProgress = () => {
    const updatedProgress = JSON.parse(localStorage.getItem('lessonProgress')) || lessons.map(lesson => lesson.tasks.map(() => false));
    updatedProgress[lessonId] = Array(lessons[lessonId].tasks.length).fill(false);

    // Revert subsequent lessons if any lesson is reverted
    for (let i = parseInt(lessonId, 10) + 1; i < updatedProgress.length; i++) {
      updatedProgress[i] = Array(lessons[i].tasks.length).fill(false);
    }

    localStorage.setItem('lessonProgress', JSON.stringify(updatedProgress));
    setCompletedTasks(Array(lessons[lessonId].tasks.length).fill(false));
    setQuizCompleted(false);
    navigate('/educational-resources', { state: {} });
  };

  return (
    <Box>
      <div className="banner">
        <div className="banner-content">
          <h1>{lessons[lessonId].title}</h1>
        </div>
      </div>
      <Box p={5}>
        <Button colorScheme="purple" mb={5} onClick={() => navigate('/educational-resources')}>
          Back to Educational Resources
        </Button>
        <VStack spacing={4} w="80%" mx="auto">
          {lessons[lessonId].tasks.map((task, index) => (
            <Flex
              key={task.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              backgroundColor={
                completedTasks[index]
                  ? 'green.50'
                  : (index === 0 || completedTasks.slice(0, index).every(task => task))
                    ? 'white'
                    : 'gray.200'
              }
              w="100%"
              align="center"
              justify="flex-start"
              direction="column"
            >
              <Flex align="center" justify="space-between" w="100%">
                <Flex align="center" w="80%">
                  {task.action.type !== 'quiz' && (
                    <Checkbox
                      colorScheme="green"
                      isChecked={completedTasks[index]}
                      onChange={() => toggleTask(index)}
                      isDisabled={index !== 0 && !completedTasks.slice(0, index).every(task => task)}
                      mr={4}
                    />
                  )}
                  <VStack spacing={2} align="flex-start">
                    <Heading as="h2" size="md">{task.title}</Heading>
                    <Text>{task.description}</Text>
                  </VStack>
                </Flex>
                <Button
                  size="sm"
                  onClick={() => handleButtonClick(task.action, index)}
                  variant="outline"
                  colorScheme="purple"
                >
                  {task.action.type === 'showSlides' ? (showSlide[index] ? 'Hide Slides' : 'Show Slides') : task.action.type === 'quiz' ? (showQuiz ? 'Hide Quiz' : 'Take Quiz') : 'Go'}
                </Button>
              </Flex>
              {showSlide[index] && task.action.type === 'showSlides' && (
                <Box mt={4} w="100%" h="500px" borderWidth={1} borderRadius="md">
                  <iframe
                    src={task.action.slideUrl}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                  ></iframe>
                </Box>
              )}
              {showQuiz && task.action.type === 'quiz' && (
                <Collapse in={showQuiz} animateOpacity>
                  <Box mt={4} w="100%" p={4} borderWidth={1} borderRadius="md">
                    <Quiz lessonId={lessonId} onComplete={(success) => setQuizCompleted(success)} />
                  </Box>
                </Collapse>
              )}
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
