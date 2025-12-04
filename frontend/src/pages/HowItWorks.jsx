import { Card } from "../components/Card";
import { FaCamera, FaMapMarkerAlt, FaBell, FaCheckCircle } from "react-icons/fa";


const steps = [
  {
    icon: FaMapMarkerAlt,
    title: "Spot the Issue",
    description: "Notice a problem in your community? A pothole, broken streetlight, or graffiti.",
  },
  {
    icon: FaCamera,
    title: "Report It",
    description: "Take a photo, add location details, and describe the problem in seconds.",
  },
  {
    icon: FaBell,
    title: "Track Progress",
    description: "Get real-time updates as city officials review and work on your report.",
  },
  {
    icon: FaCheckCircle,
    title: "See Results",
    description: "Watch your community improve as issues get resolved and verified.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-[#ebf2f9a2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className='h-[50%] w-[100%]  flex flex-col justify-center items-center'>
<h1 className='text-5xl font-bold '>How it Works ?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making a difference in your community is simple. Follow these four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mt-[30px] cursor-pointer mb-20">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative p-8 hover:shadow-xl transition-smooth hover:-translate-y-1 bg-card"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <step.icon className="w-15 h-15 text-[purple]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;