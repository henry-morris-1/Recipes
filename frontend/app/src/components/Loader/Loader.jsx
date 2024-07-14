export default function Loader () {
    return (
        <div className="flex flex-col items-center my-4">
            <div className="sm:w-36 w-24 aspect-square relative flex items-center justify-center dark:invert">
                <img src="/assets/loader/pan.png" className="absolute w-[80%] loader pan" />
                <img src="/assets/loader/block.png" className="absolute left-[20%] w-[6%] loader block one" />
                <img src="/assets/loader/block.png" className="absolute left-[35%] w-[6%] loader block two" />
                <img src="/assets/loader/block.png" className="absolute left-[50%] w-[6%] loader block three" />
            </div>
            <h2>Loading...</h2>
        </div>
        
    );
}