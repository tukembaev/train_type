import { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import husky from 'shared/assets/icons/husky.svg'
import jest from 'shared/assets/icons/jest.svg'
import reactTestingLibrary from 'shared/assets/icons/react_testing_library.svg'
import storybook from 'shared/assets/icons/storybook.svg'
import git from 'shared/assets/icons/git.svg'
import react from 'shared/assets/icons/react.svg'

import typescript from 'shared/assets/icons/typescript.svg'
import viteIcon from 'shared/assets/icons/vite_icon.svg'
import reduxIcon from 'shared/assets/icons/redux_icon.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

import cls from './AboutPage.module.scss'

const AboutPage: FC = () => {
    function handleButtonClick(url: string) {
        window.location.href = url
    }
    const email = 'tukembaev.arif@gmail.com'
    const linkedInUrl = 'https://www.linkedin.com/in/arif-tukembaev-100703249/'
    const githubUrl = 'https://github.com/'
    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <h4 className={cls.bio}>
                Created with love by Arif T. <br /> Only to show small part of
                my many abilities
                <br /> Created in 2024
            </h4>
            <div className={cls.about_cards_wrapper}>
                <div className={cls.about_card}>
                    <h5>total tests started</h5>
                    <h1>100 sessions</h1>
                </div>
                <div className={cls.about_card}>
                    <h5>total typing time</h5>
                    <h1>6 hours</h1>
                </div>
                <div className={cls.about_card}>
                    <h5>total tests completed</h5>
                    <h1>92 sessions</h1>
                </div>
            </div>
            <div className={cls.about_me_section}>
                <div className={cls.about_me_card}>
                    <h2>about me </h2>
                    <p>
                        Hi everyone! I am a highly motivated and creative React
                        developer. I have major experience in creating
                        user-friendly, responsive web designs and layouts. My
                        main goal is to develop strong and stable solutions to
                        achieve a smooth and silky user experience.
                    </p>
                </div>
                <div className={cls.about_me_card}>
                    <h4>technology used</h4>
                    <div className={cls.skills_wrapper}>
                        <div className={cls.skill_card}>
                            <Avatar src={react} size={45} />
                        </div>
                        <div className={cls.skill_card}>
                            <Avatar src={reduxIcon} size={45} />
                        </div>{' '}
                        <div className={cls.skill_card}>
                            <Avatar src={typescript} size={45} />
                        </div>{' '}
                        <div className={cls.skill_card}>
                            <Avatar src={viteIcon} size={45} />
                        </div>{' '}
                        <div className={cls.skill_card}>
                            <Avatar src={reactTestingLibrary} size={45} />
                        </div>
                        <div className={cls.skill_card}>
                            <Avatar src={storybook} size={45} />
                        </div>
                        <div className={cls.skill_card}>
                            <Avatar src={jest} size={45} />
                        </div>
                        <div className={cls.skill_card}>
                            <Avatar src={git} size={45} />
                        </div>
                        <div className={cls.skill_card}>
                            <Avatar src={husky} size={45} />
                        </div>
                    </div>
                </div>
                <div className={cls.about_me_section}>
                    <h4>stats</h4>
                    <p>
                        {' '}
                        wpm - total number of characters in the correctly typed
                        words (including spaces), divided by 5 and normalised to
                        60 seconds.{' '}
                    </p>
                    <p>
                        {' '}
                        raw wpm - calculated just like wpm, but also includes
                        incorrect words.
                    </p>
                    <p> acc - percentage of correctly pressed keys. </p>
                    <p>
                        char - correct characters / incorrect characters.
                        Calculated after the test has ended.
                    </p>
                    <p>
                        consistency - based on the variance of your raw wpm.
                        Closer to 100% is better. Calculated using the
                        coefficient of variation of raw wpm and mapped onto a
                        scale from 0 to 100.
                    </p>
                </div>
                <div className={cls.about_me_section}>
                    <h4>results screen</h4>
                    <p>
                        After completing a test you will be able to see your
                        wpm, raw wpm, accuracy, character stats, test length,
                        leaderboards info and test info. (you can hover over
                        some values to get floating point numbers). You can also
                        see a graph of your wpm and raw over the duration of the
                        test. Remember that the wpm line is a global average,
                        while the raw wpm line is a local, momentary value.
                        (meaning if you stop, the value is 0)
                    </p>
                </div>
                <div className={cls.about_me_section}>
                    <h2>contact me</h2>
                    <p>
                        I hope you enjoyed my small Pet Project , feel free to
                        reach out if you have any questions! I am open for any
                        opportunities You can find me on:
                    </p>
                    <div className={cls.contact_buttons}>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            className={cls.contact_btn}
                            onClick={() => handleButtonClick(`mailto:${email}`)}
                        >
                            <i
                                className={classNames(cls.icon, {}, [
                                    'fa-solid fa-envelope',
                                ])}
                            />
                            mail
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            className={cls.contact_btn}
                            onClick={() => handleButtonClick(linkedInUrl)}
                        >
                            <i
                                className={classNames(cls.icon, {}, [
                                    'fa-brands fa-linkedin',
                                ])}
                            />
                            linkedIn
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            className={cls.contact_btn}
                            onClick={() => handleButtonClick(githubUrl)}
                        >
                            <i
                                className={classNames(cls.icon, {}, [
                                    'fa-brands fa-github',
                                ])}
                            />
                            github
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AboutPage)
