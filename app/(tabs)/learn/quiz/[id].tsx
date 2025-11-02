/**
 * Quiz/Assessment Screen
 * Interactive quiz with multiple question types
 */

import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/navigation/header';
import { QuizQuestion } from '@/components/learn/quiz/quiz-question';
import { MCQOptions } from '@/components/learn/quiz/mcq-options';
import { QuizResults } from '@/components/learn/quiz/quiz-results';
import { ImageHotspot } from '@/components/learn/quiz/image-hotspot';
import { SequenceOrderer } from '@/components/learn/quiz/sequence-orderer';
import { getQuizById, calculateQuizScore } from '@/utils/mock-data/quizzes';
import { useLearn } from '@/contexts/learn-context';
import { useGamification } from '@/contexts/gamification-context';
import { Clock } from 'lucide-react-native';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const { submitQuizScore } = useLearn();
  const { addXP, incrementQuizzesPassed } = useGamification();

  const quiz = getQuizById(id as string);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz?.questions.length || 0).fill(null)
  );
  const [hasSubmittedQuestion, setHasSubmittedQuestion] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
      <Box className="flex-1 bg-white items-center justify-center">
        <Text>Quiz not found</Text>
      </Box>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitQuestion = () => {
    setHasSubmittedQuestion(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHasSubmittedQuestion(false);
    }
  };

  const handleSubmitQuiz = async () => {
    const { score, correctCount } = calculateQuizScore(quiz.questions, answers);

    // Save score
    await submitQuizScore(quiz.courseId, quiz.lessonId || quiz.id, score);

    // Award XP if passed
    if (score >= quiz.passingScore) {
      await addXP(quiz.xpReward, `Passed ${quiz.title}`);
      if (score === 100) {
        await incrementQuizzesPassed();
      }
    }

    setShowResults(true);
  };

  const handleRetake = () => {
    setAnswers(new Array(quiz.questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setHasSubmittedQuestion(false);
    setShowResults(false);
  };

  const handleContinue = () => {
    router.back();
  };

  if (showResults) {
    const { score, correctCount } = calculateQuizScore(quiz.questions, answers);
    return (
      <Box className="flex-1 bg-white">
        <SafeAreaView edges={['top']} className="bg-white">
          <Header variant="navigation" title="Results" onBack={() => router.back()} />
        </SafeAreaView>
        <ScrollView className="flex-1 bg-background-50">
          <VStack className="p-6 gap-6">
            <QuizResults
              score={score}
              totalQuestions={quiz.questions.length}
              correctAnswers={correctCount}
              xpEarned={score >= quiz.passingScore ? quiz.xpReward : 0}
              passingScore={quiz.passingScore}
              onRetake={handleRetake}
              onContinue={handleContinue}
            />
          </VStack>
        </ScrollView>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-white">
        <Header variant="navigation" title={quiz.title} onBack={() => router.back()} />
      </SafeAreaView>

      <ScrollView className="flex-1 bg-background-50">
        <VStack className="p-6 gap-6">
          {/* Quiz Info Header */}
          <Card className="p-4 bg-primary-50">
            <VStack className="gap-2">
              <Heading size="lg" className="text-typography-950">
                {quiz.title}
              </Heading>
              <Text size="sm" className="text-typography-600">
                {quiz.description}
              </Text>
              <HStack className="gap-3 items-center mt-2">
                {quiz.timeLimit && (
                  <HStack className="gap-1 items-center">
                    <Clock size={16} color="#6B7280" />
                    <Text size="sm" className="text-typography-600">
                      {quiz.timeLimit} min
                    </Text>
                  </HStack>
                )}
                <Text size="sm" className="text-typography-600">
                  Pass: {quiz.passingScore}%
                </Text>
                <Text size="sm" className="text-primary-500 font-semibold">
                  +{quiz.xpReward} XP
                </Text>
              </HStack>
            </VStack>
          </Card>

          {/* Question */}
          <QuizQuestion
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quiz.questions.length}
            question={currentQuestion.question}
            imageUrl={currentQuestion.imageUrl}
          >
            {/* MCQ */}
            {currentQuestion.type === 'mcq' && currentQuestion.options && (
              <MCQOptions
                options={currentQuestion.options}
                selectedAnswer={answers[currentQuestionIndex]}
                correctAnswer={hasSubmittedQuestion ? currentQuestion.correctAnswer : undefined}
                hasSubmitted={hasSubmittedQuestion}
                onSelect={handleAnswerSelect}
              />
            )}

            {/* Sequence */}
            {currentQuestion.type === 'sequence' && currentQuestion.items && (
              <SequenceOrderer items={currentQuestion.items} instruction="Drag to reorder" />
            )}

            {/* Image Hotspot */}
            {currentQuestion.type === 'image-hotspot' && currentQuestion.imageUrl && (
              <ImageHotspot imageUrl={currentQuestion.imageUrl} instruction="Tap the correct area" />
            )}
          </QuizQuestion>

          {/* Explanation (after submission) */}
          {hasSubmittedQuestion && (
            <Card
              className={`p-4 ${
                answers[currentQuestionIndex] === currentQuestion.correctAnswer
                  ? 'bg-success-50'
                  : 'bg-error-50'
              }`}
            >
              <VStack className="gap-2">
                <Text size="sm" className="font-semibold text-typography-700">
                  {answers[currentQuestionIndex] === currentQuestion.correctAnswer
                    ? '✓ Correct!'
                    : '✗ Incorrect'}
                </Text>
                <Text size="sm" className="text-typography-600">
                  {currentQuestion.explanation}
                </Text>
              </VStack>
            </Card>
          )}
        </VStack>
      </ScrollView>

      {/* Bottom Action */}
      <Box className="bg-white border-t border-outline-200 p-4">
        <SafeAreaView edges={['bottom']}>
          {hasSubmittedQuestion ? (
            <Button action="primary" size="lg" onPress={handleNextQuestion}>
              <ButtonText>{isLastQuestion ? 'See Results' : 'Next Question'}</ButtonText>
            </Button>
          ) : (
            <Button
              action="primary"
              size="lg"
              onPress={handleSubmitQuestion}
              isDisabled={answers[currentQuestionIndex] === null}
            >
              <ButtonText>Submit Answer</ButtonText>
            </Button>
          )}
        </SafeAreaView>
      </Box>
    </Box>
  );
}
