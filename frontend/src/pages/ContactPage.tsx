import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsLetterBox from "../components/NewsLetterBox.tsx";

const ContactPage = () => {
    return (
        <div>
            <div className={"text-center text-2xl pt-10 border-gray-200 border-t"}>
                <Title text1={"CONTACT"} text2={"US"}/>
            </div>
            <div className={"my-10 flex flex-col justify-center md:flex-row gap-10 mb-28"}>
                <img src={assets.contact_img} alt="contact" className={"w-full md:max-w-120"}/>
                <div className={"flex flex-col items-start justify-center gap-6"}>
                    <p className={"font-semibold text-xl text-gray-600"}>Our store</p>
                    <p className={"text-gray-500"}>412 Maple Avenue, Suite 5B, <br/> New York, NY 10012</p>
                    <p className={"text-gray-500"}>Tel: (415) 555-0132 <br/> Email: admin@forever.com</p>
                    <p className={"font-semibold text-xl text-gray-600"}>Careers at Forever</p>
                    <p className={"text-gray-500"}>Learn more about our team and job openings</p>
                    <button
                        className={"border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer"}>Explore
                        jobs
                    </button>
                </div>
            </div>
            <NewsLetterBox/>
        </div>
    )
}
export default ContactPage
