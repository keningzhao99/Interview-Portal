import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, Text, Flex, Checkbox } from '@chakra-ui/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { lessons } from './lessonData';

export const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompletedTasks = location.state?.completedTasks || Array(lessons[lessonId].tasks.length).fill(false);
  const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks);

  const toggleTask = (index) => {
    if (index === 0 || completedTasks.slice(0, index).every(task => task)) {
      const updatedTasks = [...completedTasks];
      updatedTasks[index] = !updatedTasks[index];
      setCompletedTasks(updatedTasks);
      saveProgress(lessonId, updatedTasks);
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

  const revertProgress = () => {
    const updatedProgress = JSON.parse(localStorage.getItem('lessonProgress')) || lessons.map(lesson => lesson.tasks.map(() => false));
    updatedProgress[lessonId] = Array(lessons[lessonId].tasks.length).fill(false);

    // Revert subsequent lessons if any lesson is reverted
    for (let i = parseInt(lessonId, 10) + 1; i < updatedProgress.length; i++) {
      updatedProgress[i] = Array(lessons[i].tasks.length).fill(false);
    }

    localStorage.setItem('lessonProgress', JSON.stringify(updatedProgress));
    setCompletedTasks(Array(lessons[lessonId].tasks.length).fill(false));
    navigate('/educational-resources', { state: {} });
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5} textAlign="center" color="purple.600">
        {lessons[lessonId].title}
      </Heading>
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
          >
            <Checkbox
              colorScheme="green"
              isChecked={completedTasks[index]}
              onChange={() => toggleTask(index)}
              isDisabled={index !== 0 && !completedTasks.slice(0, index).every(task => task)}
              mr={4}
            />
            <VStack spacing={2} align="flex-start">
              <Heading as="h2" size="md">{task.title}</Heading>
              <Text>{task.description}</Text>
            </VStack>
          </Flex>
        ))}
      </VStack>
      <Button colorScheme="red" mt={5} onClick={revertProgress}>
        Revert Progress
      </Button>
    </Box>
  );
};
