import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Flex, Progress, Text } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { lessons } from '../components/lessonData';

const getInitialProgress = () => {
  const savedProgress = localStorage.getItem('lessonProgress');
  return savedProgress ? JSON.parse(savedProgress) : lessons.map(lesson => lesson.tasks.map(() => false));
};

export const EducationalResources = () => {
  const [completedLessons, setCompletedLessons] = useState(getInitialProgress);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (location.state && location.state.lessonCompleted) {
      const updatedLessons = [...completedLessons];
      updatedLessons[location.state.lessonId] = location.state.completedTasks;
      setCompletedLessons(updatedLessons);
      localStorage.setItem('lessonProgress', JSON.stringify(updatedLessons));
      toast({
        title: `Lesson ${location.state.lessonId + 1} completed!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Clear the location state
      navigate('/educational-resources', { state: {} });
    }
  }, [location.state, completedLessons, toast, navigate]);

  useEffect(() => {
    localStorage.setItem('lessonProgress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const calculateProgress = (tasks) => {
    if (!tasks) return 0;
    const completedCount = tasks.filter(task => task).length;
    return (completedCount / tasks.length) * 100;
  };

  const isLessonCompleted = (lesson) => lesson && lesson.every(task => task);

  return (
    <Box>
      <Box p={5}>
        <Heading as="h2" size="xl" mb={5} textAlign="center">Interview Preparation</Heading>
        <Flex direction="column" align="center" justify="center" w="100%">
          <VStack spacing={4} w="80%">
            {lessons.map((lesson, index) => {
              const lessonTasks = completedLessons[index] || [];
              const progress = calculateProgress(lessonTasks);
              const isLocked = !completedLessons.slice(0, index).every(isLessonCompleted);
              return (
                <Box
                  key={lesson.id}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  backgroundColor={
                    isLessonCompleted(lessonTasks)
                      ? 'green.50'
                      : isLocked
                        ? 'gray.200'
                        : 'white'
                  }
                  w="100%"
                  onClick={() => {
                    if (!isLocked) {
                      navigate(`/educational-resources/${lesson.id}`, {
                        state: { completedTasks: lessonTasks },
                      });
                    }
                  }}
                  cursor={!isLocked ? 'pointer' : 'not-allowed'}
                >
                  <Flex direction="row" justify="space-between" align="center">
                    <VStack spacing={4} align="flex-start">
                      <Heading as="h2" size="md">{lesson.title}</Heading>
                      <Text>{lesson.description}</Text>
                    </VStack>
                    <Box width="20%">
                      {progress > 0 && progress < 100 && (
                        <Progress value={progress} size="sm" colorScheme="yellow" width="100%" />
                      )}
                      {progress === 100 && (
                        <Text color="green.500" textAlign="right">Completed</Text>
                      )}
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};
