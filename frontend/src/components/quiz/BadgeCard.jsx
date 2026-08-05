function BadgeCard({ percentage = 0 }) {

    const safePercentage = Math.min(
        100,
        Math.max(0, Number(percentage) || 0)
    );

    let badge = "📚";

    let title = "Keep Practicing";

    let color =
        "text-red-600 dark:text-red-400";

    if (safePercentage >= 90) {

        badge = "🥇";

        title = "Gold";

        color =
            "text-yellow-600 dark:text-yellow-400";

    }

    else if (safePercentage >= 75) {

        badge = "🥈";

        title = "Silver";

        color =
            "text-slate-500 dark:text-zinc-300";

    }

    else if (safePercentage >= 60) {

        badge = "🥉";

        title = "Bronze";

        color =
            "text-orange-600 dark:text-orange-400";

    }

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                text-center
            "
        >

            {/* Badge */}

            <div
                className="
                    text-6xl
                    sm:text-7xl

                    leading-none

                    select-none
                "
                role="img"
                aria-label={`${title} badge`}
            >

                {badge}

            </div>

            {/* Badge Title */}

            <h2
                className={`
                    mt-4

                    text-2xl
                    sm:text-3xl

                    font-bold

                    ${color}
                `}
            >

                {title}

            </h2>

            {/* Subtitle */}

            <p
                className="
                    mt-2

                    text-sm
                    sm:text-base

                    text-slate-500

                    dark:text-zinc-400
                "
            >

                Achievement Badge

            </p>

        </div>

    );

}

export default BadgeCard;