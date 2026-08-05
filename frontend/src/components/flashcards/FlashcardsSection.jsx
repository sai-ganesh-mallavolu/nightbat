import { useEffect, useRef, useState } from "react";

import {
    getFlashcards,
    generateFlashcards,
    markFlashcardLearned,
} from "../../services/flashcardService";

import { toast } from "react-toastify";

import Flashcard from "./Flashcard";
import FlashcardProgress from "./FlashcardProgress";
import FlashcardControls from "./FlashcardControls";
import KeyboardShortcuts from "./KeyboardShortcuts";
import StudyComplete from "./StudyComplete";


function FlashcardsSection({
    documentId,
    onGenerated,
    onStatusChange,
}) {

    const [cards, setCards] = useState([]);

    const [loading, setLoading] = useState(false);

    const generatingRef = useRef(false);

    const [markingLearned, setMarkingLearned] = useState(false);

    const [current, setCurrent] = useState(0);

    const [learned, setLearned] = useState([]);

    const [flipped, setFlipped] = useState(false);

    const [studyCompleted, setStudyCompleted] = useState(false);


    // ==========================
    // Load Flashcards
    // ==========================

    useEffect(() => {

        loadFlashcards();

    }, [documentId]);


    const loadFlashcards = async () => {

        try {

            const response =
                await getFlashcards(documentId);

            const loadedCards =
                response.flashcards || [];

            if (loadedCards.length === 0) {
                await handleGenerate();
                return;
            }

            setCards(loadedCards);

            setCurrent(0);

            setFlipped(false);

            setStudyCompleted(false);


            // Restore learned cards from DB

            const learnedCards = loadedCards

                .filter(
                    (card) =>
                        card.is_learned
                )

                .map(
                    (card) =>
                        card.id
                );


            setLearned(learnedCards);

        }

        catch (error) {

            console.error(error);

        }

    };


    // ==========================
    // Generate Flashcards
    // ==========================

    const handleGenerate = async () => {

        if (loading || generatingRef.current) {
            return;
        }

        generatingRef.current = true;

        try {

            setLoading(true);


            const response =
                await generateFlashcards(
                    documentId
                );


            const generatedCards =
                response.flashcards || [];


            setCards(generatedCards);

            setCurrent(0);


            setLearned(

                generatedCards

                    .filter(
                        (card) =>
                            card.is_learned
                    )

                    .map(
                        (card) =>
                            card.id
                    )

            );


            setFlipped(false);

            setStudyCompleted(false);


            // Refresh parent flashcard status

            await onGenerated?.();


            toast.success(
                "Flashcards generated!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to generate flashcards."
            );

        }

        finally {

            generatingRef.current = false;
            setLoading(false);

        }

    };


    // ==========================
    // Next Card
    // ==========================

    const nextCard = () => {

        if (cards.length === 0) return;

        if (
            current >=
            cards.length - 1
        ) {
            return;
        }

        setFlipped(false);

        setCurrent(
            (prev) => prev + 1
        );

    };


    // ==========================
    // Previous Card
    // ==========================

    const previousCard = () => {

        if (cards.length === 0) return;

        if (current <= 0) return;

        setFlipped(false);

        setCurrent(
            (prev) => prev - 1
        );

    };


    // ==========================
    // Shuffle
    // ==========================

    const shuffleCards = () => {

        const shuffled = [
            ...cards,
        ].sort(
            () =>
                Math.random() - 0.5
        );


        setCards(shuffled);

        setCurrent(0);

        setFlipped(false);


        toast.success(
            "Cards shuffled!"
        );

    };


    // ==========================
    // Mark as Learned
    // ==========================

    const markLearned = async () => {

        // No cards or request already running

        if (
            cards.length === 0 ||
            markingLearned
        ) {
            return;
        }


        const card = cards[current];


        if (!card) return;


        // Already learned

        if (
            learned.includes(card.id)
        ) {

            toast.info(
                "Already marked as learned."
            );

            return;

        }


        try {

            // Immediately lock the button

            setMarkingLearned(true);


            await markFlashcardLearned(
                card.id,
                true
            );


            // Prevent duplicate IDs
            // in local state

            setLearned((prev) => {

                if (
                    prev.includes(card.id)
                ) {

                    return prev;

                }


                return [

                    ...prev,

                    card.id,

                ];

            });


            // Update current card locally

            setCards((prev) =>

                prev.map((c) =>

                    c.id === card.id

                        ? {

                            ...c,

                            is_learned: true,

                        }

                        : c

                )

            );


            // Refresh parent status/count
            // from backend

            await onStatusChange?.();


            toast.success(
                "Marked as learned!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to update learning status."
            );

        }

        finally {

            setMarkingLearned(false);

        }

    };


    // ==========================
    // Keyboard Shortcuts
    // ==========================

    useEffect(() => {

        const handleKeyDown = (event) => {

            const tag =
                event.target.tagName;


            if (

                tag === "INPUT" ||

                tag === "TEXTAREA"

            ) {

                return;

            }


            switch (event.key) {

                case "ArrowRight":

                    nextCard();

                    break;


                case "ArrowLeft":

                    previousCard();

                    break;


                case "l":

                case "L":

                    markLearned();

                    break;


                case "s":

                case "S":

                    shuffleCards();

                    break;


                default:

                    break;

            }

        };


        window.addEventListener(

            "keydown",

            handleKeyDown

        );


        return () => {

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

        };

    }, [
        cards,
        current,
        learned,
        markingLearned,
    ]);


    // ==========================
    // Restart Study
    // ==========================

    const restartStudy = async () => {

        try {

            // Reset all flashcards
            // in database

            await Promise.all(

                cards.map((card) =>

                    markFlashcardLearned(

                        card.id,

                        false

                    )

                )

            );


            // Update local state

            setCards((prev) =>

                prev.map((card) => ({

                    ...card,

                    is_learned: false,

                }))

            );


            setLearned([]);

            setCurrent(0);

            setFlipped(false);

            setStudyCompleted(false);


            // Refresh parent status

            await onStatusChange?.();


            toast.success(
                "Study restarted!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to restart study."
            );

        }

    };


    const startQuiz = () => {

        toast.info(
            "🚀 Quiz Generator coming next!"
        );

    };


    return (

        <div
            className="
                mt-12
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-xl
                shadow-slate-200/50
                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >


            {/* ==========================
                Header
            ========================== */}

            <h2
                className="
                    mb-2
                    text-3xl
                    font-bold
                    text-slate-950

                    dark:text-white
                "
            >

                📚 NightBat AI Study Flashcards

            </h2>


            <p
                className="
                    mb-8
                    text-slate-600

                    dark:text-zinc-400
                "
            >

                Master your document faster with
                NightBat AI-generated study cards.

            </p>


            {/* ==========================
                No Flashcards
            ========================== */}

            {cards.length === 0 ? (

                <div className="py-20 text-center">

                    <div className="animate-spin text-6xl mb-6">🤖</div>

                    <h3 className="text-2xl font-bold dark:text-white">
                        Generating Flashcards...
                    </h3>

                    <p className="mt-4 text-slate-600 dark:text-zinc-400">
                        NightBat AI is creating flashcards. Please wait...
                    </p>

                </div>

            ) : (

                <>


                    {/* ==========================
                        Current Card Badge
                    ========================== */}

                    {!studyCompleted && (

                        <div className="mb-6 text-center">

                            <span
                                className="
                                    inline-flex
                                    rounded-full
                                    border
                                    border-cyan-200
                                    bg-cyan-50
                                    px-5
                                    py-2
                                    font-medium
                                    text-cyan-700

                                    dark:border-cyan-500/20
                                    dark:bg-cyan-500/10
                                    dark:text-cyan-300
                                "
                            >

                                Card {current + 1} of {cards.length}

                            </span>

                        </div>

                    )}


                    {/* ==========================
                        Progress
                    ========================== */}

                    {!studyCompleted && (

                        <FlashcardProgress

                            current={current}

                            total={cards.length}

                            learned={learned.length}

                        />

                    )}


                    {/* ==========================
                        Study Complete
                    ========================== */}

                    {studyCompleted && (

                        <StudyComplete

                            total={cards.length}

                            onRestart={restartStudy}

                            onQuiz={startQuiz}

                        />

                    )}


                    {/* ==========================
                        Active Flashcard
                    ========================== */}

                    {!studyCompleted && (

                        <>

                            <Flashcard

                                question={
                                    cards[current].question
                                }

                                answer={
                                    cards[current].answer
                                }

                                flipped={flipped}

                                setFlipped={
                                    setFlipped
                                }

                            />


                            <FlashcardControls

                                previousCard={
                                    previousCard
                                }

                                nextCard={
                                    nextCard
                                }

                                shuffleCards={
                                    shuffleCards
                                }

                                markLearned={
                                    markLearned
                                }

                                markingLearned={
                                    markingLearned
                                }

                                learned={
                                    learned.includes(
                                        cards[current]?.id
                                    )
                                }

                                isFirst={
                                    current === 0
                                }

                                isLast={
                                    current ===
                                    cards.length - 1
                                }

                                showFinish={
                                    current ===
                                    cards.length - 1 &&

                                    learned.includes(
                                        cards[current]?.id
                                    )
                                }

                                onFinish={() =>
                                    setStudyCompleted(true)
                                }

                            />


                            <KeyboardShortcuts />

                        </>

                    )}

                </>

            )}

        </div>

    );

}

export default FlashcardsSection;