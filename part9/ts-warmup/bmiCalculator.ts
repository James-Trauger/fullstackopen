interface BmiValues {
    height: number;
    weight: number;
}

const parseInput = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('not enough arguments');
    if (args.length > 4) throw new Error('too many arguments');
    
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (!isNaN(height) && !isNaN(weight)) {
        return {
            height,
            weight
        };
    } else {
        throw new Error('provided arugments were not numbers');
    }
};

export const calculateBmi = (height: number, weight: number) => {
    const metreHeight = height / 100;

    if (metreHeight <= 0) {
        throw new Error('invalid height value');
    }
    if (weight <= 0) {
        throw new Error('invalid weight value');
    }

    const bmi = weight / (metreHeight*metreHeight);

    if (bmi < 25) {
        return 'Normal';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

try {
    const {height, weight} = parseInput(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let message = 'An error occurred: ';
    if (error instanceof Error) {
        message += error.message;
    }
    console.log(message);
}