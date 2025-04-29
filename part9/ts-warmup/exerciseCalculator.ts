export interface InputValues {
    target: number;
    exercises: number[];
}

export interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const getDescription = (average: number, target: number): string => {
    if (average < target) return 'you didn\'t meet your target';
    return 'you exceeded your target!';
};

const calculateRating = () => Math.floor(Math.random() * 10);

export const calculateExercises = (exercise: number[], target: number): ExerciseResults => {
    const periodLength = exercise.length;
    if (periodLength === 0) {
        return {
            periodLength,
            trainingDays: 0,
            success: target === 0,
            ratingDescription: getDescription(0, target),
            rating: calculateRating(),
            target,
            average: 0
        };
    }

    const trainingDays = exercise.filter(hours => hours !== 0).length;
    const average = exercise.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = average >= target;

    return {
        periodLength,
        trainingDays,
        success,
        ratingDescription: getDescription(average, target),
        rating: calculateRating(),
        target,
        average
    };
};

export const parseInputExercises = (args: string[]): InputValues => {
    if (args.length < 1) throw new Error('not enough arguments');
    
    const target = Number(args[0]);
    if (isNaN(target)) {
        throw new Error('invalid target value');
    }

    const exercises = args.slice(1).map(arg => {
        const hours = Number(arg);
        if (isNaN(hours)) {
            throw new Error(`'${arg}' is an invalid value`);
        }
        return hours;
    });
    
    return {
        target,
        exercises
    };
};

try {
    const {target, exercises} = parseInputExercises(process.argv.slice(2));
    console.log(calculateExercises(exercises, target));
} catch(error: unknown) {
    let errorMessage = 'an error occurred: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}