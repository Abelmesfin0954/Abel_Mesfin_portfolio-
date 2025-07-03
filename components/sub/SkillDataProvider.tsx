"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  skill_name: string;
  Image: string;
  width: number;
  height: number;
  percent: number;
  color: string;
  index: number;
  isIPhone?: boolean;
}

const SkillDataProvider = ({
  skill_name,
  Image: imageSrc,
  width,
  height,
  percent,
  color,
  index,
  isIPhone = false
}: Props) => {
  // Size adjustments for iPhone
  const sizeMultiplier = isIPhone ? 0.85 : 1;
  const textSize = isIPhone ? 'text-xs' : 'text-sm';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      whileTap={{ scale: isIPhone ? 0.98 : 1 }}
      className="flex flex-col items-center p-2"
    >
      <div className="relative group">
        {/* Gradient background */}
        <div 
          className={`absolute inset-0 rounded-lg ${color} opacity-20 group-active:opacity-30 transition-opacity`}
          style={{
            width: width * sizeMultiplier,
            height: height * sizeMultiplier
          }}
        />
        
        {/* Skill icon - optimized for retina displays */}
        <div 
          className="relative p-2" 
          style={{ 
            width: width * sizeMultiplier, 
            height: height * sizeMultiplier 
          }}
        >
          <Image
  src={imageSrc.startsWith('/') || imageSrc.startsWith('http') ? imageSrc : `/${imageSrc}`}
  alt={skill_name}
  fill
  className="object-contain"
  loading="lazy"
  quality={100}
  sizes={isIPhone ? "50vw" : "20vw"}
/>
        </div>
      </div>
      
      {/* Skill info */}
      <div className="mt-1.5 text-center w-full">
        <h3 className={`text-white font-medium ${textSize} truncate`}>
          {skill_name}
        </h3>
        <div className="mt-1 w-full bg-gray-700 rounded-full h-1">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`h-full rounded-full bg-gradient-to-r ${color}`}
          />
        </div>
        <span className={`text-[10px] text-gray-400 mt-0.5 block`}>
          {percent}%
        </span>
      </div>
    </motion.div>
  );
};

export default SkillDataProvider;