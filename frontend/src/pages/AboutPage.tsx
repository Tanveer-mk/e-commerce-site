import Title from "../components/Title.tsx";
import {assets} from "../assets/frontend_assets/assets.ts";
import NewsLetterBox from "../components/NewsLetterBox.tsx";

const AboutPage = () => {
    return (
        <div>
            <div className={"text-2xl text-center pt-8 border-t border-gray-200"}>
                <Title text1={"ABOUT"} text2={"US"}/>
            </div>
            <div className={"my-10 flex flex-col md:flex-row gap-16"}>
                <img src={assets.about_img} alt="about" className={"w-full max-w-112.5"}/>
                <div className={"flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"}>
                    <p>At Forever, we believe fashion should be accessible to everyone. Founded in 2024, we started
                        as a small online boutique with a simple idea — great style shouldn't come with a great price
                        tag. Over the years, we've grown into a trusted destination for thousands of customers
                        worldwide, offering carefully curated collections across men's, women's, and kids' fashion.</p>
                    <p>Our team works tirelessly to source the finest fabrics and partner with ethical manufacturers to
                        bring you clothing that looks good and feels good. Every piece in our collection goes through a
                        rigorous quality check before it reaches your doorstep, because we believe you deserve nothing
                        but the best.</p>
                    <b className={"text-gray-800"}>Our Mission</b>
                    <p>Our mission is to empower individuals to express themselves through fashion without compromise.
                        We are committed to delivering style, quality, and value — every single order, every single
                        day.</p>
                </div>
            </div>
            <div className={"text-xl py-4"}>
                <Title text1={"WHY"} text2={"CHOOSE US"}/>
            </div>
            <div className={"flex flex-col md:flex-row text-sm mb-20"}>
                <div className={"border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"}>
                    <b>Quality Assurance</b>
                    <p className={"text-gray-600"}>Every product on our platform is carefully vetted through a
                        multi-step quality check process. We partner only with manufacturers who meet our strict
                        standards, so you can shop with complete confidence.</p>
                </div>
                <div className={"border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"}>
                    <b>Convenience</b>
                    <p className={"text-gray-600"}>From browsing to checkout to delivery, we've designed every step of
                        your shopping experience to be seamless. Enjoy easy returns, fast shipping, and 24/7 order
                        tracking right from your phone.</p>
                </div>
                <div className={"border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"}>
                    <b>Exceptional customer service</b>
                    <p className={"text-gray-600"}> Our dedicated support team is always just a message away. Whether
                        it's a sizing question or a delivery concern, we're here to make sure every experience with us
                        is a positive one.</p>
                </div>
            </div>
            <NewsLetterBox/>
        </div>
    )
}
export default AboutPage
