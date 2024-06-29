/**
 * Average rating badge with dyanmic color
 * @param {Number} rating Rating within the badge
 */
export default function RatingBadge ({ rating }) {
    /**
     * Calculates the color corresponding to the rating
     */
    function getColor () {
        // linear: 12 * rating;
        // quadratic: Math.pow(1.1 * rating, 2);
        // quartic: Math.pow(rating / 3, 4);

        let h = Math.pow(rating / 2, 3); // Hue (cubic)
        let s = 70; // Saturation
        let l = 40; // Lightness

        return (rating === 0) ? "#999" : `hsl(${h}deg ${s}% ${l}%)`;
    }

    return (
        <div className="flex items-center justify-center h-[1.75em] aspect-square rounded-full" style={{backgroundColor: getColor()}}>
            {rating === 0 ?
                <span className="text-white" style={{fontSize: "0.65em"}}>
                    TBD
                </span>
                :
                <span className="text-white" style={{fontSize: "0.75em"}}>
                    {parseFloat(rating.toFixed(1))}
                </span>
            }
        </div>
    );
}