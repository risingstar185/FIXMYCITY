
import { Card } from "../components/Card";
import { FaUsers, FaChartLine, FaShieldAlt, FaBolt } from "react-icons/fa";

const features = [
  {
    icon: FaUsers,
    title: "Community Driven",
    description: "Join thousands of citizens working together to improve their neighborhoods.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FaChartLine,
    title: "Real Impact",
    description: "Track real-time progress and see tangible improvements in your city.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: FaShieldAlt,
    title: "Transparent Process",
    description: "Full visibility into how your reports are handled from submission to resolution.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FaBolt,
    title: "Fast Response",
    description: "Reports are routed directly to the right department for quick action.",
    color: "bg-primary/10 text-primary",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-20 bg-[#ebf2f9a2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
     <div className='h-[50%] w-[100%]  flex flex-col justify-center items-center'>
<h1 className='text-5xl font-bold '>How it Works ?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for citizens, trusted by municipalities, proven to deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-smooth hover:-translate-y-1 border-2 hover:border-primary/20"
            >
              <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center text-[30px]   justify-center mb-6`}>
                <feature.icon className="w-15 h-15 text-[purple]" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

