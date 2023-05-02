import Head from "next/head";
import ColorContrastChecker from "@/components/ColorContrastChecker";
import Header from "@/components/Header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Color Contrast Checker</title>
        <meta
          name="description"
          content="Discover the perfect color contrast for your website with my user-friendly Color Contrast Checker tool. Improve accessibility, enhance readability, and ensure your design complies with WCAG standards for a seamless user experience. Test foreground and background color combinations, adjust font size and weight, and make your content visually appealing for all users. Boost your website's SEO and accessibility with this essential design resource."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="-mt-10 container mx-auto min-h-screen flex items-center justify-center">
        <ColorContrastChecker />
      </div>
    </>
  );
};

export default Home;
