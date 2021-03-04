import { IChallenge } from '../interfaces/IChallenge';

export interface IChallengesContextData {
    level: number;
    currentExperience: number; 
    challengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: IChallenge;
    resetChallenge: () => void;
    updateXp: () => void;
}