import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  Icon: LucideIcon;
  index: number;
}

const SkillCard = ({ name, Icon, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card flex flex-col items-center gap-3 p-6 text-center transition-all hover:border-primary/50"
    >
      <div className="skill-icon">
        <Icon size={28} />
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </motion.div>
  );
};

export default SkillCard;
