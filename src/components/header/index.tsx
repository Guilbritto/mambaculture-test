import Image from "next/image"

export const Header = () => {
    return (
        <div className='h-[72px] flex items-center p-2  bg-slate-700'>
            <div className="flex gap-2 items-ceter">
                <div className="bg-white rounded-full border-none">
                    <Image src="/assets/images/logo.png" width={40} height={40} alt="Mamba Culture Logo" />
                </div>
                <div className="flex flex-col items-end text-white ">
                    <span className="font-bold uppercase leading-none">Mamba</span>
                    <small className="leading-none">Culture</small>
                </div>
            </div>
        </div>
    );
};