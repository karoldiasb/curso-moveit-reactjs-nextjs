import { createContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { IChallengesContextData } from '../interfaces/IChallengesContextData';
import { IChallengesProviderProps } from '../interfaces/IChallengesProviderProps';

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({children} : IChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        // console.log(Notification.permission);
        if (Notification.permission == 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount} = activeChallenge;
        let finalExperiente = currentExperience + amount;

        if(finalExperiente >= experienceToNextLevel){
            finalExperiente = finalExperiente - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperiente);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}