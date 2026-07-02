function BadgeCard({ percentage }) {

    let badge = "📚";

    let title = "Keep Practicing";

    let color = "text-red-400";

    if (percentage >= 90) {

        badge = "🥇";

        title = "Gold";

        color = "text-yellow-400";

    }

    else if (percentage >= 75) {

        badge = "🥈";

        title = "Silver";

        color = "text-gray-300";

    }

    else if (percentage >= 60) {

        badge = "🥉";

        title = "Bronze";

        color = "text-orange-400";

    }

    return (

        <div className="text-center">

            <div className="text-7xl">

                {badge}

            </div>

            <h2 className={`mt-3 text-3xl font-bold ${color}`}>

                {title}

            </h2>

        </div>

    );

}

export default BadgeCard;