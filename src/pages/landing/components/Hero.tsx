import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../assets";
import { Button } from "../../../common/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } },
  });

  return (
    <motion.div
      className="py-20 pt-40 mt-[72px] bg-fit bg-center bg-no-repeat relative min-h-[755px]"
      id="home"
      style={{
        backgroundImage: `url(${IMAGES.heroRectangle})`,
        backgroundSize: "1440px 770px",
        backgroundPosition: "left bottom",
        WebkitBackgroundSize: "cover",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col space-y-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <motion.div
          className="flex justify-center mb-8"
          variants={fadeInVariants(0.3)}
        >
          <div className="bg-cyan-600 text-white px-6 py-2 rounded-full inline-flex items-center shadow-lg">
            <span className="text-sm font-medium">
              Empowering Communities Together
            </span>
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600 animate-fade-in [animation-delay:200ms]"
          variants={fadeInVariants(0.5)}
        >
          Building a Stronger Artist Armor Community<br />
        </motion.h1>
        <motion.div
          className="flex justify-center animate-fade-in [animation-delay:600ms]"
          variants={fadeInVariants(0.9)}
        >
          <Button
            variant={"ghost"}
            className="flex space-x-2 h-10 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-6 text-lg rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            onClick={() => navigate("/register")}
          >
            <span>Join Us Today</span>
            <ArrowRight height={20} width={20} />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
