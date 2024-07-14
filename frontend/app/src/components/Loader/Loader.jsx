export default function Loader () {
    return (
        <div className="flex justify-center">
            <div className="w-full h-1 rounded-b-full relative overflow-hidden">
                <div className="absolute h-full w-[50%] rounded-b-full bg-current loader scroller"></div>
            </div>
        </div>
    );
}