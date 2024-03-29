import React, { useEffect } from 'react';
import { SpaceShip1 } from '../SpaceShip1';
import { useAnimate } from 'framer-motion';
import Image from 'next/image';

export const AnimatedShip = ({ isPlayer, name, score, currentPlayerQuestionIndex, currentPlayerNumber }) => {
    const [scope, animate] = useAnimate();
    const [scope2, animate2] = useAnimate();

    console.log(name);
    useEffect(() => {
        const animateShip = async () => {
            await animate(scope.current, { x: currentPlayerQuestionIndex * 200 });
        };
        const animateFire = async () => {
            if (scope2.current) {
                await animate2(scope2.current, { opacity: [0, 100] }, { duration: 0.3 });
                if (scope2.current) {
                    await animate2(scope2.current, { opacity: [100, 75, 50, 25, 0] }, { duration: 1 });
                }
            }
        };
        animateFire();
        animateShip();
    }, [currentPlayerQuestionIndex]);
    return (
        <div
            className={`flex flex-col justify-center absolute left-0`}
            style={{ top: `${currentPlayerNumber * 55}px` }}
            ref={scope}>
            <div className='relative'>
                <SpaceShip1 size={100} className='rotate-[140deg] z-[1]' />
                <Image
                    src={'/fire.gif'}
                    width={100}
                    height={100 * 1.4}
                    ref={scope2}
                    className='rotate-[-90deg] absolute top-[-30px] left-[-100px] z-[0]'
                />
                {!isPlayer ? (
                    <h3 className='absolute right-4 bottom-2 font-extralight text-sm'>
                        {name} <span className='bg-blue-500 p-1 text-xs bg-opacity-25 rounded-md'>{score}</span>
                    </h3>
                ) : (
                    <h3 className='absolute right-4 bottom-2 font-extralight text-sm text-green'>
                        {name} <span className='bg-blue-500 p-1 text-xs bg-opacity-25 rounded-md'>{score}</span>
                    </h3>
                )}
            </div>
        </div>
    );
};
