import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypeWriterEffects = () => {
    return (
        <section>
            <h1 className='text-xl md:text-3xl text-center py-5'>
                Skills for your present, {' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        words={['and your future!', 'Get started with us!',]}
                        loop={false}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>
        </section>

    );
};

export default TypeWriterEffects;