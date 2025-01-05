import React, { useState } from 'react';
import { ChevronRight, Check, X } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  yesTo: string;
  noTo: string;
}

interface Answer {
  id: string;
  group: string;
}

const questions: Record<string, Question> = {
  q1: {
    id: 'q1',
    text: 'Are there 6-fold rotational symmetries (60°)?',
    yesTo: 'q2',
    noTo: 'q3'
  },
  q2: {
    id: 'q2',
    text: 'Are there reflections?',
    yesTo: 'p6m',
    noTo: 'p6'
  },
  q3: {
    id: 'q3',
    text: 'Are there 3-fold rotational symmetries (120°)?',
    yesTo: 'q4',
    noTo: 'q5'
  },
  q4: {
    id: 'q4',
    text: 'Are there reflections?',
    yesTo: 'q6',
    noTo: 'p3'
  },
  q5: {
    id: 'q5',
    text: 'Are there 4-fold rotational symmetries (90°)?',
    yesTo: 'q7',
    noTo: 'q8'
  },
  q6: {
    id: 'q6',
    text: 'Does the center of every 3-fold rotational symmetry lie on a line of reflection?',
    yesTo: 'p3m1',
    noTo: 'p31m'
  },
  q7: {
    id: 'q7',
    text: 'Are there reflections?',
    yesTo: 'q9',
    noTo: 'p4'
  },
  q8: {
    id: 'q8',
    text: 'Are there half-turn rotational symmetries (180°)?',
    yesTo: 'q10',
    noTo: 'q11'
  },
  q9: {
    id: 'q9',
    text: 'Does the center of every 4-fold rotational symmetry lie on a line of reflection?',
    yesTo: 'p4m',
    noTo: 'p4g'
  },
  q10: {
    id: 'q10',
    text: 'Are there reflections?',
    yesTo: 'q12',
    noTo: 'p2'
  },
  q11: {
    id: 'q11',
    text: 'Are there reflections?',
    yesTo: 'q14',
    noTo: 'q15'
  },
  q12: {
    id: 'q12',
    text: 'Does the center of some half-turn symmetry lie on a line of reflection?',
    yesTo: 'q16',
    noTo: 'q13'
  },
  q13: {
    id: 'q13',
    text: 'Are there glide reflections?',
    yesTo: 'pgg',
    noTo: 'p2'
  },
  q14: {
    id: 'q14',
    text: 'Is there a glide reflection whose axis is not a line of reflection?',
    yesTo: 'cm',
    noTo: 'pm'
  },
  q15: {
    id: 'q15',
    text: 'Are there glide reflections?',
    yesTo: 'pg',
    noTo: 'p1'
  },
  q16: {
    id: 'q16',
    text: 'Does the center of every half-turn rotational symmetry lie on a line of reflection?',
    yesTo: 'pmm',
    noTo: 'cmm'
  }
};

const answers: Record<string, Answer> = {
  p6m: { id: 'p6m', group: 'p6m' },
  p6: { id: 'p6', group: 'p6' },
  p3m1: { id: 'p3m1', group: 'p3m1' },
  p31m: { id: 'p31m', group: 'p31m' },
  p3: { id: 'p3', group: 'p3' },
  p4m: { id: 'p4m', group: 'p4m' },
  p4g: { id: 'p4g', group: 'p4g' },
  p4: { id: 'p4', group: 'p4' },
  pmm: { id: 'pmm', group: 'pmm' },
  cmm: { id: 'cmm', group: 'cmm' },
  pgg: { id: 'pgg', group: 'pgg' },
  p2: { id: 'p2', group: 'p2' },
  cm: { id: 'cm', group: 'cm' },
  pm: { id: 'pm', group: 'pm' },
  pg: { id: 'pg', group: 'pg' },
  p1: { id: 'p1', group: 'p1' }
};

interface Props {
  onGroupIdentified?: (group: string) => void;
}

export const FlowChart: React.FC<Props> = ({ onGroupIdentified }) => {
  const [currentNode, setCurrentNode] = useState('q1');
  const [path, setPath] = useState<string[]>(['q1']);

  const handleAnswer = (isYes: boolean) => {
    const current = questions[currentNode];
    if (!current) return;

    const nextNode = isYes ? current.yesTo : current.noTo;
    const newPath = [...path, nextNode];
    setPath(newPath);
    setCurrentNode(nextNode);

    if (answers[nextNode]) {
      onGroupIdentified?.(answers[nextNode].group);
    }
  };

  const restart = () => {
    setCurrentNode('q1');
    setPath(['q1']);
    onGroupIdentified?.('');
  };

  const currentQuestion = questions[currentNode];
  const currentAnswer = answers[currentNode];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        {path.map((node, index) => (
          <div key={node} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-grow">
              <p className="text-gray-600">
                {questions[node]?.text || answers[node]?.group}
              </p>
            </div>
          </div>
        ))}

        {currentQuestion && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => handleAnswer(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2 hover:bg-green-600"
            >
              <Check className="w-4 h-4" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
              <span>No</span>
            </button>
          </div>
        )}

        {currentAnswer && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">
              Wallpaper Group: {currentAnswer.group}
            </h3>
            <button
              onClick={restart}
              className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};